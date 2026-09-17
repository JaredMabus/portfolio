import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";

interface PaletteToken {
  token: string;
  lightHex: string;
  darkHex: string;
  desc?: string;
  level?: string;
}

interface PaletteReferenceProps {
  isDark: boolean;
  paletteTokens: PaletteToken[];
  scaleTokens: PaletteToken[];
}

interface TokenGroupProps {
  isDark: boolean;
  label: string;
  tokens: PaletteToken[];
}

function TokenGroup({ isDark, label, tokens }: TokenGroupProps) {
  const theme = useTheme();

  return (
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
        {label}
      </Typography>
      <Grid container spacing={2}>
        {tokens.map((item) => {
          const hex = isDark ? item.darkHex : item.lightHex;
          return (
            <Grid key={item.token} size={{ xs: 12, sm: 6, md: 2.4 }}>
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
                  {item.desc ?? item.level}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default function PaletteReference({
  isDark,
  paletteTokens,
  scaleTokens,
}: PaletteReferenceProps) {
  const theme = useTheme();

  return (
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

      <TokenGroup
        isDark={isDark}
        label="Categorical Series Tokens (--chart-1 to --chart-5)"
        tokens={paletteTokens}
      />
      <TokenGroup
        isDark={isDark}
        label="Sequential Scale Tokens (--chart-scale-01 to --chart-scale-05)"
        tokens={scaleTokens}
      />
    </Card>
  );
}
