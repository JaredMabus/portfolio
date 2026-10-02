import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createEarthScene, type SceneSettings } from "./createEarthScene";
import { earthColors as colors } from "./earthTheme";

export default function EarthScene({ settings }: { settings: SceneSettings }) {
  const host = useRef<HTMLDivElement>(null);
  const liveSettings = useRef(settings);
  const [status, setStatus] = useState("Preparing Earth…");
  useEffect(() => {
    liveSettings.current = settings;
  }, [settings]);
  useEffect(() => {
    if (!host.current) return;
    try {
      return createEarthScene(
        host.current,
        liveSettings,
        () => setStatus(""),
        setStatus,
      );
    } catch {
      setStatus(
        "This scene requires WebGL 2. Try a browser with hardware acceleration enabled.",
      );
    }
  }, []);
  return (
    <>
      <Box
        ref={host}
        sx={{
          position: "absolute",
          inset: 0,
          "& canvas": { display: "block", width: "100%", height: "100%" },
        }}
      />
      {status && (
        <Box
          role="status"
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
            px: 4,
          }}
        >
          <Typography
            sx={{
              color: colors.text,
              background: colors.panel,
              px: 3,
              py: 2,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            {status}
          </Typography>
        </Box>
      )}
    </>
  );
}
