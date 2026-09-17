import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

import useDocumentTitle from "@/utils/useDocumentTitle";
import MainLayout from "@/components/layouts/MainLayout";
import { RadarChart } from "@/components/bklit";

import {
  pillars,
  specialtyKpiData,
  specialtyRadarData,
  specialtySeriesKeys,
} from "../data/homeContent";
import useSpecialtySelection from "../hooks/useSpecialtySelection";
import HeroSection from "./HeroSection";
import AboutIntro from "./AboutIntro";

export default function Home() {
  const theme = useTheme();
  useDocumentTitle("About Me");
  const {
    activeSpecialty,
    activateSpecialty,
    clearSpecialty,
    pressedSpecialty,
    selectedSpecialty,
    setHoveredSpecialty,
    setPressedSpecialty,
  } = useSpecialtySelection();
  const specialtyColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.tertiary.main,
  ];
  const selectedDomain =
    selectedSpecialty !== null
      ? specialtyKpiData.domains[selectedSpecialty]
      : null;
  const selectedDomainColor =
    selectedSpecialty !== null
      ? specialtyColors[selectedSpecialty]
      : theme.palette.text.primary;
  return (
    <MainLayout animatePage={true} showBackground={true}>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 5, md: 8 },
          pb: 8,
          pt: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        <HeroSection />

        {/* Enhanced Modern About Me Section */}
        <Stack
          component="section"
          aria-label="About Me"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
        >
          <AboutIntro />

          {/* Specialties Section Title */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "920px",
              mt: { xs: 1.5, md: 2.5 },
              display: "flex",
              justifyContent: "flex-start",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "-16px -24px",
                background: `radial-gradient(ellipse at 20% 50%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 55%, ${alpha(theme.palette.background.default, 0.85)} 75%, ${alpha(theme.palette.background.default, 0.35)} 90%, transparent 100%)`,
                filter: "blur(12px)",
                zIndex: 0,
                pointerEvents: "none",
                borderRadius: "20px",
              },
              "& > *": {
                position: "relative",
                zIndex: 1,
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              Specialties
            </Typography>
          </Box>

          {/* 3 Core Focus Pillars Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
              width: "100%",
              maxWidth: "920px",
              mt: 0.5,
            }}
          >
            {pillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              const isCardActive = activeSpecialty === index;
              const isCardSelected = selectedSpecialty === index;
              const specialtyColor = specialtyColors[index];
              return (
                <Box
                  key={index}
                  onMouseEnter={() => {
                    if (selectedSpecialty === null) {
                      setHoveredSpecialty(index);
                    }
                  }}
                  onMouseLeave={() => {
                    if (selectedSpecialty === null) {
                      setHoveredSpecialty(null);
                    }
                  }}
                  onAnimationEnd={() =>
                    setPressedSpecialty((current) =>
                      current === index ? null : current
                    )
                  }
                  sx={{
                    height: "100%",
                    position: "relative",
                    transform: isCardActive
                      ? "translateY(-6px) scale(1.012)"
                      : "translateY(0) scale(1)",
                    animation:
                      pressedSpecialty === index
                        ? "specialty-card-snap 240ms cubic-bezier(0.2, 0.8, 0.2, 1)"
                        : "none",
                    "@keyframes specialty-card-snap": {
                      "0%": {
                        transform: "translateY(0) scale(1)",
                      },
                      "38%": {
                        transform: "translateY(1px) scale(0.975)",
                      },
                      "72%": {
                        transform: isCardActive
                          ? "translateY(-8px) scale(1.026)"
                          : "translateY(-2px) scale(1.012)",
                      },
                      "100%": {
                        transform: isCardActive
                          ? "translateY(-6px) scale(1.012)"
                          : "translateY(0) scale(1)",
                      },
                    },
                    transition: theme.transitions.create(
                      [
                        "transform",
                        "border-color",
                        "background-color",
                        "box-shadow",
                      ],
                      {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }
                    ),
                    willChange: "transform",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                      transition: "none",
                      transform: "none",
                    },
                    borderRadius: "20px",
                    backgroundColor: theme.palette.surfaceContainerLow.main,
                    border: `1px solid ${isCardSelected
                      ? specialtyColor
                      : theme.palette.outline.state.outlinedBorder
                      }`,
                    boxShadow: isCardSelected
                      ? `0 12px 28px ${alpha(specialtyColor, 0.16)}`
                      : "none",
                    cursor: "pointer",
                    "&:hover": {
                      transform: isCardActive
                        ? "translateY(-6px) scale(1.012)"
                        : "translateY(-4px) scale(1)",
                      borderColor: isCardSelected
                        ? specialtyColor
                        : theme.palette.outline.state.outlinedBorder,
                      boxShadow: isCardSelected
                        ? `0 12px 28px ${alpha(specialtyColor, 0.16)}`
                        : "none",
                    },
                  }}
                >
                  <Box
                    component="button"
                    type="button"
                    aria-label={`${isCardSelected ? "Clear" : "Apply"
                      } ${pillar.title} filter`}
                    aria-pressed={isCardSelected}
                    onClick={() => activateSpecialty(index)}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      borderRadius: "inherit",
                      background: "transparent",
                      cursor: "pointer",
                      "&:focus-visible": {
                        outline: `3px solid ${specialtyColor}`,
                        outlineOffset: 3,
                      },
                    }}
                  />
                  {isCardSelected && (
                    <Button
                      size="small"
                      variant="text"
                      aria-label={`Clear ${pillar.title} filter`}
                      onClick={() => activateSpecialty(index)}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        minWidth: 0,
                        minHeight: 28,
                        px: 1,
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                        color: theme.palette.text.secondary,
                        fontSize: "0.7rem",
                        fontWeight: 650,
                        lineHeight: 1,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.surfaceContainerHigh.main,
                          color: theme.palette.text.primary,
                        },
                      }}
                    >
                      Clear
                    </Button>
                  )}
                  {/* Icon Header */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: alpha(specialtyColor, isCardActive ? 0.2 : 0.12),
                      color: specialtyColor,
                      mb: 2,
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <IconComp sx={{ fontSize: 24 }} />
                  </Box>
                  {/* Title & Description */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      letterSpacing: "-0.01em",
                      mb: 1,
                      color: isCardActive ? specialtyColor : theme.palette.text.primary,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      fontSize: "0.9rem",
                      mb: 2.5,
                      flexGrow: 1,
                    }}
                  >
                    {pillar.description}
                  </Typography>
                  {/* Tech Skill Tags */}
                  <Stack
                    direction="row"
                    sx={{
                      flexWrap: "wrap",
                      gap: 0.75
                    }}>
                    {pillar.tags.map((tag, tIdx) => (
                      <Box
                        key={tIdx}
                        component="span"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          borderRadius: "8px",
                          backgroundColor: theme.palette.surfaceContainerHigh.main,
                          color: theme.palette.text.secondary,
                          px: 1,
                          py: 0.35,
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        {tag}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              );
            })}
          </Box>

          {/* Specialty Radar Chart Card */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "920px",
              p: { xs: 2.5, sm: 3.5, md: 4 },
              borderRadius: "24px",
              backgroundColor: theme.palette.surfaceContainerLow.main,
              border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.04)}`,
              position: "relative",
              overflow: "hidden",
              mt: 1,
            }}
          >
            {/* Header & Legend */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 1.5,
                mb: 2
              }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    letterSpacing: "-0.01em",
                  }}
                >
                  GitHub Experience Radar
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "0.85rem",
                  }}
                >
                  Shared experience and preference KPIs from representative GitHub projects
                </Typography>
              </Box>
            </Stack>

            <Box
              role="toolbar"
              aria-label="Radar chart filters"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                pb: 2.5,
                mb: 2.5,
                borderBottom: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  mr: { xs: 0, sm: 0.5 },
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  lineHeight: 1,
                }}
              >
                Filter
              </Typography>

              {specialtyKpiData.domains.map((domain, index) => {
                const isSelected = selectedSpecialty === index;
                const filterColor = specialtyColors[index];

                return (
                  <Button
                    key={domain.key}
                    size="small"
                    variant="outlined"
                    aria-pressed={isSelected}
                    onClick={() => activateSpecialty(index)}
                    startIcon={
                      <Box
                        aria-hidden="true"
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: filterColor,
                        }}
                      />
                    }
                    sx={{
                      minHeight: 36,
                      borderRadius: "10px",
                      borderColor: isSelected
                        ? filterColor
                        : theme.palette.outline.state.outlinedBorder,
                      backgroundColor: isSelected
                        ? alpha(filterColor, 0.14)
                        : "transparent",
                      color: isSelected
                        ? filterColor
                        : theme.palette.text.secondary,
                      fontWeight: isSelected ? 750 : 650,
                      textTransform: "none",
                      boxShadow: isSelected
                        ? `0 4px 14px ${alpha(filterColor, 0.14)}`
                        : "none",
                      transition: theme.transitions.create(
                        ["background-color", "border-color", "box-shadow", "color"],
                        { duration: theme.transitions.duration.shorter }
                      ),
                      "&:hover": {
                        borderColor: filterColor,
                        backgroundColor: alpha(filterColor, isSelected ? 0.18 : 0.06),
                      },
                    }}
                  >
                    {domain.shortLabel}
                  </Button>
                );
              })}

              <Box sx={{ flexGrow: 1 }} />

              <Button
                size="small"
                variant="text"
                disabled={selectedSpecialty === null}
                onClick={clearSpecialty}
                sx={{
                  minHeight: 36,
                  px: 1.5,
                  borderRadius: "10px",
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Clear filter
              </Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "minmax(0, 1fr) 350px",
                },
                alignItems: "stretch",
                gap: { xs: 3, md: 4 },
              }}
            >
              {/* Radar Chart Component */}
              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                  height: { xs: 340, sm: 400, md: 430 },
                  position: "relative",
                }}
              >
                <RadarChart
                  data={specialtyRadarData}
                  series={specialtyKpiData.domains.map((domain, index) => ({
                    dataKey: domain.key,
                    label: domain.label,
                    color: specialtyColors[index],
                  }))}
                  dimensionKey="dimension"
                  levels={4}
                  height="100%"
                  maxValue={100}
                  size="default"
                  highlightedSeriesKey={
                    activeSpecialty !== null
                      ? specialtySeriesKeys[activeSpecialty]
                      : undefined
                  }
                />
              </Box>

              <Box
                component="aside"
                aria-label="KPI details"
                aria-live="polite"
                tabIndex={0}
                sx={{
                  minWidth: 0,
                  height: { xs: 320, md: 430 },
                  overflowY: "auto",
                  overscrollBehavior: "contain",
                  scrollbarGutter: "stable",
                  borderLeft: {
                    xs: "none",
                    md: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                  },
                  borderTop: {
                    xs: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                    md: "none",
                  },
                  pl: { xs: 0, md: 3 },
                  pr: { xs: 0.5, md: 1 },
                  mr: { xs: 0, md: -2.5 },
                  pt: { xs: 3, md: 0 },
                  "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <Box
                  key={selectedDomain?.key ?? "summary"}
                  sx={{
                    animation: "kpi-detail-enter 220ms ease-out",
                    "@keyframes kpi-detail-enter": {
                      from: { opacity: 0, transform: "translateX(8px)" },
                      to: { opacity: 1, transform: "translateX(0)" },
                    },
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                    },
                  }}
                >
                  {selectedDomain ? (
                    <>
                      <Typography
                        variant="overline"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                        }}
                      >
                        Selected filter
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: selectedDomainColor,
                          fontWeight: 750,
                          fontSize: "1.05rem",
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {selectedDomain.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.86rem",
                          lineHeight: 1.55,
                          mb: 2.5,
                        }}
                      >
                        {selectedDomain.summary}
                      </Typography>

                      <Stack spacing={2}>
                        {specialtyKpiData.kpis.map((kpi, index) => {
                          const value = Object.values(selectedDomain.scores)[index];

                          return (
                            <Box key={kpi.key}>
                              <Stack
                                direction="row"
                                sx={{
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                  gap: 1
                                }}>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 700, fontSize: "0.88rem" }}
                                >
                                  {kpi.label}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: selectedDomainColor,
                                    fontWeight: 800,
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {value}
                                </Typography>
                              </Stack>
                              <Box
                                sx={{
                                  height: 4,
                                  my: 0.75,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  backgroundColor:
                                    theme.palette.surfaceContainerHighest.main,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: `${value}%`,
                                    height: "100%",
                                    borderRadius: "inherit",
                                    backgroundColor: selectedDomainColor,
                                  }}
                                />
                              </Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: "block",
                                  color: theme.palette.text.secondary,
                                  fontSize: "0.76rem",
                                  lineHeight: 1.4,
                                }}
                              >
                                {kpi.definition}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Stack>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 750, fontSize: "1.05rem", mb: 0.75 }}
                      >
                        KPI Summary
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.86rem",
                          lineHeight: 1.55,
                          mb: 2.5,
                        }}
                      >
                        Select a specialty for its five KPI scores. Values are
                        directional GitHub signals, not skill percentages.
                      </Typography>

                      <Stack spacing={2}>
                        {specialtyKpiData.domains.map((domain, index) => {
                          const scores = Object.values(domain.scores);
                          const average = Math.round(
                            scores.reduce((total, score) => total + score, 0) /
                            scores.length
                          );

                          return (
                            <Box key={domain.key}>
                              <Stack
                                direction="row"
                                sx={{
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: 1.5
                                }}>
                                <Stack
                                  direction="row"
                                  sx={{
                                    alignItems: "center",
                                    gap: 1,
                                    minWidth: 0
                                  }}>
                                  <Box
                                    aria-hidden="true"
                                    sx={{
                                      width: 9,
                                      height: 9,
                                      flex: "0 0 auto",
                                      borderRadius: "50%",
                                      backgroundColor: specialtyColors[index],
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "0.88rem",
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {domain.label}
                                  </Typography>
                                </Stack>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: specialtyColors[index],
                                    fontWeight: 800,
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {average}
                                </Typography>
                              </Stack>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: "block",
                                  color: theme.palette.text.secondary,
                                  mt: 0.5,
                                  pl: 2.125,
                                  fontSize: "0.76rem",
                                }}
                              >
                                Five-KPI directional average
                              </Typography>
                            </Box>
                          );
                        })}
                      </Stack>

                      <Box
                        sx={{
                          mt: 3,
                          pt: 2,
                          borderTop: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary, lineHeight: 1.5 }}
                        >
                          Four KPIs describe experience evidence; Preference
                          Signal estimates repeated project emphasis. Source
                          snapshot: {specialtyKpiData.asOf}.
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    </MainLayout>
  );
}
