"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useFlash } from "@/app/_context/FlashContext";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";

function ToggleColorMode() {
  const { state, toggleThemeMode } = useFlash();

  return (
    <Box sx={{ maxWidth: "32px", mr: 2 }}>
      <Button
        variant="text"
        onClick={toggleThemeMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{
          minWidth: "32px",
          height: "32px",
          p: "4px",
          bgcolor: "rgba(33, 150, 243, 0.1)",
        }}
      >
        {state.themeMode === "dark" ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}

export default ToggleColorMode;
