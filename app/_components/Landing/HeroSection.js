import { SignedOut } from "@clerk/nextjs";
import { Button, Typography } from "@mui/material";
import { Container, styled } from "@mui/system";

const HeroSec = styled("div")(({ theme }) => ({
  backgroundColor: "#111827",
  color: "#ffffff",
  padding: theme.spacing(12, 0),
  textAlign: "center",
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

function HeroSection() {
  return (
    <HeroSec>
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#fff",
            fontSize: {
              xs: 24,
              md: 32,
              lg: 40,
            },
          }}
          data-aos="fade-up"
        >
          Supercharge Your Learning with
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: 24,
              md: 32,
              lg: 40,
            },
            color: "#fff",
            background: "linear-gradient(to bottom, #42A5F5, #1E88E5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          data-aos="fade-up"
        >
          MindStacks
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          data-aos="fade-up"
          data-aos-delay="200"
          sx={{ mt: 2, color: "#ccc" }}
        >
          The ultimate flashcard tool designed for efficiency and effectiveness.
          Learn faster, retain more.
        </Typography>
        <SignedOut>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4 }}
            href="/sign-up"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Start Your Free Trial
          </Button>
        </SignedOut>
      </Container>
    </HeroSec>
  );
}

export default HeroSection;
