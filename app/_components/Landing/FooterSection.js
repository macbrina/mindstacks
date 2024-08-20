"use client";

import { subscribeEmail } from "@/app/_lib/action";
import {
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Container, styled } from "@mui/system";
import { useRef, useState } from "react";

const Footer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: "#ffffff",
  padding: theme.spacing(6, 0),
  textAlign: "center",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  color: theme.palette.grey[500],
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SubscribeSection = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

function FooterSection() {
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  const handleSubscribe = async (event) => {
    event.preventDefault();
    setPending(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(event.target);

    try {
      const response = await subscribeEmail(formData);

      if (response.errors) {
        setErrors(response.errors);
      } else if (response.success) {
        setSuccessMessage("Thank you for subscribing!");
        formRef.current.reset();
      } else {
        setErrorMessage(response.error || "An error occurred");
      }
    } catch (error) {
      setErrorMessage(response.error || "An error occurred");
    } finally {
      setPending(false);
    }
  };

  return (
    <Footer>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
          </Grid>
          <Grid item>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </Grid>
          {/* <Grid item>
            <FooterLink href="#">Contact Us</FooterLink>
          </Grid> */}
        </Grid>
        <SubscribeSection>
          <Typography variant="h6" gutterBottom color="white">
            Stay Updated with MindStacks!
          </Typography>
          <Typography variant="body2" paragraph color="white">
            Subscribe to our newsletter to get the latest updates, tips, and
            exclusive offers. Don’t miss out!
          </Typography>
          {errorMessage && (
            <Typography variant="h6" color="success.main">
              {errorMessage}
            </Typography>
          )}
          {successMessage ? (
            <Typography variant="h6" color="success.main">
              {successMessage}
            </Typography>
          ) : (
            <form ref={formRef} onSubmit={handleSubscribe}>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    size="small"
                    id="email"
                    name="email"
                    required
                    sx={{
                      color: "#fff",
                      borderColor: "#4C5967",
                      border: "none",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
                      background: "rgba(19, 27, 32, 0.4)",
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={pending}
                    type="submit"
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </SubscribeSection>
        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.12)" }} />
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} MindStacks. All rights reserved.
        </Typography>
      </Container>
    </Footer>
  );
}

export default FooterSection;
