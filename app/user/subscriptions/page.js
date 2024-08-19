import SubscriptionList from "@/app/_components/Backend/Subscription/SubscriptionList";
import ClientOnly from "@/app/_components/ClientOnly";
import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const metadata = {
  title: "Manage Your Subscriptions",
  description:
    "Access and manage your subscriptions on MindStacks. View your current plans, update your subscription details, and explore available options to get the most out of your experience.",
};

function Page() {
  return (
    <ClientOnly>
      <Grid container spacing={2} sx={{ marginTop: 5, pb: 10 }}>
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
            <Typography variant="h5">Subscriptions</Typography>
            <Typography variant="body1">Manage your subscriptions</Typography>
          </Stack>
        </Grid>
      </Grid>
      <SubscriptionList />
    </ClientOnly>
  );
}

export default Page;
