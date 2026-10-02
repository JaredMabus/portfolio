import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FlareRoundedIcon from "@mui/icons-material/FlareRounded";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import MainLayout from "@/components/layouts/MainLayout";
import useDocumentTitle from "@/utils/useDocumentTitle";
import { themeDark } from "@/styles/theme";
import EarthScene from "./EarthScene";
import { earthColors as colors } from "./earthTheme";

const labelStyle = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: colors.muted,
} as const;
const controlStyle = {
  color: colors.text,
  borderColor: colors.border,
  borderRadius: "8px",
  textTransform: "none",
  fontSize: { xs: 11, sm: 12 },
  fontWeight: 500,
  height: 40,
  px: { xs: 1, sm: 2 },
  "&:hover": {
    borderColor: colors.field,
    backgroundColor: "rgba(93,187,212,.08)",
  },
};

export default function EarthPage() {
  useDocumentTitle("Earth · A magnetic world");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [pauseOverride, setPauseOverride] = useState<boolean | null>(null);
  const paused = pauseOverride ?? reducedMotion;
  const [field, setField] = useState(true);
  const [intensity, setIntensity] = useState(0.45);
  const [mouseStrength, setMouseStrength] = useState(12);
  const [flareId, setFlareId] = useState(0);
  const [details, setDetails] = useState(false);

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <MainLayout
        contentMaxWidth={false}
        disableContentGutters
        animatePage={false}
      >
        <ThemeProvider theme={themeDark}>
          <Box
            component="section"
            aria-labelledby="earth-title"
            sx={{
              backgroundColor: colors.space,
              color: colors.text,
              pb: { xs: 5, md: 8 },
            }}
          >
            <Container
              maxWidth="lg"
              sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 3, md: 0 } }}
            >
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: { xs: 3, md: 4 },
                }}
              >
                <Typography sx={labelStyle}>An experiment in motion</Typography>
                <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: paused ? colors.muted : colors.aurora,
                    }}
                  />
                  <Typography sx={labelStyle}>
                    {paused ? "Paused" : "Live simulation"}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{
                  justifyContent: "space-between",
                  gap: 2,
                  alignItems: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <Box>
                  <Typography
                    component="h1"
                    id="earth-title"
                    sx={{
                      fontSize: { xs: 64, sm: 80, md: 96 },
                      fontWeight: 400,
                      lineHeight: 1,
                      letterSpacing: "-0.06em",
                    }}
                  >
                    Earth<span style={{ color: colors.field }}>.</span>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 15, md: 18 },
                      color: colors.muted,
                      mt: 2,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    A small world. An extraordinary shield.
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    maxWidth: 315,
                    fontSize: 13,
                    color: colors.muted,
                    lineHeight: 1.8,
                    mb: 0.5,
                  }}
                >
                  A moving portrait of our planet and the invisible field that
                  shapes its encounter with the Sun.
                </Typography>
              </Stack>
            </Container>

            <Box
              sx={{
                position: "relative",
                height: { xs: 480, sm: 580, md: "min(620px, 65vw)" },
                minHeight: { md: 490 },
                my: { xs: 0, md: 1 },
                overflow: "hidden",
              }}
            >
              <EarthScene
                settings={{
                  paused,
                  field,
                  intensity,
                  flareId,
                  mouseStrength: mouseStrength / 100,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "44%",
                  left: { sm: "5%", lg: "9%" },
                  pointerEvents: "none",
                  display: { xs: "none", md: "block" },
                }}
              >
                <Typography sx={{ ...labelStyle, color: colors.wind }}>
                  01 / Solar wind
                </Typography>
                <Typography sx={{ fontSize: 12, color: colors.muted, mt: 1 }}>
                  Energy from our star
                </Typography>
                <Box
                  sx={{
                    width: 72,
                    height: 1,
                    backgroundColor: colors.wind,
                    opacity: 0.4,
                    mt: 2,
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "44%",
                  right: { sm: "5%", lg: "9%" },
                  pointerEvents: "none",
                  display: { xs: "none", md: "block" },
                }}
              >
                <Typography sx={{ ...labelStyle, color: colors.field }}>
                  02 / Magnetic dipole
                </Typography>
                <Typography sx={{ fontSize: 12, color: colors.muted, mt: 1 }}>
                  A field of protection
                </Typography>
                <Box
                  sx={{
                    width: 72,
                    height: 1,
                    backgroundColor: colors.field,
                    opacity: 0.4,
                    mt: 2,
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 22,
                  left: 0,
                  right: 0,
                  pointerEvents: "none",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ ...labelStyle, fontSize: 9, opacity: 0.65 }}>
                  {mouseStrength === 0
                    ? "Mouse interaction off · Drag to explore"
                    : "Move your mouse to stir particles · Drag to explore"}
                </Typography>
              </Box>
            </Box>

            <Container maxWidth="lg">
              <Box
                sx={{
                  borderTop: `1px solid ${colors.border}`,
                  borderBottom: `1px solid ${colors.border}`,
                  py: 2.5,
                }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  sx={{
                    gap: { xs: 3, md: 2 },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", md: "center" },
                  }}
                >
                  <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      sx={controlStyle}
                      startIcon={
                        paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />
                      }
                      onClick={() => setPauseOverride(!paused)}
                    >
                      {paused ? "Resume" : "Pause"}
                    </Button>
                    <Button
                      variant="outlined"
                      aria-pressed={field}
                      sx={{
                        ...controlStyle,
                        color: field ? colors.field : colors.muted,
                      }}
                      startIcon={<WavesRoundedIcon />}
                      onClick={() => setField(!field)}
                    >
                      Field lines
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={paused}
                      sx={controlStyle}
                      startIcon={
                        <FlareRoundedIcon sx={{ color: colors.wind }} />
                      }
                      onClick={() => setFlareId((id) => id + 1)}
                    >
                      Solar flare
                    </Button>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{ gap: 3, width: { xs: "100%", md: "auto" } }}
                  >
                    <Box sx={{ width: { xs: "100%", sm: 200 }, px: 1 }}>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography id="wind-label" sx={labelStyle}>
                          Solar wind intensity
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: colors.wind }}>
                          {intensity < 0.35
                            ? "Quiet"
                            : intensity > 0.7
                              ? "Strong"
                              : "Moderate"}
                        </Typography>
                      </Stack>
                      <Slider
                        aria-labelledby="wind-label"
                        min={0}
                        max={1}
                        step={0.01}
                        value={intensity}
                        onChange={(_, value) => setIntensity(value as number)}
                        sx={{
                          color: colors.wind,
                          p: "8px 0",
                          height: 2,
                          "& .MuiSlider-thumb": { width: 10, height: 10 },
                          "& .MuiSlider-rail": { opacity: 0.15 },
                        }}
                      />
                    </Box>
                    <Box sx={{ width: { xs: "100%", sm: 200 }, px: 1 }}>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography id="mouse-strength-label" sx={labelStyle}>
                          Mouse effect
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color:
                              mouseStrength === 0 ? colors.muted : colors.field,
                          }}
                        >
                          {mouseStrength === 0 ? "Off" : `${mouseStrength}%`}
                        </Typography>
                      </Stack>
                      <Slider
                        aria-labelledby="mouse-strength-label"
                        aria-valuetext={
                          mouseStrength === 0
                            ? "Off"
                            : `${mouseStrength} percent`
                        }
                        min={0}
                        max={100}
                        step={1}
                        value={mouseStrength}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) =>
                          value === 0 ? "Off" : `${value}%`
                        }
                        onChange={(_, value) =>
                          setMouseStrength(value as number)
                        }
                        sx={{
                          color: colors.field,
                          p: "8px 0",
                          height: 2,
                          "& .MuiSlider-thumb": { width: 10, height: 10 },
                          "& .MuiSlider-rail": { opacity: 0.15 },
                        }}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  mt: 2.5,
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
              >
                <Stack direction="row" sx={{ gap: 3 }}>
                  {[
                    { name: "Solar particles", color: colors.wind },
                    { name: "Magnetic field", color: colors.field },
                  ].map((item) => (
                    <Stack
                      key={item.name}
                      direction="row"
                      sx={{ gap: 1, alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                        }}
                      />
                      <Typography sx={{ fontSize: 11, color: colors.muted }}>
                        {item.name}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Button
                  aria-expanded={details}
                  aria-controls="earth-model-details"
                  onClick={() => setDetails(!details)}
                  endIcon={details ? <RemoveRoundedIcon /> : <AddRoundedIcon />}
                  sx={{
                    color: colors.muted,
                    textTransform: "none",
                    fontSize: 12,
                    px: 0,
                  }}
                >
                  Inside the simulation
                </Button>
              </Stack>
              <Collapse in={details}>
                <Box id="earth-model-details" sx={{ pt: 4, pb: 2 }}>
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: 26,
                      fontWeight: 400,
                      letterSpacing: "-0.035em",
                      mb: 2,
                    }}
                  >
                    The physics behind the portrait
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: colors.muted,
                      lineHeight: 1.9,
                      maxWidth: 770,
                    }}
                  >
                    Particles evolve in a three-dimensional dipole magnetic
                    field with the Lorentz force and Earth’s inverse-square
                    gravity. A Boris integrator keeps magnetic rotation stable.
                    The ambient flow uses the analytic Stokes solution around a
                    sphere, with linear drag coupling the particles to that
                    flow.
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      fontSize: { xs: 11, sm: 13 },
                      color: colors.field,
                      fontFamily: "monospace",
                      lineHeight: 2.2,
                      my: 3,
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {
                      "m dv/dt = q(v × B) − GMm r/|r|³ + γ(u − v)\n−∇p + μ∇²u = 0     ∇·u = 0\nB ∝ [3(m̂·r̂)r̂ − m̂] / |r|³"
                    }
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: colors.muted,
                      lineHeight: 1.9,
                      maxWidth: 770,
                    }}
                  >
                    This is a reduced, scaled model for exploration. The solar
                    wind is a largely collisionless plasma, so creeping Stokes
                    flow is an illustrative approximation, not a complete
                    physical description. Field strength, particle size,
                    distances, and time are adjusted for visibility. The model
                    does not solve magnetohydrodynamics, plasma feedback,
                    reconnection, or particle self-gravity. Earth remains the
                    gravitational center; its spin is prescribed. Moving your
                    mouse adds an exploratory force that gently repels and
                    swirls nearby particles; this interaction is separate from
                    the physical model.
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{ mt: 3, gap: 3, flexWrap: "wrap" }}
                  >
                    {[
                      {
                        label: "NASA · Magnetospheres",
                        url: "https://science.nasa.gov/heliophysics/focus-areas/magnetosphere-ionosphere/",
                      },
                      {
                        label: "The Boris integrator",
                        url: "https://docs.plasmapy.org/en/stable/api/plasmapy.simulation.particle_integrators.BorisIntegrator.html",
                      },
                      {
                        label: "Texture credits",
                        url: `${import.meta.env.BASE_URL}earth/credits.txt`,
                      },
                    ].map((link) => (
                      <Button
                        key={link.label}
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        endIcon={
                          <ArrowOutwardRoundedIcon sx={{ fontSize: 14 }} />
                        }
                        sx={{
                          color: colors.text,
                          fontSize: 11,
                          textTransform: "none",
                          px: 0,
                        }}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Collapse>
            </Container>
          </Box>
        </ThemeProvider>
      </MainLayout>
    </Box>
  );
}
