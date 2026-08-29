import React from "react";
import { Box, useTheme, SxProps, Theme } from "@mui/material";
import profileNoBlob from "@/assets/images/profile-pic-no-blob.svg";

interface ProfileAvatarProps {
  sx?: SxProps<Theme>;
  blobColor?: string;
}

export default function ProfileAvatar({ sx, blobColor }: ProfileAvatarProps) {
  const theme = useTheme();
  const fill = blobColor || theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: "inline-block",
        position: "relative",
        lineHeight: 0,
        width: "100%",
        maxWidth: { xs: "280px", sm: "340px", md: "440px" },
        ...sx,
      }}
    >
      <svg
        viewBox="0 0 440 285"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
        aria-label="developer profile illustration"
        role="img"
      >
        {/* Dynamic Theme Neutral Organic Blob */}
        <path
          d="M438.536 72.4968C438.009 154.13 329.034 186.449 332.716 241.775C336.399 297.101 -159.522 275.339 54.5955 216.403C268.713 157.467 200.793 18.347 200.793 18.347C200.793 18.347 439.063 -9.13695 438.536 72.4968Z"
          fill={fill}
        />
        {/* Profile Artwork Without Blob (Positioned in exact alignment with original) */}
        <image
          href={profileNoBlob}
          x="86.0015"
          y="-41"
          width="341"
          height="342"
          preserveAspectRatio="none"
        />
      </svg>
    </Box>
  );
}
