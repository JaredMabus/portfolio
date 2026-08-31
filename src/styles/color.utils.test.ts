import { describe, expect, it } from "vitest";
import {
  brightenPreserveHue,
  mixColors,
  readableOnColor,
  toHexColor,
} from "./color.utils";

describe("color utilities", () => {
  it.each([
    ["#F00", "#FF0000"],
    ["#D24F23FF", "#D24F23"],
    ["rgb(210, 79, 35)", "#D24F23"],
    ["rgb(100% 0% 0%)", "#FF0000"],
    ["hsl(0, 100%, 50%)", "#FF0000"],
    ["hsl(120 100% 50%)", "#00FF00"],
  ])("normalizes %s", (input, expected) => {
    expect(toHexColor(input)).toBe(expected);
  });

  it("blends colors regardless of their input notation", () => {
    expect(mixColors("rgb(255, 0, 0)", "hsl(120 100% 50%)", 0.5)).toBe(
      "#808000",
    );
  });

  it("preserves hue while brightening non-hex colors", () => {
    expect(brightenPreserveHue("rgb(255, 0, 0)", 0.1)).toBe("#FF3333");
    expect(brightenPreserveHue("hsl(120 100% 50%)", 0.1)).toBe("#33FF33");
  });

  it("selects readable foregrounds after normalization", () => {
    expect(readableOnColor("rgb(0, 0, 0)")).toBe("#fff");
    expect(readableOnColor("hsl(0 0% 100%)")).toBe("#000");
  });

  it.each(["rgba(0, 0, 0, 0.5)", "hsl(0 0% 0% / 50%)", "#00000080"])(
    "rejects transparent color %s",
    (input) => {
      expect(() => toHexColor(input)).toThrow();
    },
  );
});
