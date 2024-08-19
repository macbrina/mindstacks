import { SidebarList } from "@/app/_components/Backend/SideBarList";
import { useFlash } from "@/app/_context/FlashContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

function SideBarMenu({ toggleDrawer }) {
  const { state } = useFlash();
  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        {state.drawerOpen && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mr: 4, alignItems: "center" }}
          >
            <Avatar
              src="/images/logo.png"
              alt="MindStacks Logo"
              sx={{ width: 30, height: 30 }}
            />
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              MindStacks
            </Typography>
          </Stack>
        )}
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        component="nav"
        sx={(theme) => ({
          height: "100%",
          bgcolor: theme.palette.mode == "light" ? "#fff" : "#090E10",
        })}
      >
        <SidebarList />
        <Divider sx={{ my: 1 }} />
      </List>
    </>
  );
}

export default SideBarMenu;
