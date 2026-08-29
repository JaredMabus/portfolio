import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  useTheme,
  Button,
} from "@mui/material";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";

import MainLayout from "@/components/layouts/MainLayout";
import {
  ChartContainer,
  AreaChart,
  LineChart,
  BarChart,
  DonutChart,
  RadarChart,
  GaugeChart,
  HeatmapGrid,
  MetricCard,
  useBklitPalette,
} from "@/components/bklit";
import {
  timeSeriesTrafficData,
  competencyRadarData,
  techStackDonutData,
  lighthouseScoreData,
  monthlyCommitActivityData,
  activityHeatmapData,
} from "./data/chartData";
import useDocumentTitle from "@/utils/useDocumentTitle";

export default function DataPage() {
  useDocumentTitle("Data & Analytics");
  const theme = useTheme();
  const { series, scale, linePrimary, lineSecondary, isDark, primary, paletteSet } = useBklitPalette();

  const [trafficFilter, setTrafficFilter] = useState("7D");
  const [activeChartType, setActiveChartType] = useState<"area" | "line">("area");

  const dynamicPaletteRamp = [
    { token: "--chart-1", name: "Neutral Series 1", lightHex: paletteSet.light.series[0], darkHex: paletteSet.dark.series[0], desc: "High contrast foreground neutral" },
    { token: "--chart-2", name: "Neutral Series 2", lightHex: paletteSet.light.series[1], darkHex: paletteSet.dark.series[1], desc: "Secondary surfaceContainer tone" },
    { token: "--chart-3", name: "Neutral Series 3", lightHex: paletteSet.light.series[2], darkHex: paletteSet.dark.series[2], desc: "Midtone surfaceContainer shade" },
    { token: "--chart-4", name: "Neutral Series 4", lightHex: paletteSet.light.series[3], darkHex: paletteSet.dark.series[3], desc: "Soft surfaceContainer neutral" },
    { token: "--chart-5", name: "Neutral Series 5", lightHex: paletteSet.light.series[4], darkHex: paletteSet.dark.series[4], desc: "Base surfaceContainer seed" },
  ];

  const dynamicScaleRamp = [
    { token: "--chart-scale-01", name: "Scale Step 01", lightHex: paletteSet.light.scale[0], darkHex: paletteSet.dark.scale[0], level: "Faint Neutral Surface Intensity" },
    { token: "--chart-scale-02", name: "Scale Step 02", lightHex: paletteSet.light.scale[1], darkHex: paletteSet.dark.scale[1], level: "Low Neutral Intensity" },
    { token: "--chart-scale-03", name: "Scale Step 03", lightHex: paletteSet.light.scale[2], darkHex: paletteSet.dark.scale[2], level: "Medium Neutral Intensity" },
    { token: "--chart-scale-04", name: "Scale Step 04", lightHex: paletteSet.light.scale[3], darkHex: paletteSet.dark.scale[3], level: "High Neutral Intensity" },
    { token: "--chart-scale-05", name: "Scale Step 05", lightHex: paletteSet.light.scale[4], darkHex: paletteSet.dark.scale[4], level: "Peak Neutral Highlight" },
  ];

  return (
    <MainLayout animatePage={true}>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 6 },
          pb: 8,
          pt: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            position: "relative",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
            }}
          >
            Data Projects
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 720,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.6,
            }}
          >
            Interactive data visualizations powered by the <strong>Bklit UI</strong>{" "}
            architecture. Styled with our theme{" "}
            <code
              style={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                backgroundColor: theme.palette.surfaceContainerHigh.main,
                padding: "2px 6px",
                borderRadius: "6px",
                border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
              }}
            >
              surfaceContainer.main
            </code>{" "}
            neutral palette, tonal series, and sequential scales for clean, high-contrast data focus.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              variant={activeChartType === "area" ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveChartType("area")}
              sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
            >
              Area View
            </Button>
            <Button
              variant={activeChartType === "line" ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveChartType("line")}
              sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
            >
              Line View
            </Button>
          </Box>
        </Box>

        {/* 1. Top Metric KPI Strip (Glassmorphic Cards) */}
        <Grid container spacing={2.5}>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3
            }}>
            <MetricCard
              title="Total Requests"
              value="1.24M"
              delta={{ value: "+18.2%", trend: "up", label: "vs last month" }}
              sparklineData={[12, 18, 15, 25, 22, 34, 40, 48]}
              icon={<QueryStatsOutlinedIcon sx={{ fontSize: 20 }} />}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3
            }}>
            <MetricCard
              title="Avg Latency"
              value="34ms"
              delta={{ value: "-4.5ms", trend: "down", label: "optimized" }}
              sparklineData={[45, 42, 40, 38, 36, 35, 34, 34]}
              icon={<SpeedOutlinedIcon sx={{ fontSize: 20 }} />}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3
            }}>
            <MetricCard
              title="Uptime SLA"
              value="99.98%"
              delta={{ value: "+0.02%", trend: "up", label: "target met" }}
              sparklineData={[99.8, 99.85, 99.9, 99.92, 99.95, 99.98]}
              icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 20 }} />}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3
            }}>
            <MetricCard
              title="Active Commits"
              value="842"
              delta={{ value: "+24.8%", trend: "up", label: "this quarter" }}
              sparklineData={[42, 55, 60, 68, 72, 85, 94, 110]}
              icon={<CodeOutlinedIcon sx={{ fontSize: 20 }} />}
            />
          </Grid>
        </Grid>

        {/* 2. Main Time Series Explorer (Area / Line Chart) */}
        <ChartContainer
          title="Traffic & Request Throughput"
          subtitle="Real-time request metrics across distributed API edge nodes"
          badge="Live Feed"
          filterOptions={["7D", "30D", "90D", "1Y"]}
          activeFilter={trafficFilter}
          onFilterChange={(f) => setTrafficFilter(f)}
          legendItems={[
            {
              label: "API Requests",
              color: series[0],
            },
            {
              label: "Page Views",
              color: series[1],
            },
            {
              label: "Unique Visitors",
              color: series[2],
            },
          ]}
          height={380}
        >
          {activeChartType === "area" ? (
            <AreaChart
              data={timeSeriesTrafficData[trafficFilter] || timeSeriesTrafficData["7D"]}
              series={[
                {
                  dataKey: "apiRequests",
                  label: "API Requests",
                  color: series[0],
                  strokeWidth: 2.5,
                },
                {
                  dataKey: "pageViews",
                  label: "Page Views",
                  color: series[1],
                  strokeWidth: 2,
                },
                {
                  dataKey: "visitors",
                  label: "Unique Visitors",
                  color: series[2],
                  strokeWidth: 2,
                },
              ]}
              xKey="date"
            />
          ) : (
            <LineChart
              data={timeSeriesTrafficData[trafficFilter] || timeSeriesTrafficData["7D"]}
              series={[
                {
                  dataKey: "apiRequests",
                  label: "API Requests",
                  color: series[0],
                  strokeWidth: 2.5,
                },
                {
                  dataKey: "pageViews",
                  label: "Page Views",
                  color: series[1],
                  strokeWidth: 2,
                },
                {
                  dataKey: "visitors",
                  label: "Unique Visitors",
                  color: series[2],
                  strokeWidth: 2,
                },
              ]}
              xKey="date"
            />
          )}
        </ChartContainer>

        {/* 3. Engineering Radar & Tech Stack Donut */}
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 6
            }}>
            <ChartContainer
              title="Engineering Competencies"
              subtitle="Multi-dimensional skill rating vs senior benchmark (%)"
              legendItems={[
                { label: "My Profile", color: series[0] },
                { label: "Industry Benchmark", color: isDark ? "#605D62" : "#AEAAAF" },
              ]}
              height={340}
            >
              <RadarChart
                data={competencyRadarData}
                series={[
                  {
                    dataKey: "score",
                    label: "My Proficiency",
                    color: series[0],
                  },
                  {
                    dataKey: "benchmark",
                    label: "Industry Benchmark",
                    color: isDark ? "#605D62" : "#AEAAAF",
                  },
                ]}
                dimensionKey="dimension"
                levels={4}
              />
            </ChartContainer>
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 6
            }}>
            <ChartContainer
              title="Tech Stack Distribution"
              subtitle="Time and codebase composition by core technology"
              height={340}
            >
              <DonutChart
                data={techStackDonutData}
                innerRadius={0.65}
                centerLabel="Primary"
                centerValue="TypeScript"
              />
            </ChartContainer>
          </Grid>
        </Grid>

        {/* 4. Lighthouse Scores & Monthly Contributions Bar Charts */}
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 6
            }}>
            <ChartContainer
              title="Quality & Performance Metrics"
              subtitle="Lighthouse automated audit scores vs targets (0-100)"
              legendItems={[
                { label: "Score", color: series[0] },
                { label: "Target", color: isDark ? "#3D3B3E" : "#DBDBDB" },
              ]}
              height={320}
            >
              <BarChart
                data={lighthouseScoreData}
                series={[
                  {
                    dataKey: "current",
                    label: "Actual Score",
                    color: series[0],
                  },
                  {
                    dataKey: "target",
                    label: "Target Score",
                    color: isDark ? "#3D3B3E" : "#DBDBDB",
                  },
                ]}
                categoryKey="name"
                orientation="vertical"
              />
            </ChartContainer>
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 6
            }}>
            <ChartContainer
              title="Monthly Development Activity"
              subtitle="Stacked contributions: features, refactors, and test coverage"
              legendItems={[
                { label: "Features", color: series[0] },
                { label: "Refactors", color: series[1] },
                { label: "Unit Tests", color: series[3] },
              ]}
              height={320}
            >
              <BarChart
                data={monthlyCommitActivityData}
                series={[
                  {
                    dataKey: "features",
                    label: "Features",
                    color: series[0],
                  },
                  {
                    dataKey: "refactors",
                    label: "Refactors",
                    color: series[1],
                  },
                  {
                    dataKey: "tests",
                    label: "Tests",
                    color: series[3],
                  },
                ]}
                categoryKey="name"
                stacked={true}
                orientation="vertical"
              />
            </ChartContainer>
          </Grid>
        </Grid>

        {/* 5. Gauge Chart & Activity Heatmap */}
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <ChartContainer
              title="System Health"
              subtitle="Composite reliability index"
              height={280}
            >
              <GaugeChart
                value={99}
                min={0}
                max={100}
                label="System Health"
                sublabel="99.9% Uptime Target"
              />
            </ChartContainer>
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <ChartContainer
              title="Commit Activity Heatmap"
              subtitle="26-week activity matrix with sequential Bklit scale shading"
              badge="182 Days"
              height={280}
            >
              <HeatmapGrid data={activityHeatmapData} weeks={26} />
            </ChartContainer>
          </Grid>
        </Grid>

        {/* 6. Bklit Primary Theme Palette Explorer */}
        <Card
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRadius: "20px",
            backgroundColor: theme.palette.surface.main,
            border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 20px -4px rgba(0, 0, 0, 0.05)"
                : "none",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: "10px",
                backgroundColor: theme.palette.surfaceContainerHigh.main,
                color: theme.palette.text.secondary,
                border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PaletteOutlinedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: theme.palette.text.primary,
                }}
              >
                Bklit Neutral Theme Palette Reference (surfaceContainer.main)
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, fontSize: "0.85rem" }}
              >
                Derived series colors and sequential scales configured for{" "}
                <strong>{isDark ? "Dark Theme" : "Light Theme"}</strong>
              </Typography>
            </Box>
          </Box>

          {/* Series Tokens */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: theme.palette.text.secondary,
              }}
            >
              Categorical Series Tokens (--chart-1 to --chart-5)
            </Typography>
            <Grid container spacing={2}>
              {dynamicPaletteRamp.map((item) => {
                const hex = isDark ? item.darkHex : item.lightHex;
                return (
                  <Grid
                    key={item.token}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 2.4
                    }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "14px",
                        backgroundColor: theme.palette.surfaceContainerHigh.main,
                        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: theme.palette.outline.main,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          height: 36,
                          borderRadius: "8px",
                          backgroundColor: hex,
                          boxShadow: `0 2px 10px ${hex}44`,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          fontSize: "0.78rem",
                        }}
                      >
                        {item.token}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "monospace",
                          color: theme.palette.text.primary,
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      >
                        {hex}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.7rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Sequential Scale Tokens */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: theme.palette.text.secondary,
              }}
            >
              Sequential Scale Tokens (--chart-scale-01 to --chart-scale-05)
            </Typography>
            <Grid container spacing={2}>
              {dynamicScaleRamp.map((item) => {
                const hex = isDark ? item.darkHex : item.lightHex;
                return (
                  <Grid
                    key={item.token}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 2.4
                    }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "14px",
                        backgroundColor: theme.palette.surfaceContainerHigh.main,
                        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: theme.palette.outline.main,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          height: 36,
                          borderRadius: "8px",
                          backgroundColor: hex,
                          boxShadow: `0 2px 10px ${hex}44`,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          fontSize: "0.78rem",
                        }}
                      >
                        {item.token}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "monospace",
                          color: theme.palette.text.primary,
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      >
                        {hex}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.7rem",
                        }}
                      >
                        {item.level}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Card>
      </Box>
    </MainLayout>
  );
}
