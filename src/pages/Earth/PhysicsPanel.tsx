import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import { earthColors as colors } from "./earthTheme";
import { FLOW_DIRECTION } from "./physics";
import type { PhysicsSettings } from "./physicsSettings";

export function Parameter({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  disabled = false,
  logarithmic = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  logarithmic?: boolean;
}) {
  const display = `${Number(value.toPrecision(5))}${unit ? ` ${unit}` : ""}`;
  return (
    <Box sx={{ mt: 1.5, opacity: disabled ? 0.45 : 1 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1 }}>
        <Typography sx={{ fontSize: 12, color: colors.muted }}>
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: 11,
            color: colors.text,
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
          }}
        >
          {display}
        </Typography>
      </Stack>
      <Slider
        aria-label={label}
        aria-valuetext={display}
        disabled={disabled}
        min={logarithmic ? Math.log10(min) : min}
        max={logarithmic ? Math.log10(max) : max}
        step={logarithmic ? 0.01 : step}
        value={logarithmic ? Math.log10(value) : value}
        onChange={(_, next) =>
          onChange(logarithmic ? 10 ** (next as number) : (next as number))
        }
        sx={{
          color: colors.field,
          height: 2,
          py: 1.2,
          "& .MuiSlider-thumb": { width: 10, height: 10 },
        }}
      />
    </Box>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Stack
      component="label"
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        cursor: "pointer",
      }}
    >
      <Typography sx={{ fontSize: 12, color: colors.text }}>{label}</Typography>
      <Switch
        size="small"
        checked={checked}
        onChange={(_, value) => onChange(value)}
        slotProps={{ input: { "aria-label": label } }}
      />
    </Stack>
  );
}

function Equation({
  label,
  equation,
  enabled,
  onChange,
  children,
}: {
  label: string;
  equation: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Box sx={{ py: 1.5, borderTop: `1px solid ${colors.border}` }}>
      <Toggle label={label} checked={enabled} onChange={onChange} />
      <Typography
        component="div"
        sx={{
          fontFamily: "monospace",
          fontSize: 11,
          color: colors.field,
          mt: 0.5,
        }}
      >
        {equation}
      </Typography>
      {children}
    </Box>
  );
}

export default function PhysicsPanel({
  value,
  onChange,
}: {
  value: PhysicsSettings;
  onChange: (value: PhysicsSettings) => void;
}) {
  const set = <K extends keyof PhysicsSettings>(
    key: K,
    next: PhysicsSettings[K],
  ) => onChange({ ...value, [key]: next });
  return (
    <>
      <Typography
        sx={{ fontSize: 11, color: colors.muted, lineHeight: 1.7, mb: 2 }}
      >
        SI-based inputs · scaled test particles. Forces update immediately.
        Launch a new eruption to compare trajectories.
      </Typography>
      <Equation
        label="Magnetic Lorentz force"
        equation="aᴮ = (q/m) v × B"
        enabled={value.magnetic}
        onChange={(v) => set("magnetic", v)}
      >
        <Parameter
          label="Equatorial surface field"
          value={value.surfaceField}
          min={0}
          max={65}
          step={0.1}
          unit="µT"
          disabled={!value.magnetic}
          onChange={(v) => set("surfaceField", v)}
        />
      </Equation>
      <Equation
        label="Convection electric force"
        equation="aᴱ = (q/m) E; E = −U × B_IMF"
        enabled={value.electric}
        onChange={(v) => set("electric", v)}
      >
        <Parameter
          label="Electric field multiplier"
          value={value.electricScale}
          min={0}
          max={3}
          step={0.05}
          unit="×"
          disabled={!value.electric}
          onChange={(v) => set("electricScale", v)}
        />
        <Typography sx={{ fontSize: 10, color: colors.muted }}>
          |E| ={" "}
          {(
            (Math.abs(value.windSpeed * value.imf * value.electricScale) /
              1000) *
            Math.hypot(FLOW_DIRECTION[0], FLOW_DIRECTION[2])
          ).toFixed(2)}{" "}
          mV/m · uniform imposed field
        </Typography>
      </Equation>
      <Equation
        label="Earth gravity"
        equation="aᵍ = −GM r / |r|³"
        enabled={value.gravity}
        onChange={(v) => set("gravity", v)}
      >
        <Parameter
          label="Earth mass"
          value={value.earthMass}
          min={0.1}
          max={10}
          step={0.1}
          unit="M⊕"
          disabled={!value.gravity}
          onChange={(v) => set("earthMass", v)}
        />
      </Equation>
      <Box sx={{ py: 1.5, borderTop: `1px solid ${colors.border}` }}>
        <Typography sx={{ fontSize: 12 }}>Plasma & species</Typography>
        <Parameter
          label="Wind speed"
          value={value.windSpeed}
          min={200}
          max={1500}
          step={10}
          unit="km/s"
          onChange={(v) => set("windSpeed", v)}
        />
        <Parameter
          label="North / south IMF"
          value={value.imf}
          min={-30}
          max={30}
          step={0.5}
          unit="nT"
          onChange={(v) => set("imf", v)}
        />
        <Parameter
          label="Charge magnitude"
          value={value.charge}
          min={0}
          max={3}
          step={0.1}
          unit="e"
          onChange={(v) => set("charge", v)}
        />
        <Parameter
          label="Positive particle mass"
          value={value.ionMass}
          min={1}
          max={16}
          step={1}
          unit="mₚ"
          onChange={(v) => set("ionMass", v)}
        />
        <Parameter
          label="Positive / negative mass ratio"
          value={value.massRatio}
          min={1}
          max={1836.1527}
          logarithmic
          onChange={(v) => set("massRatio", v)}
        />
        <Typography sx={{ fontSize: 10, color: colors.muted }}>
          Default: protons and electrons, ±e. Equal tracer counts.
        </Typography>
      </Box>
      <Equation
        label="Stokes drag · illustrative"
        equation="aᵈ = ν(uStokes − v)"
        enabled={value.drag}
        onChange={(v) => set("drag", v)}
      >
        <Parameter
          label="Relaxation rate"
          value={value.dragRate}
          min={0}
          max={2}
          step={0.02}
          disabled={!value.drag}
          onChange={(v) => set("dragRate", v)}
        />
        <Parameter
          label="Flow obstacle radius"
          value={value.obstacleRadius}
          min={1}
          max={4}
          step={0.05}
          unit="R⊕"
          disabled={!value.drag}
          onChange={(v) => set("obstacleRadius", v)}
        />
        <Typography sx={{ fontSize: 10, color: colors.muted }}>
          Off by default: solar wind is collisionless, not creeping fluid.
        </Typography>
      </Equation>
      <Equation
        label="Prescribed polar capture"
        equation="μ = v⊥² / 2B; a∥ = −μ ∇∥B"
        enabled={value.polarCapture}
        onChange={(v) => set("polarCapture", v)}
      >
        <Parameter
          label="Cusp pitch angle"
          value={value.pitchAngle}
          min={1}
          max={55}
          unit="°"
          disabled={!value.polarCapture}
          onChange={(v) => set("pitchAngle", v)}
        />
        <Typography sx={{ fontSize: 10, color: colors.muted }}>
          Optional guiding-center illustration of mirroring, replacing full
          orbits inside seeded cusps. Requires magnetic force and nonzero
          charge; omits electric and drag forces during capture.
        </Typography>
      </Equation>
      <Box sx={{ pt: 2, borderTop: `1px solid ${colors.border}` }}>
        <Parameter
          label="Electromagnetic display scale"
          value={value.gyroScale}
          min={0.000001}
          max={0.0001}
          logarithmic
          unit="×"
          onChange={(v) => set("gyroScale", v)}
        />
        <Typography sx={{ fontSize: 10, color: colors.muted, lineHeight: 1.7 }}>
          Multiplies q/m for both electric and magnetic forces. Enlarges
          otherwise invisible gyro-orbits; retains the species mass ratio. This
          is a visual model, not a full-scale plasma solver.
        </Typography>
      </Box>
    </>
  );
}
