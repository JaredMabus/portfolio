import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const themeFilePath = path.join(rootDir, "src", "styles", "theme.ts");
const faviconSvgPath = path.join(rootDir, "public", "favicon.svg");
const manifestJsonPath = path.join(rootDir, "public", "manifest.json");

function getActivePrimaryColor() {
  if (!fs.existsSync(themeFilePath)) {
    console.warn("[sync-favicons] theme.ts not found, defaulting to #6ABA94");
    return "#6ABA94";
  }

  const content = fs.readFileSync(themeFilePath, "utf-8");

  // Extract the themeColorSeed block
  const seedBlockMatch = content.match(/export\s+const\s+themeColorSeed\s*=\s*\{([\s\S]*?)\};/);
  if (!seedBlockMatch) {
    console.warn("[sync-favicons] themeColorSeed block not found in theme.ts");
    return "#6ABA94";
  }

  const seedBlock = seedBlockMatch[1];
  const lines = seedBlock.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip single-line or multi-line comments
    if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
      continue;
    }

    const match = trimmed.match(/primary\s*:\s*["']([^"']+)["']/);
    if (match) {
      let rawHex = match[1].replace("#", "").trim();
      // Handle 8-digit hex (#RRGGBBAA) -> take first 6 chars
      if (rawHex.length === 8) {
        rawHex = rawHex.substring(0, 6);
      } else if (rawHex.length === 4) {
        rawHex = rawHex.substring(0, 3);
      }
      if (rawHex.length === 3) {
        rawHex = rawHex.split("").map((c) => c + c).join("");
      }
      if (rawHex.length === 6) {
        return `#${rawHex.toUpperCase()}`;
      }
    }
  }

  return "#6ABA94";
}

function updateFaviconSvg(primaryHex) {
  const svgContent = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="${primaryHex}"/>
  <g transform="translate(6, 6)">
    <path
      d="M13.5 3.5V12.8C13.5 14.5 12.8 15.7 11.6 16.4C10.4 17.1 8.7 17.1 7.2 16.6V13.8C8.1 14.1 8.9 14.2 9.5 14.1C10.3 14.0 10.7 13.5 10.7 12.6V3.5H13.5Z"
      fill="#FFFFFF"
    />
  </g>
</svg>
`;

  fs.writeFileSync(faviconSvgPath, svgContent, "utf-8");
  console.log(`[sync-favicons] Updated ${path.relative(rootDir, faviconSvgPath)} with primary color: ${primaryHex}`);
}

function updateManifestJson(primaryHex) {
  if (!fs.existsSync(manifestJsonPath)) return;

  try {
    const raw = fs.readFileSync(manifestJsonPath, "utf-8");
    const manifest = JSON.parse(raw);
    manifest.theme_color = primaryHex;
    fs.writeFileSync(manifestJsonPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
    console.log(`[sync-favicons] Updated ${path.relative(rootDir, manifestJsonPath)} theme_color to: ${primaryHex}`);
  } catch (err) {
    console.error("[sync-favicons] Failed to update manifest.json:", err);
  }
}

function main() {
  const primaryColor = getActivePrimaryColor();
  updateFaviconSvg(primaryColor);
  updateManifestJson(primaryColor);
}

main();
