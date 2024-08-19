"use client";

import { useState } from "react";
import {
  cancelSubscription,
  fetchUserSubscriptions,
  getActivePremiumSubscription,
  getSubscriptionByUserId,
  getUserData,
  resetUserToBasic,
  updateSubscription,
} from "@/app/_lib/data-service";
import { useUser } from "@clerk/nextjs";
import { useFlash } from "../_context/FlashContext";

const useCancelSubscription = () => {
  const [loading, setLoading] = useState(false);
  const { isLoaded, user } = useUser();
  const { dispatch, updateSubscriptionList } = useFlash();

  const cancelUserSubscription = async (subscriptionId) => {
    setLoading(true);

    try {
      if (isLoaded && user) {
        const response = await fetch("/api/cancel-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscriptionId }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const activePremiumSubscription = await getActivePremiumSubscription(
          user.id
        );

        if (activePremiumSubscription) {
          await cancelSubscription(activePremiumSubscription.id, "canceled");
        }

        await fetchUserSubscriptions(user, updateSubscriptionList);

        await resetUserToBasic(user.id);

        const fbUser = await getUserData(user);
        return fbUser;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    cancelUserSubscription,
    loading,
  };
};

export default useCancelSubscription;
