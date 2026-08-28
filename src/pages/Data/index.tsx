import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
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
  bklitChartPalette,
} from "@/components/bklit";
import {
  timeSeriesTrafficData,
  competencyRadarData,
  techStackDonutData,
  lighthouseScoreData,
  monthlyCommitActivityData,
  activityHeatmapData,
  bklitPaletteRamp,
  bklitScaleRamp,
} from "./data/chartData";
import useDocumentTitle from "@/utils/useDocumentTitle";

export default function DataPage() {
  useDocumentTitle("Data & Analytics");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [trafficFilter, setTrafficFilter] = useState("7D");
  const [activeChartType, setActiveChartType] = useState<"area" | "line">("area");

  return (
    <MainLayout animatePage={false}>
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
            architecture. Styled with our primary <code>#6ABA94</code> theme palette,
            10-shade series and sequential scales, glassmorphism overlays, and smooth
            interaction states.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Chip
              icon={<QueryStatsOutlinedIcon sx={{ fontSize: "16px !important" }} />}
              label="Bklit Data Visualization Library"
              size="small"
              sx={{
                height: 28,
                fontWeight: 700,
                fontSize: "0.75rem",
                backgroundColor: theme.palette.primaryContainer.main,
                color: theme.palette.primaryContainer.contrastText,
                borderRadius: "8px",
                "& .MuiChip-icon": { color: "inherit" },
              }}
            />
          </Box>
        </Box>

        {/* 1. Metric Overview Cards */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              label="Monthly Visitors"
              value="48.2k"
              delta={{ value: "+18.4%", trend: "up", label: "vs last month" }}
              sparklineData={[24, 28, 22, 34, 38, 36, 44, 48]}
              icon={<QueryStatsOutlinedIcon sx={{ fontSize: 20 }} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              label="API Latency"
              value="34ms"
              delta={{ value: "-12.5%", trend: "up", label: "p99 response" }}
              sparklineData={[48, 44, 42, 38, 39, 36, 35, 34]}
              icon={<SpeedOutlinedIcon sx={{ fontSize: 20 }} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              label="Test Coverage"
              value="98.5%"
              delta={{ value: "+2.1%", trend: "up", label: "vitest suites" }}
              sparklineData={[92, 93, 94, 95, 96, 97, 98, 98.5]}
              icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 20 }} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              label="Active Commits"
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
              color: isDark ? "#6ABA94" : "#2E6B50",
            },
            {
              label: "Page Views",
              color: isDark ? "#58A580" : "#428C6A",
            },
            {
              label: "Unique Visitors",
              color: isDark ? "#468F6C" : "#6ABA94",
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
                  color: isDark ? "#6ABA94" : "#2E6B50",
                  strokeWidth: 2.5,
                },
                {
                  dataKey: "pageViews",
                  label: "Page Views",
                  color: isDark ? "#58A580" : "#428C6A",
                  strokeWidth: 2,
                },
                {
                  dataKey: "visitors",
                  label: "Unique Visitors",
                  color: isDark ? "#468F6C" : "#6ABA94",
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
                  color: isDark ? "#6ABA94" : "#2E6B50",
                  strokeWidth: 2.5,
                },
                {
                  dataKey: "pageViews",
                  label: "Page Views",
                  color: isDark ? "#58A580" : "#428C6A",
                  strokeWidth: 2,
                },
                {
                  dataKey: "visitors",
                  label: "Unique Visitors",
                  color: isDark ? "#468F6C" : "#6ABA94",
                  strokeWidth: 2,
                },
              ]}
              xKey="date"
            />
          )}
        </ChartContainer>

        {/* 3. Engineering Radar & Tech Stack Donut */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <ChartContainer
              title="Engineering Competencies"
              subtitle="Multi-dimensional skill rating vs senior benchmark (%)"
              legendItems={[
                { label: "My Profile", color: isDark ? "#6ABA94" : "#2E6B50" },
                { label: "Industry Benchmark", color: isDark ? "#367758" : "#92D2B3" },
              ]}
              height={340}
            >
              <RadarChart
                data={competencyRadarData}
                series={[
                  {
                    dataKey: "score",
                    label: "My Proficiency",
                    color: isDark ? "#6ABA94" : "#2E6B50",
                  },
                  {
                    dataKey: "benchmark",
                    label: "Industry Benchmark",
                    color: isDark ? "#367758" : "#92D2B3",
                  },
                ]}
                dimensionKey="dimension"
                levels={4}
              />
            </ChartContainer>
          </Grid>

          <Grid item xs={12} lg={6}>
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
          <Grid item xs={12} lg={6}>
            <ChartContainer
              title="Quality & Performance Metrics"
              subtitle="Lighthouse automated audit scores vs targets (0-100)"
              legendItems={[
                { label: "Score", color: isDark ? "#6ABA94" : "#2E6B50" },
                { label: "Target", color: isDark ? "#367758" : "#92D2B3" },
              ]}
              height={320}
            >
              <BarChart
                data={lighthouseScoreData}
                series={[
                  {
                    dataKey: "current",
                    label: "Actual Score",
                    color: isDark ? "#6ABA94" : "#2E6B50",
                  },
                  {
                    dataKey: "target",
                    label: "Target Score",
                    color: isDark ? "#367758" : "#92D2B3",
                  },
                ]}
                categoryKey="name"
                orientation="vertical"
              />
            </ChartContainer>
          </Grid>

          <Grid item xs={12} lg={6}>
            <ChartContainer
              title="Monthly Development Activity"
              subtitle="Stacked contributions: features, refactors, and test coverage"
              legendItems={[
                { label: "Features", color: isDark ? "#6ABA94" : "#2E6B50" },
                { label: "Refactors", color: isDark ? "#58A580" : "#428C6A" },
                { label: "Unit Tests", color: isDark ? "#468F6C" : "#92D2B3" },
              ]}
              height={320}
            >
              <BarChart
                data={monthlyCommitActivityData}
                series={[
                  {
                    dataKey: "features",
                    label: "Features",
                    color: isDark ? "#6ABA94" : "#2E6B50",
                  },
                  {
                    dataKey: "refactors",
                    label: "Refactors",
                    color: isDark ? "#58A580" : "#428C6A",
                  },
                  {
                    dataKey: "tests",
                    label: "Tests",
                    color: isDark ? "#468F6C" : "#92D2B3",
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
          <Grid item xs={12} lg={4}>
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
                color="#6ABA94"
              />
            </ChartContainer>
          </Grid>

          <Grid item xs={12} lg={8}>
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
                backgroundColor: theme.palette.primaryContainer.main,
                color: theme.palette.primaryContainer.contrastText,
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
                Bklit Primary Theme Palette Reference (#6ABA94)
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
              {bklitPaletteRamp.map((item) => {
                const hex = isDark ? item.darkHex : item.lightHex;
                return (
                  <Grid item xs={12} sm={6} md={2.4} key={item.token}>
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
                          borderColor: theme.palette.primary.main,
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
                          color: theme.palette.primary.main,
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
              {bklitScaleRamp.map((item) => {
                const hex = isDark ? item.darkHex : item.lightHex;
                return (
                  <Grid item xs={12} sm={6} md={2.4} key={item.token}>
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
                          borderColor: theme.palette.primary.main,
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
                          color: theme.palette.primary.main,
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
