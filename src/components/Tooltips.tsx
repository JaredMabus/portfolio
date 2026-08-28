import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTooltip = styled(Tooltip)<TooltipProps>(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: theme.spacing(1),
    color: theme.palette.inverseOnSurface.main,
    fontWeight: "bold",
    fontSize: ".7rem",
    backgroundColor: theme.palette.inverseSurface.main,
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
