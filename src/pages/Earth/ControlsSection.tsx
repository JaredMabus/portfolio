import type { ReactNode } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { earthColors as colors } from "./earthTheme";
import type { EarthSection, SectionState } from "./earthState";

export default function ControlsSection({
  id, title, subtitle, sections, onChange, children,
}: {
  id: EarthSection;
  title: string;
  subtitle: string;
  sections: SectionState;
  onChange: (id: EarthSection, expanded: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Accordion
      expanded={sections[id]}
      onChange={(_, expanded) => onChange(id, expanded)}
      disableGutters
      elevation={0}
      square
      slots={{ heading: "h2" }}
      slotProps={{ transition: { unmountOnExit: true } }}
      sx={{
        background: "transparent",
        color: colors.text,
        borderBottom: `1px solid ${colors.border}`,
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary
        id={`earth-${id}-heading`}
        aria-controls={`earth-${id}-content`}
        aria-label={title}
        expandIcon={<ExpandMoreRoundedIcon sx={{ color: colors.muted, fontSize: 20 }} />}
        sx={{ px: 0, minHeight: 60, "& .MuiAccordionSummary-content": { my: 1.5 } }}
      >
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{title}</Typography>
          <Typography sx={{ fontSize: 10, color: colors.muted, lineHeight: 1.5, mt: 0.25 }}>
            {subtitle}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
