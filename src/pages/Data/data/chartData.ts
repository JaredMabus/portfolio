import {
  TimeSeriesPoint,
  CategoricalPoint,
  RadarPoint,
  DonutPoint,
  HeatmapCell,
} from "@/components/bklit/types";

// 1. Time-series Traffic & Performance Data
export const timeSeriesTrafficData: Record<string, TimeSeriesPoint[]> = {
  "7D": [
    { date: "Mon", visitors: 4200, apiRequests: 18400, pageViews: 9800 },
    { date: "Tue", visitors: 4900, apiRequests: 22100, pageViews: 11400 },
    { date: "Wed", visitors: 5800, apiRequests: 26800, pageViews: 13900 },
    { date: "Thu", visitors: 5400, apiRequests: 24300, pageViews: 12600 },
    { date: "Fri", visitors: 6700, apiRequests: 31200, pageViews: 16200 },
    { date: "Sat", visitors: 3900, apiRequests: 17100, pageViews: 8900 },
    { date: "Sun", visitors: 4400, apiRequests: 19800, pageViews: 10200 },
  ],
  "30D": [
    { date: "W1", visitors: 28400, apiRequests: 124000, pageViews: 64000 },
    { date: "W2", visitors: 34200, apiRequests: 152000, pageViews: 78000 },
    { date: "W3", visitors: 39800, apiRequests: 178000, pageViews: 92000 },
    { date: "W4", visitors: 45600, apiRequests: 204000, pageViews: 108000 },
  ],
  "90D": [
    { date: "Jan", visitors: 112000, apiRequests: 510000, pageViews: 264000 },
    { date: "Feb", visitors: 138000, apiRequests: 625000, pageViews: 320000 },
    { date: "Mar", visitors: 168000, apiRequests: 760000, pageViews: 394000 },
  ],
  "1Y": [
    { date: "Q1", visitors: 418000, apiRequests: 1895000, pageViews: 978000 },
    { date: "Q2", visitors: 542000, apiRequests: 2460000, pageViews: 1260000 },
    { date: "Q3", visitors: 680000, apiRequests: 3100000, pageViews: 1590000 },
    { date: "Q4", visitors: 825000, apiRequests: 3780000, pageViews: 1940000 },
  ],
};

// 2. Engineering Competencies (Radar)
export const competencyRadarData: RadarPoint[] = [
  { dimension: "Frontend (React / TS)", score: 96, benchmark: 80 },
  { dimension: "Backend (Node / Python)", score: 88, benchmark: 75 },
  { dimension: "System Architecture", score: 92, benchmark: 70 },
  { dimension: "Data Analytics & Vis", score: 94, benchmark: 65 },
  { dimension: "Cloud & DevOps (CI/CD)", score: 85, benchmark: 70 },
  { dimension: "UI/UX & Accessibility", score: 90, benchmark: 75 },
];

// 3. Tech Stack Distribution (Donut)
export const techStackDonutData: DonutPoint[] = [
  { name: "React / TypeScript", value: 42 },
  { name: "Node.js & Python", value: 26 },
  { name: "Data & Visualization", value: 18 },
  { name: "Cloud & DevOps", value: 14 },
];

// 4. Benchmark & Performance Bar Data (Grouped & Stacked)
export const lighthouseScoreData: CategoricalPoint[] = [
  { name: "Performance", current: 99, target: 95 },
  { name: "Accessibility", current: 100, target: 95 },
  { name: "Best Practices", current: 98, target: 90 },
  { name: "SEO & OpenGraph", current: 100, target: 90 },
  { name: "PWA Readiness", current: 94, target: 85 },
];

export const monthlyCommitActivityData: CategoricalPoint[] = [
  { name: "Jan", features: 48, refactors: 24, tests: 32 },
  { name: "Feb", features: 56, refactors: 30, tests: 40 },
  { name: "Mar", features: 64, refactors: 26, tests: 48 },
  { name: "Apr", features: 52, refactors: 38, tests: 44 },
  { name: "May", features: 70, refactors: 32, tests: 58 },
  { name: "Jun", features: 82, refactors: 44, tests: 66 },
];

// 5. Activity Commit Heatmap (26 weeks x 7 days = 182 days)
export const activityHeatmapData: HeatmapCell[] = (() => {
  const cells: HeatmapCell[] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 26 * 7);

  for (let i = 0; i < 26 * 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];

    // Realistic commit pattern with weekday peaks
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCount = isWeekend
      ? Math.floor(Math.random() * 4)
      : Math.floor(Math.random() * 12) + 2;

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (baseCount > 10) level = 4;
    else if (baseCount > 6) level = 3;
    else if (baseCount > 3) level = 2;
    else if (baseCount > 0) level = 1;

    cells.push({
      date: dateStr,
      count: baseCount,
      level,
    });
  }
  return cells;
})();

// 6. Bklit Palette Showcase Data
export const bklitPaletteRamp = [
  { token: "--chart-1", name: "Primary Series 1", lightHex: "#2E6B50", darkHex: "#6ABA94", desc: "Main brand chart focal point" },
  { token: "--chart-2", name: "Secondary Series 2", lightHex: "#428C6A", darkHex: "#58A580", desc: "Secondary comparative series" },
  { token: "--chart-3", name: "Tertiary Series 3", lightHex: "#6ABA94", darkHex: "#468F6C", desc: "Base primary / midtone anchor" },
  { token: "--chart-4", name: "Quaternary Series 4", lightHex: "#92D2B3", darkHex: "#367758", desc: "Accent auxiliary series" },
  { token: "--chart-5", name: "Quinary Series 5", lightHex: "#BAE5D0", darkHex: "#275F44", desc: "Soft background series" },
];

export const bklitScaleRamp = [
  { token: "--chart-scale-01", name: "Scale Step 01", lightHex: "#E6F7F0", darkHex: "#123324", level: "Lowest Intensity" },
  { token: "--chart-scale-02", name: "Scale Step 02", lightHex: "#BAE5D0", darkHex: "#1D4A35", level: "Low Intensity" },
  { token: "--chart-scale-03", name: "Scale Step 03", lightHex: "#92D2B3", darkHex: "#367758", level: "Medium Intensity" },
  { token: "--chart-scale-04", name: "Scale Step 04", lightHex: "#6ABA94", darkHex: "#6ABA94", level: "High Intensity" },
  { token: "--chart-scale-05", name: "Scale Step 05", lightHex: "#428C6A", darkHex: "#8EE0B9", level: "Peak Intensity" },
];
