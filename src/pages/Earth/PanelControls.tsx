import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import { earthColors as colors } from "./earthTheme";

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

