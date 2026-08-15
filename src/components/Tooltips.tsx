import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTooltip = styled(Tooltip)<TooltipProps>(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: theme.spacing(0.75, 1.25),
    color: theme.palette.inverseOnSurface.main,
    fontWeight: 500,
    fontSize: "0.75rem",
    backgroundColor: theme.palette.inverseSurface.main,
    borderRadius: 8,
    boxShadow: theme.shadows[2],
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.inverseSurface.main,
  },
  [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
    right: "0px",
    top: "-20px",
  },
}));

export default StyledTooltip;
