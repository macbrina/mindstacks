"use client";

import Header from "@/app/_components/Backend/Header";
import SideBarMenu from "@/app/_components/Backend/SideBarMenu";
import ClientOnly from "@/app/_components/ClientOnly";
import { AppBar, Drawer } from "@/app/_util/styling";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import NextTopLoader from "nextjs-toploader";
import CopyRight from "@/app/_components/Backend/CopyRight";
import { useFlash } from "@/app/_context/FlashContext";

function Layout({ children }) {
  const { toggleDrawer, state } = useFlash();

  return (
    <>
      <NextTopLoader showSpinner={false} />
      <ClientOnly>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={state.drawerOpen}>
            <Header toggleDrawer={toggleDrawer} open={state.drawerOpen} />
          </AppBar>
          <Drawer variant="permanent" open={state.drawerOpen}>
            <SideBarMenu toggleDrawer={toggleDrawer} />
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "#fff"
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              paddingBottom: "70px",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {children}
            </Container>
            <CopyRight />
          </Box>
        </Box>
      </ClientOnly>
    </>
  );
}

export default Layout;
