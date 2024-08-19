"use client";

import CardList from "@/app/_components/Backend/Flashcards/CardList";
import CardSkeleton from "@/app/_components/Backend/Flashcards/CardSkeleton";
import { useFlash } from "@/app/_context/FlashContext";
import {
  deleteCollection,
  fetchUserCollections,
} from "@/app/_lib/data-service";
import { useUser } from "@clerk/nextjs";
import { Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useOptimistic } from "react";
import { toast } from "react-toastify";

function CollectionList() {
  const { state, updateCollectionsList, dispatch } = useFlash();
  const { user, isLoaded } = useUser();
  const memoizedFlashcardListLength = useMemo(
    () => state.flashcardsList.length,
    [state.flashcardsList]
  );

  const [optimisticCollections, optimisticDelete] = useOptimistic(
    state.collectionList,
    (curCollections, collectionId) =>
      curCollections.filter((collection) => collection.id !== collectionId)
  );

  const handleDelete = async (collectionId) => {
    try {
      optimisticDelete(collectionId);
      await deleteCollection(collectionId, user, updateCollectionsList);
      toast.success("Collection deleted successfully.");
    } catch (error) {
      error;
      toast.error("Error deleting collection:", error);
    }
  };

  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }

    if (memoizedFlashcardListLength > 0) {
      return;
    }

    const fetchFlashcards = async () => {
      dispatch({ type: "SET_COLLECTION_LOADING", payload: true });

      try {
        await fetchUserCollections(user, updateCollectionsList);
      } catch (error) {
        toast.error("Error fetching flashcards:", error);
      } finally {
        dispatch({ type: "SET_COLLECTION_LOADING", payload: false });
      }
    };

    fetchFlashcards();
  }, [
    user,
    dispatch,
    memoizedFlashcardListLength,
    isLoaded,
    updateCollectionsList,
  ]);

  if (!isLoaded || state.collectionsLoading) return <CardSkeleton />;

  return (
    <Grid container spacing={2} sx={{ marginTop: 5 }}>
      {state.collectionList.length == 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
            No collections found. Start by creating some.
          </Typography>
        </Grid>
      ) : (
        optimisticCollections.map((flashcard, index) => (
          <Grid item xs={12} md={4} key={index}>
            <CardList flashcard={flashcard} onDelete={handleDelete} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default CollectionList;
