import { useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FlareRoundedIcon from "@mui/icons-material/FlareRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink } from "react-router-dom";
import useDocumentTitle from "@/utils/useDocumentTitle";
import { themeDark } from "@/styles/theme";
import EarthScene from "./EarthScene";
import PhysicsPanel, { Parameter, Toggle } from "./PhysicsPanel";
import { DEFAULT_PHYSICS } from "./physicsSettings";
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

function GlassPanel({
  title,
  side,
  open,
  children,
}: {
  title: string;
  side: "left" | "right";
  open: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      component="aside"
      aria-label={title}
      hidden={!open}
      sx={{
        position: "absolute",
        top: { xs: 116, sm: 120 },
        bottom: 86,
        [side]: { xs: 12, sm: 20 },
        width: { xs: "calc(100% - 24px)", sm: 284 },
        maxWidth: 340,
        zIndex: 2,
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        background: colors.glass,
        backdropFilter: "blur(22px) saturate(130%)",
        WebkitBackdropFilter: "blur(22px) saturate(130%)",
        boxShadow: "0 12px 48px rgba(0,0,0,.25)",
        overflowY: "auto",
        overscrollBehavior: "contain",
        p: 2.5,
        scrollbarWidth: "thin",
        scrollbarColor: `${colors.border} transparent`,
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: ".15em",
          textTransform: "uppercase",
          mb: 2,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export default function EarthPage() {
  useDocumentTitle("Earth · A magnetic world");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery("(min-width: 1100px)");
  const [pauseOverride, setPauseOverride] = useState<boolean | null>(null);
  const paused = pauseOverride ?? reducedMotion;
  const [field, setField] = useState(true);
  const [intensity, setIntensity] = useState(0);
  const [mouseStrength, setMouseStrength] = useState(0);
  const [flareId, setFlareId] = useState(0);
  const [resetId, setResetId] = useState(0);
  const [details, setDetails] = useState(false);
  const [physics, setPhysics] = useState({ ...DEFAULT_PHYSICS });
  const [chargeColors, setChargeColors] = useState(true);
  const [sunSize, setSunSize] = useState(0.53);
  const [timeScale, setTimeScale] = useState(1);
  const [viewOpen, setViewOpen] = useState(true);
  const [physicsOpen, setPhysicsOpen] = useState(true);
  const [mobilePanel, setMobilePanel] = useState<"view" | "physics" | null>(
    null,
  );
  const showView = wide ? viewOpen : mobilePanel === "view";
  const showPhysics = wide ? physicsOpen : mobilePanel === "physics";
  const restore = () => {
    setPhysics({ ...DEFAULT_PHYSICS });
    setIntensity(0);
    setMouseStrength(0);
    setSunSize(0.53);
    setTimeScale(1);
    setField(true);
    setChargeColors(true);
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
            px: { xs: 2, sm: 3 },
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
            <Button
              component={RouterLink}
              to="/"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ ...buttonStyle, pointerEvents: "auto" }}
            >
              Portfolio
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 28, sm: 34 },
                  fontWeight: 400,
                  letterSpacing: "-.06em",
                  lineHeight: 1.1,
                }}
              >
                Earth<span style={{ color: colors.field }}>.</span>
              </Typography>
              <Typography
                sx={{
                  ...smallText,
                  display: { xs: "none", sm: "block" },
                  fontSize: 10,
                  letterSpacing: ".08em",
                }}
              >
                A MAGNETIC WORLD
              </Typography>
            </Box>
            <Button
              onClick={() => setPauseOverride(!paused)}
              startIcon={
                paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />
              }
              sx={{ ...buttonStyle, pointerEvents: "auto" }}
            >
              {paused ? "Resume" : "Pause"}
            </Button>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              mt: 1,
              pointerEvents: "none",
            }}
          >
            <Button
              variant="outlined"
              aria-expanded={showView}
              onClick={() =>
                wide
                  ? setViewOpen(!viewOpen)
                  : setMobilePanel(showView ? null : "view")
              }
              startIcon={<TuneRoundedIcon />}
              sx={{
                ...buttonStyle,
                pointerEvents: "auto",
                background: colors.glass,
              }}
            >
              Scene {showView ? "−" : "+"}
            </Button>
            <Button
              variant="outlined"
              aria-expanded={showPhysics}
              onClick={() =>
                wide
                  ? setPhysicsOpen(!physicsOpen)
                  : setMobilePanel(showPhysics ? null : "physics")
              }
              startIcon={<ScienceOutlinedIcon />}
              sx={{
                ...buttonStyle,
                pointerEvents: "auto",
                background: colors.glass,
              }}
            >
              Physics {showPhysics ? "−" : "+"}
            </Button>
          </Stack>
        </Box>

        <GlassPanel title="Scene & eruption" side="left" open={showView}>
          <Typography sx={{ ...smallText, mb: 2 }}>
            A quiet magnetosphere. Send an eruption toward Earth to see how
            charged particles respond.
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            disabled={paused}
            startIcon={<FlareRoundedIcon />}
            onClick={() => setFlareId((id) => id + 1)}
            sx={{ ...buttonStyle, color: colors.wind, mb: 1 }}
          >
            Launch solar eruption
          </Button>
          <Typography sx={{ ...smallText, fontSize: 10 }}>
            Expanding CME flux rope · Sun–Earth transit omitted.
          </Typography>
          <Parameter
            label="Background solar wind"
            min={0}
            max={100}
            value={Math.round(intensity * 100)}
            unit="%"
            onChange={(v) => setIntensity(v / 100)}
          />
          <Parameter
            label="Simulation speed"
            min={0.25}
            max={2}
            step={0.05}
            value={timeScale}
            unit="×"
            onChange={setTimeScale}
          />
          <Box sx={{ borderTop: `1px solid ${colors.border}`, mt: 2, pt: 2 }}>
            <Toggle
              label="Show magnetic field"
              checked={field}
              onChange={setField}
            />
            <Toggle
              label="Color particles by charge"
              checked={chargeColors}
              onChange={setChargeColors}
            />
            <Stack direction="row" sx={{ gap: 2, mt: 1 }}>
              {chargeColors ? (
                <>
                  <Typography sx={{ fontSize: 10, color: colors.wind }}>
                    ● Positive
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: colors.electron }}>
                    ● Negative
                  </Typography>
                </>
              ) : (
                <Typography sx={{ fontSize: 10 }}>
                  ● White particles · both charges
                </Typography>
              )}
            </Stack>
            <Parameter
              label="Sun angular diameter"
              min={0.1}
              max={3}
              step={0.01}
              value={sunSize}
              unit="°"
              onChange={setSunSize}
            />
            <Typography sx={{ ...smallText, fontSize: 10 }}>
              0.53° is the apparent diameter from Earth. The distant disk’s size
              does not change Earth’s lighting.
            </Typography>
            <Parameter
              label="Mouse effect"
              min={0}
              max={100}
              value={mouseStrength}
              unit="%"
              onChange={setMouseStrength}
            />
            <Typography sx={{ ...smallText, fontSize: 10 }}>
              Off at 0%. Optional cursor stirring adds an external force.
            </Typography>
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
        <GlassPanel title="Particle physics" side="right" open={showPhysics}>
          <PhysicsPanel value={physics} onChange={setPhysics} />
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
            onClick={() => setDetails(true)}
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
        onClose={() => setDetails(false)}
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
          <Button onClick={() => setDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
