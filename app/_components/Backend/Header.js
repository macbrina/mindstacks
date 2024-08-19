"use client";

import AccountSubscription from "@/app/_components/Backend/Subscription/AccountSubscription";
import ToggleColorMode from "@/app/_components/ToggleColorMode";
import { useFlash } from "@/app/_context/FlashContext";
import useSubscription from "@/app/_hooks/useSubscription";
import { getUserData } from "@/app/_lib/data-service";
import { isEmptyObject } from "@/app/_util/utilities";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Bolt } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SubscriptionIcon = () => {
  return (
    <svg
      fill="currentColor"
      width="16px"
      height="16px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.598 8.541c0-1.637.434-2.678 1.889-2.912.508-.1 1.566-.064 2.239-.064v2.5c0 .024.003.064.009.084a.236.236 0 0 0 .228.175c.061 0 .118-.031.178-.09L16.377 2H7.548C3.874 2 2 4.115 2 8.066v8.287l3.598-3.602v-4.21zM14.4 7.248v4.209c0 1.637-.434 2.68-1.889 2.912-.508.1-1.566.065-2.238.065v-2.5a.48.48 0 0 0-.009-.084.242.242 0 0 0-.228-.176c-.062 0-.118.033-.179.092l-6.235 6.232L7.809 18h4.643C16.125 18 18 15.885 18 11.934V3.647l-3.6 3.601z" />
    </svg>
  );
};

function Header({ toggleDrawer, open }) {
  const { state, dispatch } = useFlash();
  const { user, isLoaded } = useUser();

  const { handleSubscription, loading, error } = useSubscription();
  const router = useRouter();

  const handleSubmit = () => {
    if (isLoaded && user && state.fbUser) {
      handleSubscription();
    } else {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    async function fetchUser() {
      if (user && isLoaded && isEmptyObject(state.fbUser)) {
        try {
          const newUser = await getUserData(user);
          dispatch({ type: "SET_FBUSER", payload: newUser });
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    fetchUser();
  }, [user, isLoaded, dispatch, state.fbUser]);

  return (
    <Toolbar
      sx={{
        pr: "24px",
      }}
    >
      {!state.drawerOpen && (
        <Stack direction="row" spacing={1} sx={{ mr: 4 }}>
          <Link href="/account/dashboard">
            <Avatar
              src="/images/logo.png"
              alt="MindStacks Logo"
              sx={{ width: 30, height: 30 }}
            />
          </Link>
        </Stack>
      )}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: "36px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {state.pathname[0].toUpperCase() + state.pathname.slice(1)}
      </Typography>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        {isEmptyObject(state.fbUser) ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={50}
            animation="wave"
          />
        ) : (
          <>
            {isEmptyObject(state.fbUser) ? (
              <></>
            ) : (
              <>
                {state.fbUser?.subscription?.plan === "Basic" && (
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1">Free Trial</Typography>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      startIcon={<Bolt />}
                      disabled={loading}
                      sx={{
                        "&.Mui-disabled": {
                          color: "#fff",
                          backgroundImage:
                            "linear-gradient(to bottom, #646669, #B5B8BB)",
                          outline: "1px solid #646669",
                        },
                      }}
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
                        "Upgrade"
                      )}
                    </Button>
                  </Box>
                )}
                {state.fbUser?.subscription?.plan === "Premium" && (
                  <>
                    <Typography variant="body1">
                      {state.fbUser.subscription.plan} Plan -{" "}
                      {differenceInDays(
                        state.fbUser.subscription.endsAt.seconds * 1000,
                        new Date()
                      )}{" "}
                      Days Left
                    </Typography>
                  </>
                )}
              </>
            )}
          </>
        )}

        <ToggleColorMode />
        <SignedIn>
          <UserButton />
          {/* <UserButton>
            <UserButton.UserProfilePage
              label="Subscription"
              url="custom"
              labelIcon={<SubscriptionIcon />}
            >
              <AccountSubscription />
            </UserButton.UserProfilePage>
          </UserButton> */}
        </SignedIn>
      </Stack>
    </Toolbar>
  );
}

export default Header;
