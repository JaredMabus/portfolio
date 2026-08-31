/** Provides reusable color conversion, blending, and contrast helpers. */
import { getContrastRatio } from "@mui/material/styles";
import { common } from "@mui/material/colors";

type RgbChannels = { r: number; g: number; b: number };
type HslChannels = { h: number; s: number; l: number };

/** Constrains a numeric value to the inclusive range from zero to one. */
export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Validates that a numeric channel falls within an inclusive range. */
function validateRange(value: number, min: number, max: number, label: string) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${label} must be between ${min} and ${max}.`);
  }
  return value;
}

/** Parses an opaque hexadecimal color into RGB channels. */
function parseHexColor(color: string): RgbChannels {
  const match = color.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);
  if (!match) {
    throw new TypeError(`Invalid hexadecimal color: ${color}`);
  }

  let value = match[1];
  if (value.length === 3 || value.length === 4) {
    value = value
      .split("")
      .map((channel) => channel.repeat(2))
      .join("");
  }

  if (value.length === 8 && value.slice(6).toUpperCase() !== "FF") {
    throw new TypeError("Transparent hexadecimal colors are not supported.");
  }

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

/** Parses one absolute or percentage RGB channel. */
function parseRgbChannel(channel: string) {
  if (channel.endsWith("%")) {
    return Math.round(
      (validateRange(Number.parseFloat(channel), 0, 100, "RGB percentage") /
        100) *
        255,
    );
  }
  return validateRange(Number(channel), 0, 255, "RGB channel");
}

/** Parses an opaque rgb() color into RGB channels. */
function parseRgbColor(color: string): RgbChannels {
  const match = color.match(/^rgb\((.*)\)$/i);
  if (!match || match[1].includes("/")) {
    throw new TypeError(`Invalid or transparent RGB color: ${color}`);
  }

  const channels = match[1].includes(",")
    ? match[1].split(",").map((channel) => channel.trim())
    : match[1].trim().split(/\s+/);
  if (channels.length !== 3) {
    throw new TypeError(`RGB colors require three channels: ${color}`);
  }

  return {
    r: parseRgbChannel(channels[0]),
    g: parseRgbChannel(channels[1]),
    b: parseRgbChannel(channels[2]),
  };
}

/** Parses one HSL percentage channel. */
function parseHslPercentage(channel: string, label: string) {
  if (!channel.endsWith("%")) {
    throw new TypeError(`${label} must be a percentage.`);
  }
  return validateRange(Number.parseFloat(channel), 0, 100, label);
}

/** Converts HSL channels to RGB channels. */
function hslToRgb(h: number, s: number, l: number): RgbChannels {
  const hue = ((h % 360) + 360) % 360;
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const hueSegment = hue / 60;
  const secondary = chroma * (1 - Math.abs((hueSegment % 2) - 1));
  const offset = lightness - chroma / 2;

  const [r, g, b] =
    hueSegment < 1
      ? [chroma, secondary, 0]
      : hueSegment < 2
        ? [secondary, chroma, 0]
        : hueSegment < 3
          ? [0, chroma, secondary]
          : hueSegment < 4
            ? [0, secondary, chroma]
            : hueSegment < 5
              ? [secondary, 0, chroma]
              : [chroma, 0, secondary];

  return {
    r: Math.round((r + offset) * 255),
    g: Math.round((g + offset) * 255),
    b: Math.round((b + offset) * 255),
  };
}

/** Parses an opaque hsl() color into RGB channels. */
function parseHslColor(color: string): RgbChannels {
  const match = color.match(/^hsl\((.*)\)$/i);
  if (!match || match[1].includes("/")) {
    throw new TypeError(`Invalid or transparent HSL color: ${color}`);
  }

  const channels = match[1].includes(",")
    ? match[1].split(",").map((channel) => channel.trim())
    : match[1].trim().split(/\s+/);
  if (channels.length !== 3) {
    throw new TypeError(`HSL colors require three channels: ${color}`);
  }

  const hue = Number(channels[0].replace(/deg$/i, ""));
  if (!Number.isFinite(hue)) {
    throw new TypeError(`Invalid HSL hue: ${channels[0]}`);
  }

  return hslToRgb(
    hue,
    parseHslPercentage(channels[1], "HSL saturation"),
    parseHslPercentage(channels[2], "HSL lightness"),
  );
}

/** Normalizes a supported opaque CSS color into RGB channels. */
function parseColor(color: string): RgbChannels {
  const normalized = color.trim();
  if (normalized.startsWith("#")) return parseHexColor(normalized);
  if (/^rgb\(/i.test(normalized)) return parseRgbColor(normalized);
  if (/^hsl\(/i.test(normalized)) return parseHslColor(normalized);
  throw new TypeError(`Unsupported color format: ${color}`);
}

/** Converts an RGB channel value to a two-character hexadecimal string. */
function rgbChannelToHex(value: number) {
  return Math.round(value).toString(16).padStart(2, "0").toUpperCase();
}

/** Converts RGB channels to a hexadecimal color. */
function rgbToHex({ r, g, b }: RgbChannels) {
  return `#${rgbChannelToHex(r)}${rgbChannelToHex(g)}${rgbChannelToHex(b)}`;
}

/** Converts any supported opaque CSS color to hexadecimal notation. */
export function toHexColor(color: string) {
  return rgbToHex(parseColor(color));
}

/** Blends two supported opaque CSS colors using a tint weight. */
export function mixColors(base: string, tint: string, tintWeight: number) {
  const baseRgb = parseColor(base);
  const tintRgb = parseColor(tint);
  const safeTintWeight = clamp01(tintWeight);
  const baseWeight = 1 - safeTintWeight;

  return rgbToHex({
    r: baseRgb.r * baseWeight + tintRgb.r * safeTintWeight,
    g: baseRgb.g * baseWeight + tintRgb.g * safeTintWeight,
    b: baseRgb.b * baseWeight + tintRgb.b * safeTintWeight,
  });
}

/** Chooses black or white based on which has greater contrast. */
export function readableOnColor(color: string) {
  const normalized = toHexColor(color);
  return getContrastRatio(normalized, common.white) >
    getContrastRatio(normalized, common.black)
    ? common.white
    : common.black;
}

/** Converts RGB channels to rounded HSL channels. */
function rgbToHsl({ r: r255, g: g255, b: b255 }: RgbChannels): HslChannels {
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** Brightens a supported color while preserving its hue and saturation. */
export function brightenPreserveHue(
  color: string,
  lightnessIncrease = 0.16,
): string {
  const { h, s, l } = rgbToHsl(parseColor(color));
  const targetL = Math.min(88, Math.max(10, l + lightnessIncrease * 100));
  return rgbToHex(hslToRgb(h, s, targetL));
}
