import { useFlash } from "@/app/_context/FlashContext";
import { Bolt } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { differenceInDays } from "date-fns";
import ClientOnly from "@/app/_components/ClientOnly";
import { useRouter } from "next/navigation";
import useSubscription from "@/app/_hooks/useSubscription";
import useCancelSubscription from "@/app/_hooks/useCancelSubscription";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

function AccountSubscription() {
  const { state } = useFlash();

  const { user, isLoaded } = useUser();
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const { handleSubscription, loading, error } = useSubscription();
  const { cancelUserSubscription, loading: loadingCancel } =
    useCancelSubscription();
  const router = useRouter();

  const handleSubmit = () => {
    if (isLoaded && user && state.fbUser) {
      handleSubscription();
    } else {
      router.push("/sign-in");
    }
  };

  const handleCancelSubscription = () => {
    setShowCancelConfirmation(true);
  };

  const handleCancel = async (subscriptionId) => {
    try {
      const response = await cancelUserSubscription(subscriptionId);
      if (response) {
        toast.success("Subscription canceled successfully");
      }
      router.push("/user/dashboard");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while canceling the subscription."
      );
    } finally {
      setShowCancelConfirmation(false);
    }
  };

  const premiumSubscription = {
    plan: "Premium Plan",
    price: "$3.99/month",
    description:
      "Unlock all premium features, including unlimited access to all tools, priority support, and more.",
  };

  return (
    <ClientOnly>
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <Card variant="outlined" sx={{ marginBottom: 3 }}>
          <CardContent>
            {state.fbUser.subscription.plan == "Basic" ? (
              <>
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    Active Subscription
                  </Typography>
                  {state.fbUser.subscription.plan == "Basic" && (
                    <Stack direction="row">
                      <Bolt color="success" />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "#51BC51" }}
                      >
                        Active
                      </Typography>
                    </Stack>
                  )}
                </Stack>
                <Typography variant="body1" color="text.primary">
                  Current Plan: {state.fbUser.subscription.plan} Plan
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Ends At: Lifetime Access
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" component="div">
                  Downgrade to Basic
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  Basic access
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Price: $0.00
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Downgrade Now
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Premium Subscription */}
        <Card variant="outlined">
          <CardContent>
            {state.fbUser.subscription.plan == "Premium" ? (
              <>
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    Active Subscription
                  </Typography>
                  {state.fbUser.subscription.plan == "Premium" && (
                    <Stack direction="row">
                      <Bolt color="success" />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "#51BC51" }}
                      >
                        Active
                      </Typography>
                    </Stack>
                  )}
                </Stack>
                <Typography variant="body1" color="text.primary">
                  Current Plan: {state.fbUser.subscription.plan} Plan
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Ends At: {state.fbUser.subscription.plan} Plan -{" "}
                  {differenceInDays(
                    state.fbUser.subscription.endsAt.seconds * 1000,
                    new Date()
                  )}{" "}
                  Days Left
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginTop: 2 }}
                  onClick={handleCancelSubscription}
                  disabled={loadingCancel}
                >
                  Cancel Subscription
                </Button>

                {/* Cancellation Confirmation Modal */}
                <Dialog
                  open={showCancelConfirmation}
                  onClose={() => setShowCancelConfirmation(false)}
                >
                  <DialogTitle>Confirm Cancellation</DialogTitle>
                  <DialogContent>
                    <Typography>
                      Are you sure you want to cancel your active subscription?
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setShowCancelConfirmation(false)}
                      variant="outlined"
                      disabled={loadingCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleCancel(state.fbUser.subscription.id)}
                      color="error"
                      variant="contained"
                      disabled={loadingCancel}
                    >
                      {loadingCancel ? "Processing..." : "Cancel Subscription"}
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <>
                <Typography variant="h6" component="div">
                  Upgrade to Premium
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {premiumSubscription.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Price: {premiumSubscription.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={24}
                        sx={{ color: "#fff", mr: 1 }}
                      />
                      Processing...
                    </>
                  ) : (
                    "Upgrade Now"
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </ClientOnly>
  );
}

export default AccountSubscription;
