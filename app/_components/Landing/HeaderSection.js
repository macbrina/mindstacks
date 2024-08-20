"use client";

import AccountSubscription from "@/app/_components/Backend/Subscription/AccountSubscription";
import ToggleColorMode from "@/app/_components/ToggleColorMode";
import { useFlash } from "@/app/_context/FlashContext";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/navigation";

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

const DashboardIcon = () => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function HeaderSection() {
  const { user, isLoaded } = useUser();
  const { dispatch, state } = useFlash();
  const router = useRouter();

  const handleSubscriptionClick = () => {
    router.push("/user/dashboard");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(25, 32, 48, 1)",
        })}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 0,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ pl: 2 }}>
            <Avatar
              src="/images/logo.png"
              alt="MindStacks Logo"
              sx={{ width: 30, height: 30 }}
            />
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              MindStacks
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ToggleColorMode />
            <SignedOut>
              <Button href="/sign-in" color="primary">
                Login
              </Button>
              <Button
                href="/sign-up"
                color="primary"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton>
                <UserButton.UserProfilePage
                  label="Subscription"
                  url="custom"
                  labelIcon={<SubscriptionIcon />}
                >
                  <AccountSubscription />
                </UserButton.UserProfilePage>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Dashboard"
                    labelIcon={<DashboardIcon />}
                    href="/user/dashboard"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderSection;
