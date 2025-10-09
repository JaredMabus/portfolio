import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTooltip = styled(Tooltip)<TooltipProps>(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    fontWeight: "bold",
    fontSize: ".7rem",
    backgroundColor: theme.palette.surface.light,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.surface.light,
  },
  [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
    right: "0px",
    top: "-20px",
  },
}));

export default StyledTooltip;

// export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     padding: theme.spacing(1),
//     color: theme.palette.text.primary,
//     fontWeight: "bold",
//     fontSize: ".7rem",
//     backgroundColor: theme.palette.surface.light,
//   },
//   [`& .${tooltipClasses.arrow}`]: {
//     color: theme.palette.surface.light,
//   },
//   "& .MuiTooltip-popper":{

//   }
// }));

// export default StyledTooltip;
