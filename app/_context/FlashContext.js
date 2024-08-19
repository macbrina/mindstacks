"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { flashReducer } from "@/app/_context/reducer";
import { usePathname } from "next/navigation";

const FlashContext = createContext();

const initialState = {
  themeMode:
    typeof window !== "undefined"
      ? localStorage.getItem("themeMode") || "dark"
      : "light",
  drawerOpen: false,
  pathname: "",
  fbUser: {},
  collectionList: [],
  openCollectionModal: false,
  generatingFlashcards: false,
  flashCardLoading: false,
  collectionsLoading: false,
  newUserCreating: true,
  subscriptionLoading: false,
  flashcardsList: [],
  subscriptionList: [],
  formData: {
    title: "",
    description: "",
    difficulty: "easy",
    language: "english",
    quantity: "",
    flashcards: [],
  },
};

function FlashProvider({ children }) {
  const [state, dispatch] = useReducer(flashReducer, initialState);
  const pathname = usePathname();

  const toggleThemeMode = () => {
    const newThemeMode = state.themeMode === "dark" ? "light" : "dark";

    dispatch({ type: "TOGGLE_THEME_MODE" });
    localStorage.setItem("themeMode", newThemeMode);
  };

  const toggleDrawer = () => {
    dispatch({ type: "TOGGLE_DRAWER_MODE" });
  };

  const updateCollectionsList = useCallback(
    (items) => {
      dispatch({ type: "SET_COLLECTIONS_LIST", payload: items });
    },
    [dispatch]
  );

  const updateSubscriptionList = useCallback(
    (items) => {
      dispatch({ type: "SET_SUBSCRIPTION_LIST", payload: items });
    },
    [dispatch]
  );

  const updateFlashcardList = useCallback(
    (items) => {
      dispatch({ type: "SET_FLASHCARDS_LIST", payload: items });
    },
    [dispatch]
  );

  const updateFormData = useCallback(
    (data) => {
      dispatch({ type: "UPDATE_FORM_DATA", payload: data });
    },
    [dispatch]
  );

  useEffect(() => {
    const handlePathnameChange = () => {
      const pathSegment = pathname.split("/")[2];
      dispatch({ type: "SET_PATHNAME", payload: pathSegment });
    };

    handlePathnameChange();

    return () => {
      window.removeEventListener("popstate", handlePathnameChange);
    };
  }, [pathname, dispatch]);

  useEffect(() => {
    document.body.classList.toggle("dark", state.themeMode === "dark");

    return () => {
      document.body.classList.remove("dark", "light");
    };
  }, [state.themeMode]);

  return (
    <FlashContext.Provider
      value={{
        state,
        dispatch,
        toggleThemeMode,
        toggleDrawer,
        updateCollectionsList,
        updateFlashcardList,
        updateFormData,
        updateSubscriptionList,
      }}
    >
      {children}
    </FlashContext.Provider>
  );
}

function useFlash() {
  const context = useContext(FlashContext);

  if (!context) {
    throw new Error("useFlash must be used within an FlashProvider");
  }

  return context;
}

export { FlashProvider, useFlash };
