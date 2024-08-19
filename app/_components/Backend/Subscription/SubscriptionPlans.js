"use client";
import ListItems from "@/app/_components/Landing/Pricing/ListItems";
import { useFlash } from "@/app/_context/FlashContext";
import useSubscription from "@/app/_hooks/useSubscription";
import { isEmptyObject } from "@/app/_util/utilities";
import { useUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  Typography,
} from "@mui/material";
import { Container, Stack, styled } from "@mui/system";
import { useRouter } from "next/navigation";

const basicFeatures = [
  "Limited Collections",
  "3 Flashcards Generation",
  "Dashboard Analytics",
  "Track Progress",
];

const premiumFeatures = [
  "Unlimited Collections",
  "10 Flashcards Generation",
  "Dashboard Analytics",
  "Track Progress",
  "4+ Languages supported",
  "Difficulty Selection",
];

const PriceTag = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

function SubscriptionPlans() {
  const { state } = useFlash();
  const { user, isLoaded } = useUser();
  const { handleSubscription, loading, error } = useSubscription();
  const router = useRouter();

  const handleSubmit = () => {
    if (isLoaded && user && state.fbUser) {
      handleSubscription();
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid
          item
          xs={12}
          md={6}
          style={{ maxWidth: "100%", flexGrow: "1" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "flex-start",
              md: "center",
              lg: "center",
            },
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <Stack direction="column" spacing={1} flexGrow="1">
            <Typography variant="h5">
              Choose the Perfect Plan for Your Learning Journey
            </Typography>
            <Typography variant="body1">
              Explore our tailored plans designed to elevate your flashcard
              experience. Whether you&apos;re just getting started or looking
              for advanced features, find the plan that fits your learning style
              and goals.
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      {isEmptyObject(state.fbUser) ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
          height="100vh"
          textAlign="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ py: 12 }}>
            <Container>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                data-aos="fade-up"
              >
                Subscription Plans
              </Typography>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Grid item xs={12} md={6} data-aos="fade-up">
                  <Box className="card">
                    <Box className="card__border"></Box>
                    <Box className="card_title__container">
                      <Typography variant="h6" className="card_title">
                        Basic
                      </Typography>
                      <PriceTag>$0.00</PriceTag>
                      <Typography variant="body2" className="card_paragraph">
                        Perfect for individuals just getting started. Limited
                        features.
                      </Typography>
                    </Box>
                    <Divider className="line" />
                    <List className="card__list">
                      {basicFeatures.map((title, index) => (
                        <ListItems key={index} title={title} />
                      ))}
                    </List>
                    <Button
                      variant="contained"
                      className="button"
                      disabled={
                        isLoaded &&
                        user &&
                        state.fbUser &&
                        state.fbUser?.subscription?.plan === "Basic"
                      }
                      sx={{
                        "&.Mui-disabled": {
                          color: "#fff",
                          backgroundImage:
                            "linear-gradient(to bottom, #646669, #B5B8BB)",
                          outline: "1px solid #646669",
                        },
                      }}
                    >
                      {isLoaded && user && state.fbUser
                        ? state.fbUser?.subscription?.plan === "Basic"
                          ? "Current Subscription"
                          : state.fbUser?.subscription?.plan === "Premium"
                          ? "Downgrade Now"
                          : "Get Started"
                        : "Get Started"}
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <Box className="card">
                    <Box className="card__border"></Box>
                    <Box className="card_title__container">
                      <Typography variant="h6" className="card_title">
                        Premium
                      </Typography>
                      <PriceTag>$3.99/mo</PriceTag>
                      <Typography variant="body2" className="card_paragraph">
                        Unlock advanced features and unlimited collections.
                      </Typography>
                    </Box>
                    <Divider className="line" />
                    <List className="card__list">
                      {premiumFeatures.map((title, index) => (
                        <ListItems key={index} title={title} />
                      ))}
                    </List>
                    <Button
                      variant="contained"
                      className="button"
                      disabled={
                        (isLoaded &&
                          user &&
                          state.fbUser &&
                          state.fbUser?.subscription?.plan === "Premium") ||
                        loading
                      }
                      onClick={handleSubmit}
                      sx={{
                        "&.Mui-disabled": {
                          color: "#fff",
                          backgroundImage:
                            "linear-gradient(to bottom, #646669, #B5B8BB)",
                          outline: "1px solid #646669",
                        },
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress
                            size={24}
                            sx={{ color: "#fff", mr: 1 }}
                          />
                          Processing...
                        </>
                      ) : isLoaded && user && state.fbUser ? (
                        state.fbUser?.subscription?.plan === "Premium" ? (
                          "Current Subscription"
                        ) : state.fbUser?.subscription?.plan === "Basic" ? (
                          "Upgrade Now"
                        ) : (
                          "Get Premium"
                        )
                      ) : (
                        "Get Premium"
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
}

export default SubscriptionPlans;
