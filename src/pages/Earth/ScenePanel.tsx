import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ControlsSection from "./ControlsSection";
import { Parameter, Toggle } from "./PanelControls";
import { earthColors as colors } from "./earthTheme";
import type { EarthSection, EarthState } from "./earthState";

const caption = { fontSize: 10, color: colors.muted, lineHeight: 1.7 } as const;

export default function ScenePanel({ value, onChange, onSectionChange }: {
  value: EarthState;
  onChange: (patch: Partial<EarthState>) => void;
  onSectionChange: (id: EarthSection, expanded: boolean) => void;
}) {
  return (
    <>
      <ControlsSection
        id="solarActivity"
        title="Solar activity"
        subtitle="Eruptions & background wind"
        sections={value.sections}
        onChange={onSectionChange}
      >
        <Typography sx={caption}>
          Use the eruption icon above the panel to send charged particles toward
          Earth. The expanding CME flux rope omits the Sun–Earth transit.
        </Typography>
        <Parameter
          label="Background solar wind"
          min={0}
          max={100}
          value={Math.round(value.intensity * 100)}
          unit="%"
          onChange={(v) => onChange({ intensity: v / 100 })}
        />
      </ControlsSection>
      <ControlsSection
        id="appearance"
        title="Appearance"
        subtitle="Field lines, particle colors & Sun"
        sections={value.sections}
        onChange={onSectionChange}
      >
        <Toggle
          label="Show magnetic field"
          checked={value.field}
          onChange={(field) => onChange({ field })}
        />
        <Toggle
          label="Color particles by charge"
          checked={value.chargeColors}
          onChange={(chargeColors) => onChange({ chargeColors })}
        />
        <Stack direction="row" sx={{ gap: 2, mt: 1 }}>
          {value.chargeColors ? (
            <>
              <Typography sx={{ fontSize: 10, color: colors.wind }}>● Positive</Typography>
              <Typography sx={{ fontSize: 10, color: colors.electron }}>● Negative</Typography>
            </>
          ) : (
            <Typography sx={{ fontSize: 10 }}>● White particles · both charges</Typography>
          )}
        </Stack>
        <Parameter
          label="Sun angular diameter"
          min={0.1}
          max={3}
          step={0.01}
          value={value.sunSize}
          unit="°"
          onChange={(sunSize) => onChange({ sunSize })}
        />
        <Typography sx={caption}>
          0.53° is the apparent diameter from Earth. The distant disk’s size
          does not change Earth’s lighting.
        </Typography>
      </ControlsSection>
      <ControlsSection
        id="interaction"
        title="Playback & interaction"
        subtitle="Simulation speed & cursor forces"
        sections={value.sections}
        onChange={onSectionChange}
      >
        <Parameter
          label="Simulation speed"
          min={0.25}
          max={2}
          step={0.05}
          value={value.timeScale}
          unit="×"
          onChange={(timeScale) => onChange({ timeScale })}
        />
        <Parameter
          label="Mouse effect"
          min={0}
          max={100}
          value={value.mouseStrength}
          unit="%"
          onChange={(mouseStrength) => onChange({ mouseStrength })}
        />
        <Typography sx={caption}>
          Off at 0%. Optional cursor stirring adds an external force.
        </Typography>
      </ControlsSection>
    </>
  );
}
