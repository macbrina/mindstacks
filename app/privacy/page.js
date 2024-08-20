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
import FooterSection from "../_components/Landing/FooterSection";

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

const PrivacyPage = () => {
  return (
    <ClientOnly>
      <HeaderSection />
      <PageContainer maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          Last updated: 20-08-2024
        </Typography>

        <SectionTitle variant="h5">1. Introduction</SectionTitle>
        <Typography variant="body1" paragraph>
          Welcome to MindStacks. We are committed to protecting your personal
          information and your right to privacy. This Privacy Policy explains
          how we collect, use, and disclose your information when you use our
          services.
        </Typography>

        <SectionTitle variant="h5">2. Information We Collect</SectionTitle>
        <Typography variant="body1" paragraph>
          We may collect the following types of information:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Personal Information"
              secondary="Name, email address, etc."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Usage Data"
              secondary="Information about how you use our services."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Cookies and Tracking Technologies"
              secondary="We use cookies to enhance your experience."
            />
          </ListItem>
        </List>

        <SectionTitle variant="h5">3. How We Use Your Information</SectionTitle>
        <Typography variant="body1" paragraph>
          We use your information for the following purposes:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="To Provide and Maintain Our Services" />
          </ListItem>
          <ListItem>
            <ListItemText primary="To Improve Our Services" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="To Communicate with You"
              secondary="Send updates, newsletters, and promotional materials."
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="To Monitor Usage and Analyze Data" />
          </ListItem>
        </List>

        <SectionTitle variant="h5">
          4. How We Share Your Information
        </SectionTitle>
        <Typography variant="body1" paragraph>
          We may share your information with:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Service Providers"
              secondary="Who assist us in operating our services."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Legal Requirements"
              secondary="When required by law or to protect our rights."
            />
          </ListItem>
        </List>

        <SectionTitle variant="h5">5. Your Rights</SectionTitle>
        <Typography variant="body1" paragraph>
          You have the following rights regarding your personal information:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Access"
              secondary="Request a copy of your information."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Correction"
              secondary="Request corrections to your information."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Deletion"
              secondary="Request deletion of your information."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Opt-Out"
              secondary="Opt-out of marketing communications."
            />
          </ListItem>
        </List>

        <SectionTitle variant="h5">6. Security</SectionTitle>
        <Typography variant="body1" paragraph>
          We use reasonable measures to protect your information from
          unauthorized access, use, or disclosure. However, no method of
          transmission over the Internet or electronic storage is 100% secure.
        </Typography>

        <SectionTitle variant="h5">
          7. Changes to This Privacy Policy
        </SectionTitle>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Last updated&quot; date.
        </Typography>

        <SectionTitle variant="h5">8. Contact Us</SectionTitle>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about this Privacy Policy or our
          practices, please contact us at:
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

export default PrivacyPage;
