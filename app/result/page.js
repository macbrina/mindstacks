"use client";

import { Box } from "@mui/system";
import ClientOnly from "@/app/_components/ClientOnly";
import { Button, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";

const { useRouter, useSearchParams } = require("next/navigation");
const { useState, useEffect } = require("react");

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!session_id) return;

    const fetchCheckoutSession = async () => {
      try {
        setError(null);
        const response = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch checkout session");
        }

        const sessionData = await response.json();
        setSession(sessionData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading)
    return (
      <ClientOnly>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
          height="100vh"
          textAlign="center"
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(249,250,251, 0.4)"
                : "rgba(25, 32, 48, 1)",
          })}
        >
          <CircularProgress />
          <Typography variant="h5" component="h1" fontWeight="bold">
            Loading...
          </Typography>
          <Typography variant="h6" component="h1" fontWeight="bold">
            Don&apos;t refresh the page
          </Typography>
        </Box>
      </ClientOnly>
    );

  if (error)
    <ClientOnly>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
        height="100vh"
        textAlign="center"
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(249,250,251, 0.4)"
              : "rgba(25, 32, 48, 1)",
        })}
      >
        <Typography variant="h6" component="h1" fontWeight="bold">
          {error}
        </Typography>
      </Box>
    </ClientOnly>;

  return (
    <ClientOnly>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
        height="100vh"
        textAlign="center"
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(249,250,251, 0.4)"
              : "rgba(25, 32, 48, 1)",
        })}
      >
        {session.payment_status === "paid" ? (
          <>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Thank you for subscribing. Start using your plan
            </Typography>
            <Link href="/user/dashboard">
              <Button variant="contained">Go to your dashboard</Button>
            </Link>
          </>
        ) : (
          <>
            <Typography variant="h6" component="h1" fontWeight="bold">
              Your payment was not successful
            </Typography>
            <Link href="/user/dashboard">
              <Button variant="contained">Go to your dashboard</Button>
            </Link>
          </>
        )}
      </Box>
    </ClientOnly>
  );
};

export default ResultPage;
