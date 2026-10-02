import { useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FlareRoundedIcon from "@mui/icons-material/FlareRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink } from "react-router-dom";
import useDocumentTitle from "@/utils/useDocumentTitle";
import { themeDark } from "@/styles/theme";
import EarthScene from "./EarthScene";
import PhysicsPanel from "./PhysicsPanel";
import ScenePanel from "./ScenePanel";
import { DEFAULT_PHYSICS } from "./physicsSettings";
import { DEFAULT_CAMERA, type EarthSection, type EarthState, type EarthTab } from "./earthState";
import useEarthState from "./useEarthState";
import { earthColors as colors } from "./earthTheme";

const buttonStyle = {
  color: colors.text,
  borderColor: colors.border,
  borderRadius: 2,
  textTransform: "none",
  fontSize: 12,
  minHeight: 36,
  "&:hover": { borderColor: colors.field, backgroundColor: colors.glass },
} as const;
const smallText = {
  fontSize: 11,
  color: colors.muted,
  lineHeight: 1.8,
} as const;
const iconStyle = {
  ...buttonStyle,
  pointerEvents: "auto",
  width: 44,
  height: 44,
  border: "1px solid",
  background: colors.glass,
} as const;

function GlassPanel({
  open,
  activeTab,
  onTabChange,
  children,
}: {
  open: boolean;
  activeTab: EarthTab;
  onTabChange: (tab: EarthTab) => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <Box
      component="aside"
      id="earth-controls"
      aria-label="Earth controls"
      hidden={!open}
      sx={{
        position: "absolute",
        top: 76,
        bottom: 86,
        left: { xs: 12, sm: 20 },
        width: { xs: "calc(100% - 24px)", sm: 320 },
        display: open ? "flex" : "none",
        flexDirection: "column",
        zIndex: 2,
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        background: colors.glass,
        backdropFilter: "blur(22px) saturate(130%)",
        WebkitBackdropFilter: "blur(22px) saturate(130%)",
        boxShadow: "0 12px 48px rgba(0,0,0,.25)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 2.5, pt: 2.5, flexShrink: 0 }}>
        <Typography
          component="h1"
          sx={{ fontSize: 34, fontWeight: 400, letterSpacing: "-.06em", lineHeight: 1.1 }}
        >
          Earth<span style={{ color: colors.field }}>.</span>
        </Typography>
        <Typography sx={{ ...smallText, fontSize: 10, letterSpacing: ".08em", mt: 0.5 }}>
          A MAGNETIC WORLD
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, tab: EarthTab) => onTabChange(tab)}
          aria-label="Earth settings"
          variant="fullWidth"
          sx={{
            mt: 1.5,
            borderBottom: `1px solid ${colors.border}`,
            "& .MuiTabs-indicator": { backgroundColor: colors.field },
            "& .MuiTab-root": {
              color: colors.muted,
              textTransform: "none",
              "&.Mui-selected": { color: colors.field },
            },
          }}
        >
          <Tab label="Scene" value="scene" id="earth-scene-tab" aria-controls="earth-scene-panel" />
          <Tab label="Physics" value="physics" id="earth-physics-tab" aria-controls="earth-physics-panel" />
        </Tabs>
      </Box>
      <Box key={activeTab} sx={{
        overflowY: "auto",
        minHeight: 0,
        overscrollBehavior: "contain",
        p: 2.5,
        scrollbarWidth: "thin",
        scrollbarColor: `${colors.border} transparent`,
      }}>
        {children}
      </Box>
    </Box>
  );
}

export default function EarthPage() {
  useDocumentTitle("Earth · A magnetic world");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery("(min-width: 1100px)");
  const [state, setState] = useEarthState();
  const {
    pauseOverride, field, intensity, mouseStrength, details, physics,
    chargeColors, sunSize, timeScale, activeTab, camera,
  } = state;
  const set = <K extends keyof EarthState>(key: K, value: EarthState[K]) =>
    setState((previous) => ({ ...previous, [key]: value }));
  const paused = pauseOverride ?? reducedMotion;
  const [flareId, setFlareId] = useState(0);
  const [resetId, setResetId] = useState(0);
  const showPanel = wide ? state.panelOpen : state.mobilePanelOpen;
  const setSection = (id: EarthSection, expanded: boolean) =>
    setState((previous) => ({
      ...previous, sections: { ...previous.sections, [id]: expanded },
    }));
  const restore = () => {
    setState((previous) => ({
      ...previous,
      physics: { ...DEFAULT_PHYSICS },
      intensity: 0,
      mouseStrength: 0,
      sunSize: 0.53,
      timeScale: 1,
      field: true,
      chargeColors: true,
      pauseOverride: null,
      camera: [...DEFAULT_CAMERA],
    }));
    setResetId((id) => id + 1);
  };

  return (
    <ThemeProvider theme={themeDark}>
      <Box
        component="main"
        sx={{
          height: "100dvh",
          minHeight: 540,
          position: "relative",
          overflow: "hidden",
          backgroundColor: colors.space,
          color: colors.text,
        }}
      >
        <EarthScene
          onCameraChange={(position) => setState((previous) => ({ ...previous, camera: position }))}
          settings={{
            paused,
            field,
            intensity,
            flareId,
            resetId,
            mouseStrength: mouseStrength / 100,
            physics,
            chargeColors,
            sunSize,
            timeScale,
            camera,
          }}
        />
        <Box
          component="header"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            px: { xs: 1.5, sm: 2.5 },
            pt: 2,
            pointerEvents: "none",
            background: `linear-gradient(${colors.space}, transparent)`,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
              <Button
                component={RouterLink}
                to="/"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ ...buttonStyle, pointerEvents: "auto" }}
              >
                Portfolio
              </Button>
              <Tooltip title={showPanel ? "Hide Earth controls" : "Show Earth controls"}>
                <IconButton
                  aria-label={showPanel ? "Hide Earth controls" : "Show Earth controls"}
                  aria-expanded={showPanel}
                  aria-controls="earth-controls"
                  onClick={() => set(wide ? "panelOpen" : "mobilePanelOpen", !showPanel)}
                  sx={{
                    ...iconStyle,
                    borderColor: showPanel ? colors.field : colors.border,
                    color: showPanel ? colors.field : colors.text,
                  }}
                >
                  <TuneRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={paused ? "Resume to launch solar eruption" : "Launch solar eruption"}>
                <Box component="span" sx={{ display: "inline-flex", pointerEvents: "auto" }}>
                  <IconButton
                    aria-label="Launch solar eruption"
                    disabled={paused}
                    onClick={() => setFlareId((id) => id + 1)}
                    sx={{ ...iconStyle, color: colors.wind }}
                  >
                    <FlareRoundedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Tooltip>
            </Stack>
            <Button
              onClick={() => set("pauseOverride", !paused)}
              startIcon={
                paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />
              }
              sx={{ ...buttonStyle, pointerEvents: "auto" }}
            >
              {paused ? "Resume" : "Pause"}
            </Button>
          </Stack>
        </Box>

        <GlassPanel
          open={showPanel}
          activeTab={activeTab}
          onTabChange={(tab) => set("activeTab", tab)}
        >
          <Box
            role="tabpanel"
            id="earth-scene-panel"
            aria-labelledby="earth-scene-tab"
            hidden={activeTab !== "scene"}
          >
            <ScenePanel
              value={state}
              onChange={(patch) => setState((previous) => ({ ...previous, ...patch }))}
              onSectionChange={setSection}
            />
          </Box>
          <Box
            role="tabpanel"
            id="earth-physics-panel"
            aria-labelledby="earth-physics-tab"
            hidden={activeTab !== "physics"}
          >
            <PhysicsPanel
              value={physics}
              onChange={(value) => set("physics", value)}
              sections={state.sections}
              onSectionChange={setSection}
            />
          </Box>
          <Stack sx={{ gap: 1, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setResetId((id) => id + 1)}
              sx={buttonStyle}
            >
              Clear particles
            </Button>
            <Button onClick={restore} sx={buttonStyle}>
              Restore defaults
            </Button>
          </Stack>
        </GlassPanel>

        <Stack
          component="footer"
          direction="row"
          sx={{
            position: "absolute",
            bottom: 20,
            left: { xs: 16, sm: 28 },
            right: { xs: 16, sm: 28 },
            zIndex: 2,
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            pointerEvents: "none",
          }}
        >
          <Box>
            <Typography sx={{ ...smallText, color: colors.text }}>
              {paused ? "Paused" : "Interactive model"} ·{" "}
              {intensity === 0 ? "Quiet solar wind" : "Solar wind active"}
            </Typography>
            <Typography sx={{ ...smallText, fontSize: 10 }}>
              Drag to orbit · scaled distances & gyromotion
            </Typography>
          </Box>
          <Button
            onClick={() => set("details", true)}
            sx={{
              ...buttonStyle,
              pointerEvents: "auto",
              background: colors.glass,
            }}
          >
            Model & sources
          </Button>
        </Stack>
      </Box>
      <Dialog
        open={details}
        onClose={() => set("details", false)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="model-title"
      >
        <DialogTitle id="model-title">
          The physics behind the portrait
        </DialogTitle>
        <DialogContent
          sx={{ "& p": { fontSize: 13, lineHeight: 1.85, mb: 2 } }}
        >
          <Typography>
            The Boris integrator advances m dv/dt = q(E + v × B) − GMm r/|r|³.
            Inputs start at 400 km/s, a 31.2 µT equatorial surface field, −5 nT
            north/south interplanetary field, ±e charges, and the
            proton/electron mass ratio of 1836.15. These are representative
            inputs, not live measurements.
          </Typography>
          <Typography>
            The imposed convection field is E = −U × B_IMF. Magnetic force
            changes direction without doing work; electric fields can change
            kinetic energy. Both charge signs can enter either hemisphere.
            Gravity acts equally per unit mass and is weak at solar-wind speeds.
          </Typography>
          <Typography>
            Lengths use Earth radii and velocities use 400 km/s. One simulation
            time unit corresponds to 15.93 physical seconds before the playback
            multiplier. A common electromagnetic display factor of 0.00002
            reduces both qE/m and qv×B/m, enlarging gyromotion while preserving
            charge signs and the species mass ratio. Local gyrofrequency sets up
            to 64 substeps; extreme settings can under-resolve an orbit.
          </Typography>
          <Typography>
            The stretched dipole is prescribed and scale-compressed. It is not a
            self-consistent magnetosphere: the model does not solve plasma
            currents, reconnection, the solar wind’s pressure balance,
            collisions, or MHD. The thick trace shows a reference dipole curve;
            it excludes the adjustable uniform IMF. Auroral brightness responds
            to tracers reaching the polar atmosphere.
          </Typography>
          <Typography>
            Stokes drag and seeded polar capture are optional illustrations and
            are off by default. Full Lorentz orbits include magnetic mirroring
            when resolved; it is not an additional force. The optional
            guiding-center cusp model substitutes conserved magnetic moment and
            energy for full orbits, and omits electric and drag forces during
            capture.
          </Typography>
          <Typography>
            The eruption is a prescribed twisted horseshoe-shaped flux rope with
            an expanding front and trailing legs, inspired by CME observations.
            A solar flare is primarily a burst of radiation; a CME carries
            plasma through space. The Sun is a distant visual proxy, with its
            transit distance omitted. Its apparent size is independent of the
            directional light illuminating the NASA Blue Marble Earth.
          </Typography>
          <Stack sx={{ gap: 1 }}>
            {[
              [
                "NASA · Flux ropes on the Sun",
                "https://www.nasa.gov/image-article/flux-ropes-sun/",
              ],
              [
                "NOAA · Earth’s magnetosphere",
                "https://www.swpc.noaa.gov/phenomena/earths-magnetosphere",
              ],
              [
                "PlasmaPy · Boris integrator",
                "https://docs.plasmapy.org/en/stable/api/plasmapy.simulation.particle_integrators.BorisIntegrator.html",
              ],
              [
                "Earth texture credits",
                `${import.meta.env.BASE_URL}earth/credits.txt`,
              ],
            ].map(([label, href]) => (
              <Button
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noreferrer"
                sx={{ textTransform: "none", justifyContent: "flex-start" }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => set("details", false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
