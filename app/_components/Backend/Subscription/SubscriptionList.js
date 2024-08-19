"use client";
import SkeletonTableLoader from "@/app/_components/Backend/SkeletonTableLoader";
import SubscriptionTable from "@/app/_components/Backend/Subscription/SubscriptionTable";
import { useFlash } from "@/app/_context/FlashContext";
import { fetchUserSubscriptions } from "@/app/_lib/data-service";
import { isEmptyObject } from "@/app/_util/utilities";
import { useUser } from "@clerk/nextjs";
import { Grid, Paper } from "@mui/material";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

function SubscriptionList() {
  const { user, isLoaded } = useUser();
  const { state, updateSubscriptionList, dispatch } = useFlash();
  const memoizedSubscriptionListLength = useMemo(
    () => state.subscriptionList.length,
    [state.subscriptionList]
  );

  useEffect(() => {
    if (!user || memoizedSubscriptionListLength > 0) return;

    async function fetchCategories() {
      dispatch({ type: "SET_SUBSCRIPTION_LOADING", payload: true });

      try {
        await fetchUserSubscriptions(user, updateSubscriptionList);
      } catch (error) {
        error;
        toast.error("Error fetching categories:", error.message);
      } finally {
        dispatch({ type: "SET_SUBSCRIPTION_LOADING", payload: false });
      }
    }

    fetchCategories();
  }, [user, dispatch, updateSubscriptionList, memoizedSubscriptionListLength]);

  if (
    (!isLoaded && !user) ||
    state.subscriptionLoading ||
    isEmptyObject(state.fbUser)
  )
    return <SkeletonTableLoader />;

  return (
    <Grid
      item
      xs={12}
      sx={{
        paddingRight: "0px",
      }}
    >
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#fff" : theme.palette.grey[900],
          backgroundImage: (theme) =>
            theme.palette.mode === "light"
              ? `none`
              : "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 2px",

          overflow: "hidden",
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <SubscriptionTable items={state.subscriptionList} user={user} />
      </Paper>
    </Grid>
  );
}

export default SubscriptionList;
