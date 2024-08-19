import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  styled,
} from "@mui/material";

// Custom styled components
const FeatureSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(249,250,251, 0.4)"
      : "rgba(25, 32, 48, 1)",
}));

const FeatureItem = styled(Box)(({ theme, reverse }) => ({
  display: "flex",
  flexDirection: reverse ? "row-reverse" : "row",
  alignItems: "center",
  marginBottom: theme.spacing(8),
}));

const FeatureContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(0, 4),
}));

const FeatureIconContainer = styled(Box)(({ theme }) => ({
  flex: "0 0 auto",
  width: 120,
  height: 120,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: theme.spacing(4),
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: "#fff",
  color: theme.palette.primary.main,
  fontSize: "32px",
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const FeaturesSection = () => {
  return (
    <FeatureSection>
      <Container>
        <Typography variant="h4" align="center" gutterBottom data-aos="fade-up">
          Features Built for Success
        </Typography>

        <FeatureItem data-aos="fade-up">
          <FeatureIconContainer>
            <FeatureIcon>📚</FeatureIcon>
          </FeatureIconContainer>
          <FeatureContent>
            <Typography variant="h5" gutterBottom>
              Comprehensive Library
            </Typography>
            <FeatureText variant="body1">
              Explore an extensive library of pre-built flashcards across
              various subjects, allowing you to start learning right away.
            </FeatureText>
          </FeatureContent>
        </FeatureItem>

        <FeatureItem
          reverse="row-reverse"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <FeatureIconContainer>
            <FeatureIcon>⚙️</FeatureIcon>
          </FeatureIconContainer>
          <FeatureContent>
            <Typography variant="h5" gutterBottom>
              Fully Customizable
            </Typography>
            <FeatureText variant="body1">
              Tailor your flashcards to suit your learning style with ease and
              flexibility, making your study sessions more effective.
            </FeatureText>
          </FeatureContent>
        </FeatureItem>

        <FeatureItem data-aos="fade-up" data-aos-delay="400">
          <FeatureIconContainer>
            <FeatureIcon>📈</FeatureIcon>
          </FeatureIconContainer>
          <FeatureContent>
            <Typography variant="h5" gutterBottom>
              Track Your Progress
            </Typography>
            <FeatureText variant="body1">
              Analyze your learning progress and improve retention with detailed
              analytics that give you insights into your performance.
            </FeatureText>
          </FeatureContent>
        </FeatureItem>
      </Container>
    </FeatureSection>
  );
};

export default FeaturesSection;
