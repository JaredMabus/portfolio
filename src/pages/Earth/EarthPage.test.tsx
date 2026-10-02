/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EarthPage from "./index";
import EarthScene from "./EarthScene";
import { defaultEarthState, EARTH_STORAGE_KEY } from "./earthState";

vi.mock("./EarthScene", () => ({ default: vi.fn(() => null) }));

beforeEach(() => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: false, media: query, onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("Earth controls panel", () => {
  it("opens one panel with its title and supports keyboard tab selection", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><EarthPage /></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Show Earth controls" }));
    expect(screen.getByRole("button", { name: "Hide Earth controls" }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("heading", { name: /Earth\s*\./ })).toBeTruthy();
    const scene = screen.getByRole("tab", { name: "Scene" });
    const physics = screen.getByRole("tab", { name: "Physics" });
    expect(screen.getAllByRole("complementary")).toHaveLength(1);
    await user.click(scene);
    await user.keyboard("{ArrowRight}{Enter}");
    expect(physics.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(physics.id);
    expect(screen.getByRole("button", { name: "Launch solar eruption" })).toBeTruthy();
    await user.keyboard("{ArrowLeft}{Enter}");
    expect(scene.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("button", { name: "Launch solar eruption" })).toBeTruthy();
  });

  it("orders the toolbar and launches eruptions with the panel closed", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><EarthPage /></MemoryRouter>);
    const toolbar = screen.getByRole("banner");
    const controls = Array.from(toolbar.querySelectorAll("a, button"));
    expect(controls.map((control) => control.getAttribute("aria-label") ?? control.textContent?.trim()))
      .toEqual(["Portfolio", "Show Earth controls", "Launch solar eruption", "Pause"]);
    await user.click(screen.getByRole("button", { name: "Launch solar eruption" }));
    expect(vi.mocked(EarthScene).mock.lastCall?.[0].settings.flareId).toBe(1);
    await user.click(screen.getByRole("button", { name: "Pause" }));
    expect(screen.getByRole("button", { name: "Launch solar eruption" }).hasAttribute("disabled")).toBe(true);
    expect(vi.mocked(EarthScene).mock.lastCall?.[0].settings.flareId).toBe(1);
  });

  it("keeps section choices and control values across tabs and remounts", async () => {
    const user = userEvent.setup();
    const first = render(<MemoryRouter><EarthPage /></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Show Earth controls" }));
    await user.click(screen.getByRole("switch", { name: "Show magnetic field" }));
    await user.click(screen.getByRole("button", { name: "Appearance", exact: true }));
    await waitFor(() => expect(screen.queryByRole("switch", { name: "Show magnetic field" })).toBeNull());
    await user.click(screen.getByRole("tab", { name: "Physics" }));
    await user.click(screen.getByRole("button", { name: "Forces", exact: true }));
    await user.click(screen.getByRole("button", { name: "Particle species", exact: true }));
    expect(screen.getByRole("slider", { name: "Charge magnitude" })).toBeTruthy();
    first.unmount();
    render(<MemoryRouter><EarthPage /></MemoryRouter>);
    expect(screen.getByRole("button", { name: "Forces", exact: true }).getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByRole("button", { name: "Particle species", exact: true }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("slider", { name: "Charge magnitude" })).toBeTruthy();
    await user.click(screen.getByRole("tab", { name: "Scene" }));
    expect(screen.getByRole("button", { name: "Appearance", exact: true }).getAttribute("aria-expanded")).toBe("false");
    await user.click(screen.getByRole("button", { name: "Appearance", exact: true }));
    expect((screen.getByRole("switch", { name: "Show magnetic field" }) as HTMLInputElement).checked).toBe(false);
  });

  it("restores and resets saved settings from either tab", async () => {
    window.localStorage.setItem(EARTH_STORAGE_KEY, JSON.stringify({
      version: 1,
      state: {
        ...defaultEarthState(), mobilePanelOpen: true, activeTab: "physics",
        pauseOverride: true, field: false, physics: { ...defaultEarthState().physics, windSpeed: 800 },
      },
    }));
    const user = userEvent.setup();
    render(<MemoryRouter><EarthPage /></MemoryRouter>);
    expect(screen.getByRole("tab", { name: "Physics" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("button", { name: "Resume" })).toBeTruthy();
    expect(screen.getByRole("slider", { name: "Wind speed" }).getAttribute("aria-valuenow")).toBe("800");
    await user.click(screen.getByRole("button", { name: "Restore defaults" }));
    expect(screen.getByRole("slider", { name: "Wind speed" }).getAttribute("aria-valuenow")).toBe("400");
    expect(screen.getByRole("button", { name: "Pause" })).toBeTruthy();
    const saved = JSON.parse(window.localStorage.getItem(EARTH_STORAGE_KEY)!);
    expect(saved.state).toMatchObject({ field: true, pauseOverride: null, activeTab: "physics" });
    await user.click(screen.getByRole("button", { name: "Hide Earth controls" }));
    expect(screen.queryByRole("tab")).toBeNull();
    expect(screen.getByRole("button", { name: "Show Earth controls" }).getAttribute("aria-expanded")).toBe("false");
    expect(JSON.parse(window.localStorage.getItem(EARTH_STORAGE_KEY)!).state.mobilePanelOpen).toBe(false);
  });
});
