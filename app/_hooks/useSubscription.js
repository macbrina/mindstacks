import getStripe from "@/app/_util/get-stripe";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useFlash } from "@/app/_context/FlashContext";
import { getUserData } from "@/app/_lib/data-service";

const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoaded, user } = useUser();

  const handleSubscription = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!isLoaded && !user) {
        throw new Error("User not logged in");
      }

      const newUser = await getUserData(user);

      if (newUser) {
        const response = await fetch("/api/checkout_session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: newUser,
            email: user.primaryEmailAddress.emailAddress,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const stripe = await getStripe();
          const { error } = await stripe.redirectToCheckout({
            sessionId: data.id,
          });

          if (error) {
            throw new Error(error.message);
          }
        } else {
          throw new Error(data.error || "Failed to create checkout session");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubscription,
    loading,
    error,
  };
};

export default useSubscription;
