"use client";

import FeaturesSection from "@/app/_components/Landing/FeaturesSection";
import HeaderSection from "@/app/_components/Landing/HeaderSection";
import HeroSection from "@/app/_components/Landing/HeroSection";
import PricingSection from "@/app/_components/Landing/PricingSection";
import { Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import FooterSection from "./FooterSection";
import { useFlash } from "@/app/_context/FlashContext";
import { useEffect } from "react";

function Landing() {
  const { state } = useFlash();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });

    AOS.refresh();
  }, [state.themeMode]);

  return (
    <Box>
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer Section */}
      <FooterSection />
    </Box>
  );
}

export default Landing;
