import { alpha, type Theme } from "@mui/material/styles";
import { common, grey } from "@mui/material/colors";

export const sharedComponents = {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h6",
          subtitle2: "p",
          body1: "p",
          body2: "p",
          button: "span",
          caption: "span",
          overline: "span",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          disableScrollLock: true,
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.neutral.main,
            "& .MuiChip-icon, & .MuiChip-deleteIcon, & .material-symbol": {
              color: "inherit",
            },
            "&.MuiChip-clickable:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.neutral.high,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: theme.palette.action.disabledBackground,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            borderColor: theme.palette.border.main,
            "& .MuiChip-icon, & .MuiChip-deleteIcon, & .material-symbol": {
              color: "inherit",
            },
            "&.MuiChip-clickable:hover": {
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.neutral.high, 0.6),
              borderColor: theme.palette.border.high,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              borderColor: theme.palette.action.disabledBackground,
            },
          }),
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "--icon-btn-radius": "50%",
          border: "1px solid transparent",
          borderRadius: "var(--icon-btn-radius)",
          color: theme.palette.text.primary,
          overflow: "hidden",
          transition: "all 0.2s ease-in-out",

          "&.MuiIconButton-sizeSmall": {
            padding: theme.spacing(0.5),
          },
          "&.MuiIconButton-sizeMedium": {
            padding: theme.spacing(0.75),
          },
          "&.MuiIconButton-sizeLarge": {
            padding: theme.spacing(1),
          },

          "& .MuiSvgIcon-root, & .material-symbol": {
            color: "inherit",
            fontSize: "1em",
            position: "relative",
            zIndex: 1,
          },

          "&.MuiIconButton-colorInherit": {
            color: "inherit",
          },
          "&.MuiIconButton-colorPrimary": {
            color: theme.palette.primary.main,
          },
          "&.MuiIconButton-colorSecondary": {
            color: theme.palette.secondary.main,
          },
          "&.MuiIconButton-colorError": {
            color: theme.palette.error.main,
          },
          "&.MuiIconButton-colorInfo": {
            color: theme.palette.info.main,
          },
          "&.MuiIconButton-colorSuccess": {
            color: theme.palette.success.main,
          },
          "&.MuiIconButton-colorWarning": {
            color: theme.palette.warning.main,
          },
          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },

          "& .MuiTouchRipple-root, & .MuiTouchRipple-child": {
            borderRadius: "var(--icon-btn-radius)",
            transition: "all 0.2s ease-in-out",
          },
          "& .MuiTouchRipple-root": {
            zIndex: 0,
          },
        }),
      },
      variants: [
        {
          props: { variant: "outlined", color: "primary" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
            borderColor: theme.palette.primary.state.outlinedBorder,
            "&:hover": {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.state.hover,
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: "transparent",
              borderColor: theme.palette.action.disabledBackground,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            borderColor: theme.palette.border.main,
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.surfaceContainer.high, 0.6),
              borderColor: theme.palette.border.high,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: "transparent",
              borderColor: theme.palette.action.disabledBackground,
            },
          }),
        },
        {
          props: { color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainerHighest.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.surfaceContainerHigh.main,
            },
            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: "transparent",
            },
          }),
        },
      ],
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        slotProps: {
          popper: {
            sx: { pointerEvents: "none" },
            modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
          },
        },
      },
      styleOverrides: {
        tooltip: ({ theme }: { theme: Theme }) => ({
          minHeight: 32,
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1, 1.5),
          borderRadius: 8,
          backgroundColor:
            theme.palette.mode === "light"
              ? common.black
              : theme.palette.inverseSurface.main,
          color:
            theme.palette.mode === "light"
              ? common.white
              : theme.palette.inverseOnSurface.main,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: "0.01em",
          boxShadow: theme.shadows[2],
        }),
        arrow: ({ theme }: { theme: Theme }) => ({
          color:
            theme.palette.mode === "light"
              ? common.black
              : theme.palette.inverseSurface.main,
          fontSize: 10,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 24,
          whiteSpace: "nowrap",
          padding: theme.spacing(1, 2.5),
          fontSize: "0.875rem",
          fontWeight: 600,
          width: "auto",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
            padding: theme.spacing(1.25, 3),
            minHeight: 48,
          },

          "& .MuiButton-icon > *:nth-of-type(1)": {
            fontSize: "1em",
          },

          "& > :not(.MuiTouchRipple-root), & .MuiButton-icon, & .MuiButton-loadingIndicator, & .MuiLoadingButton-loadingIndicator, & .MuiSvgIcon-root, & .material-symbol":
          {
            zIndex: 1,
          },

          "& .MuiTouchRipple-root": {
            zIndex: 0,
          },

          // Loading state
          "&.MuiButton-loading": {
            cursor: "wait",
            color: alpha(theme.palette.text.disabled, 0.2),
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },
          },
          "& .MuiButton-loadingIndicator, & .MuiLoadingButton-loadingIndicator":
          {
            color: theme.palette.text.disabled,
          },
          // Disabled state
          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },
        }),
        sizeSmall: ({ theme }: { theme: Theme }) => ({
          padding: theme.spacing(0.5, 1.5),
          fontSize: "0.8rem",
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0.75, 2),
            fontSize: "0.875rem",
            minHeight: 38,
          },
        }),
        sizeMedium: ({ theme }: { theme: Theme }) => ({
          padding: theme.spacing(1, 2.5),
          fontSize: "0.875rem",
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1.25, 3),
            fontSize: "1rem",
            minHeight: 48,
          },
        }),
        sizeLarge: ({ theme }: { theme: Theme }) => ({
          padding: theme.spacing(1.5, 3.5),
          fontSize: "1rem",
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1.75, 4),
            fontSize: "1.1rem",
            minHeight: 54,
          },
        }),
        contained: ({ theme }: { theme: Theme }) => ({
          boxShadow: "none",
          color: theme.palette.surface.main,
          "& .MuiSvgIcon-root, & .material-symbol": {
            color: "inherit",
          },
          "&:hover": {
            boxShadow: "none",
          },
        }),
        outlined: ({ theme }: { theme: Theme }) => ({
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        }),
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.surface.main,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.high,
            },
          }),
        },
        {
          props: { variant: "contained", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.surfaceContainer.main,
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },

            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.surfaceContainer.state.hover,
              "& .MuiSvgIcon-root, & .material-symbol": {
                color: "inherit",
              },
            },
          }),
        },
        {
          props: { variant: "outlined", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.surfaceContainer.main,
            borderColor: theme.palette.border.main,
            borderRadius: "24px",
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },

            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.surfaceContainer.state.hover,
              borderColor: theme.palette.border.high,
              "& .MuiSvgIcon-root, & .material-symbol": {
                color: "inherit",
              },
            },
          }),
        },
        {
          props: { variant: "text", color: "neutral" },
          style: ({ theme }: { theme: Theme }) => ({
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            color: theme.palette.text.secondary,
            borderRadius: "24px",
            px: 4,
            background: alpha(theme.palette.surfaceContainer.main, 0.1),
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },
            "& .MuiSvgIcon-root, & .material-symbol": {
              color: "inherit",
            },

            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.surfaceContainer.high, 0.4),
              "& .MuiSvgIcon-root, & .material-symbol": {
                color: "inherit",
              },
            },
          }),
        },
      ],
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => {
          return {
            "&::after": {
              background: `linear-gradient(90deg, transparent 0%, ${alpha(
                grey[900],
                0.04,
              )} 60%, transparent 100%)`,
              ...theme.applyStyles("dark", {
                background: `linear-gradient(90deg, transparent 0%, ${alpha(
                  grey[400],
                  0.05,
                )} 60%, transparent 100%)`,
              }),
            },
          };
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "&.side-nav-button": {
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
            whiteSpace: "nowrap",
            transition: theme.transitions.create("all", {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
            color: theme.palette.text.secondary,
            "--app-state-hover": theme.palette.surfaceContainer.state.hover,
            "--app-state-focus-visible":
              theme.palette.surfaceContainer.state.focusVisible,
            "--app-state-selected":
              theme.palette.surfaceContainer.state.selected,
            "--app-state-disabled-bg":
              theme.palette.surfaceContainer.state.disabledBg,

            // Mobile/Smaller Screen styles (Larger touch targets)
            minHeight: 44,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,

            // Desktop/Larger Screen styles (More compact)
            [theme.breakpoints.up("md")]: {
              minHeight: 32,
              marginTop: 0,
              marginBottom: 0,
            },

            "& .MuiListItemText-root": {
              margin: 0,
              paddingLeft: 0,
            },

            "& .MuiListItemText-primary": {
              color: theme.palette.text.primary,
              fontWeight: 500,
              fontSize: "0.875rem",
              lineHeight: 1.25,
            },

            "& .MuiListItemIcon-root, & .MuiListItemText-root, & .material-symbol":
            {
              position: "relative",
              zIndex: 1,
            },

            "& .MuiTouchRipple-root": {
              zIndex: 0,
            },

            "& .MuiTouchRipple-child": {
              backgroundColor: "var(--app-state-selected)",
            },

            "&:hover": {
              backgroundColor: "var(--app-state-hover)",
              color: theme.palette.text.primary,
            },

            "&.Mui-focusVisible": {
              backgroundColor: "var(--app-state-focus-visible)",
            },

            "&.Mui-selected, &.active": {
              backgroundColor: "var(--app-state-selected)",
              color: theme.palette.text.primary,
              "& .MuiListItemText-primary": {
                fontWeight: 700,
              },
              "& .inactive-icon": { display: "none" },
              "& .active-icon": { display: "flex" },
            },

            "&.Mui-selected:hover, &.active:hover": {
              backgroundColor: "var(--app-state-selected)",
            },

            "&.Mui-disabled": {
              backgroundColor: "var(--app-state-disabled-bg)",
              color: theme.palette.text.disabled,
            },
          },
        }),
      },
    },
};
