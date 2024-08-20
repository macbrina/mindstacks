"use client";

import {
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ClientOnly from "@/app/_components/ClientOnly";
import HeaderSection from "@/app/_components/Landing/HeaderSection";
import FooterSection from "@/app/_components/Landing/FooterSection";

const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
}));

const TermsOfServicePage = () => {
  return (
    <ClientOnly>
      <HeaderSection />
      <PageContainer maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>

        <Typography variant="body1" paragraph>
          Last updated: 20-08-2024
        </Typography>

        <SectionTitle variant="h5">1. Introduction</SectionTitle>
        <Typography variant="body1" paragraph>
          Welcome to MindStacks. These Terms of Service ("Terms") govern your
          use of our website and services. By accessing or using our services,
          you agree to be bound by these Terms. If you do not agree, please do
          not use our services.
        </Typography>

        <SectionTitle variant="h5">2. User Responsibilities</SectionTitle>
        <Typography variant="body1" paragraph>
          As a user, you agree to:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Provide accurate and complete information" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use our services only for lawful purposes" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Not engage in any activity that could harm our services or other users" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Keep your account credentials confidential" />
          </ListItem>
        </List>

        <SectionTitle variant="h5">3. Acceptable Use</SectionTitle>
        <Typography variant="body1" paragraph>
          You agree not to:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Post or transmit any illegal, harmful, or offensive content" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Interfere with or disrupt our services or servers" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Attempt to gain unauthorized access to our systems" />
          </ListItem>
        </List>

        <SectionTitle variant="h5">4. Intellectual Property</SectionTitle>
        <Typography variant="body1" paragraph>
          All content and materials on our services, including text, graphics,
          logos, and software, are the property of MindStacks or its licensors.
          You may not use, reproduce, or distribute any content without our
          prior written consent.
        </Typography>

        <SectionTitle variant="h5">5. Limitation of Liability</SectionTitle>
        <Typography variant="body1" paragraph>
          To the maximum extent permitted by law, MindStacks shall not be liable
          for any indirect, incidental, special, or consequential damages
          arising out of or in connection with your use of our services. Our
          total liability shall be limited to the amount paid by you for our
          services, if any.
        </Typography>

        <SectionTitle variant="h5">6. Termination</SectionTitle>
        <Typography variant="body1" paragraph>
          We may terminate or suspend your access to our services at any time,
          without prior notice or liability, if you breach these Terms or for
          any other reason.
        </Typography>

        <SectionTitle variant="h5">7. Changes to These Terms</SectionTitle>
        <Typography variant="body1" paragraph>
          We may update these Terms from time to time. We will notify you of any
          changes by posting the new Terms on this page and updating the "Last
          updated" date.
        </Typography>

        <SectionTitle variant="h5">8. Contact Us</SectionTitle>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about these Terms, please
          contact us at:
          <Link href="mailto:support@mindstacks.com" color="primary">
            preciousmbaekwe@gmail.com
          </Link>
        </Typography>

        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} MindStacks. All rights reserved.
        </Typography>
      </PageContainer>
      <FooterSection />
    </ClientOnly>
  );
};

export default TermsOfServicePage;
