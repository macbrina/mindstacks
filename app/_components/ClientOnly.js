"use client";

import getLPTheme from "@/app/_components/getLPTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useFlash } from "@/app/_context/FlashContext";

function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  const { state } = useFlash();
  const LPtheme = createTheme(getLPTheme(state.themeMode));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ThemeProvider theme={LPtheme}>{children}</ThemeProvider>;
}

export default ClientOnly;
