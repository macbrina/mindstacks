import { useFlash } from "@/app/_context/FlashContext";
import {
  CardGiftcard,
  CardMembership,
  Category,
  GifBoxOutlined,
  LibraryBooks,
  Money,
  MoneyOff,
  MoneyOffCsred,
  MoneySharp,
  Subscriptions,
  SubscriptionsTwoTone,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantMenu from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

export const SidebarList = () => {
  const { state } = useFlash();

  return (
    <>
      <Link href="/user/dashboard">
        <ListItemButton
          sx={{
            justifyContent: state.drawerOpen ? "flex-start" : "center",
            paddingBottom: "15px",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: state.drawerOpen ? "56px" : "0px",
            }}
          >
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{
              display: state.drawerOpen ? "block" : "none",
            }}
          />
        </ListItemButton>
      </Link>
      <Link href="/user/flashcards">
        <ListItemButton
          sx={{
            justifyContent: state.drawerOpen ? "flex-start" : "center",
            paddingBottom: "15px",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: state.drawerOpen ? "56px" : "0px",
            }}
          >
            <LibraryBooks />
          </ListItemIcon>
          <ListItemText
            primary="Flashcards"
            sx={{
              display: state.drawerOpen ? "block" : "none",
            }}
          />
        </ListItemButton>
      </Link>
      <Link href="/user/plans">
        <ListItemButton
          sx={{
            justifyContent: state.drawerOpen ? "flex-start" : "center",
            paddingBottom: "15px",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: state.drawerOpen ? "56px" : "0px",
            }}
          >
            <CardMembership />
          </ListItemIcon>
          <ListItemText
            primary="Subscription Plans"
            sx={{
              display: state.drawerOpen ? "block" : "none",
            }}
          />
        </ListItemButton>
      </Link>
      <Link href="/user/subscriptions">
        <ListItemButton
          sx={{
            justifyContent: state.drawerOpen ? "flex-start" : "center",
            paddingBottom: "15px",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: state.drawerOpen ? "56px" : "0px",
            }}
          >
            <CardGiftcard />
          </ListItemIcon>
          <ListItemText
            primary="Subscriptions"
            sx={{
              display: state.drawerOpen ? "block" : "none",
            }}
          />
        </ListItemButton>
      </Link>
    </>
  );
};
