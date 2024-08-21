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
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/app/_firebase/config";
import {
  generateUniqueId,
  getCardLimitBasedOnPlan,
  getQuantityBasedOnPlan,
  isEmptyObject,
} from "@/app/_util/utilities";
import {
  checkAndAddUserToFirestore,
  getUserData,
} from "@/app/_lib/data-service";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

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
  userExist: false,
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
  const { getToken, userId } = useAuth();
  const { user, isLoaded } = useUser();

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

  useEffect(() => {
    const signInToFirebase = async () => {
      if (userId) {
        const token = await getToken({ template: "integration_firebase" });
        if (token) {
          try {
            await signInWithCustomToken(auth, token);
          } catch (error) {
            toast.error(error.message);
            console.error("Error signing in to Firebase:", error);
          }
        }
      }
    };

    signInToFirebase();
  }, [userId, getToken]);

  useEffect(() => {
    async function addUserToDb() {
      if (user && isLoaded) {
        const userId = user.id;
        const userData = {
          userId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.username,
          fullName: user.fullName,
          role: "user",
          subscriptionId: generateUniqueId(),
          createdAt: new Date(),
        };

        const subscriptionData = {
          userId: user.id,
          status: "active",
          plan: "Basic",
          endsAt: null,
          id: userData.subscriptionId,
          price: "0.00",
          stripeCustomerId: "",
          cardLimit: getCardLimitBasedOnPlan("Basic"),
          quantity: getQuantityBasedOnPlan("Basic"),
        };

        try {
          await checkAndAddUserToFirestore(userId, userData, subscriptionData);
          dispatch({ type: "SET_USEREXIST_LOADING", payload: true });
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    addUserToDb();
  }, [user, isLoaded, dispatch]);

  useEffect(() => {
    async function fetchUser() {
      if (user && isLoaded && isEmptyObject(state.fbUser) && state.userExist) {
        try {
          const newUser = await getUserData(user);
          dispatch({ type: "SET_FBUSER", payload: newUser });
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    fetchUser();
  }, [user, isLoaded, dispatch, state.fbUser, state.userExist]);

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
