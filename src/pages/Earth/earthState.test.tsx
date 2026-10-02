/** @vitest-environment jsdom */
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultEarthState, EARTH_STORAGE_KEY, parseEarthState } from "./earthState";
import useEarthState from "./useEarthState";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe("Earth preferences", () => {
  it("recovers defaults from missing, malformed, and unsupported storage", () => {
    for (const saved of [null, "{", "null", "[]", JSON.stringify({ version: 2, state: {} })]) {
      expect(parseEarthState(saved)).toEqual(defaultEarthState());
    }
  });

  it("validates individual saved fields without discarding valid preferences", () => {
    const restored = parseEarthState(JSON.stringify({
      version: 1,
      state: {
        intensity: 0.4, timeScale: -1, sunSize: "large", field: false,
        activeTab: "physics", panelOpen: false, camera: [0, 0, 0],
        physics: { windSpeed: 700, gyroScale: 0, magnetic: "false", massRatio: null },
        sections: { forces: false, species: true, appearance: "closed" },
      },
    }));
    expect(restored).toMatchObject({
      intensity: 0.4, timeScale: 1, sunSize: 0.53, field: false,
      activeTab: "physics", panelOpen: false, camera: [0, 0.65, 11.5],
      physics: { windSpeed: 700, gyroScale: 0.00002, magnetic: true, massRatio: 1836.1527 },
      sections: { forces: false, species: true, appearance: true, solarActivity: true },
    });
  });

  it("restores settings, UI state, pause preference, and orbit after remount", () => {
    const first = renderHook(useEarthState);
    act(() => first.result.current[1]((state) => ({
      ...state, pauseOverride: true, activeTab: "physics", mobilePanelOpen: true,
      field: false, timeScale: 1.5, details: true, camera: [11.5, 0.65, 0],
      physics: { ...state.physics, electric: false, windSpeed: 800 },
      sections: { ...state.sections, forces: false, optionalModels: true },
    })));
    const expected = first.result.current[0];
    first.unmount();
    const next = renderHook(useEarthState);
    expect(next.result.current[0]).toEqual(expected);
    expect(JSON.parse(window.localStorage.getItem(EARTH_STORAGE_KEY)!)).toEqual({ version: 1, state: expected });
  });

  it("continues working when local storage cannot be read or written", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("full"); });
    const { result } = renderHook(useEarthState);
    expect(result.current[0]).toEqual(defaultEarthState());
    act(() => result.current[1]((state) => ({ ...state, field: false })));
    expect(result.current[0].field).toBe(false);
  });
});
