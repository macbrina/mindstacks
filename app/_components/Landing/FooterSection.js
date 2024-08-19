import { Divider, Grid, Link, Typography } from "@mui/material";
import { Container, styled } from "@mui/system";

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

function FooterSection() {
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
          <Grid item>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.12)" }} />
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 MindStacks. All rights reserved.
        </Typography>
      </Container>
    </Footer>
  );
}

export default FooterSection;
