export function flashReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME_MODE":
      return {
        ...state,
        themeMode: state.themeMode === "dark" ? "light" : "dark",
      };
    case "TOGGLE_DRAWER_MODE":
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case "SET_COLLECTIONS_LIST":
      return {
        ...state,
        collectionList: action.payload,
      };
    case "SET_SUBSCRIPTION_LIST":
      return {
        ...state,
        subscriptionList: action.payload,
      };
    case "SET_SUBSCRIPTION_LOADING":
      return {
        ...state,
        subscriptionLoading: action.payload,
      };
    case "SET_FLASHCARD_LOADING":
      return {
        ...state,
        flashCardLoading: action.payload,
      };
    case "SET_COLLECTION_LOADING":
      return {
        ...state,
        collectionsLoading: action.payload,
      };
    case "SET_GENERATION_LOADING":
      return {
        ...state,
        generatingFlashcards: action.payload,
      };
    case "SET_USEREXIST_LOADING":
      return {
        ...state,
        userExist: action.payload,
      };
    case "SET_COLLECTION_TOGGLE":
      return {
        ...state,
        openCollectionModal: action.payload,
      };
    case "SET_FLASHCARD_LIST":
      return {
        ...state,
        flashcardsList: action.payload,
      };
    case "SET_FBUSER":
      return {
        ...state,
        fbUser: action.payload,
      };
    case "SET_PATHNAME":
      return {
        ...state,
        pathname: action.payload,
      };
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
