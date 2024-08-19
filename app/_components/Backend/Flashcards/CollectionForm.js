"use client";

import { useFlash } from "@/app/_context/FlashContext";
import {
  addFlashCollectionWithBatch,
  fetchUserCollections,
} from "@/app/_lib/data-service";
import { generateUniqueId, validateFormEntries } from "@/app/_util/utilities";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { addDays } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";

function CollectionForm() {
  const [errors, setErrors] = useState({});
  const { user } = useUser();
  const { state, dispatch, updateFormData, updateCollectionsList } = useFlash();
  const [creating, setCreating] = useState(false);

  const isValidation = () => {
    const errors = validateFormEntries(state.formData);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  async function addNewFlashCard() {
    if (!isValidation()) {
      return;
    }

    setCreating(true);

    try {
      const reviewInterval = 1;

      const newData = state.flashcardsList.map((card) => {
        const lastReviewed = new Date();
        const nextReviewDate = addDays(lastReviewed, reviewInterval);

        return {
          id: generateUniqueId(),
          question: card.front,
          answer: card.back,
          lastReviewed,
          correctCount: 0,
          incorrectCount: 0,
          nextReviewDate,
        };
      });

      const collectionId = await addFlashCollectionWithBatch(
        user,
        state.formData,
        newData
      );

      await fetchUserCollections(user, updateCollectionsList);

      toast.success("Collections successfully saved");
      dispatch({ type: "SET_COLLECTION_TOGGLE", payload: false });
      dispatch({ type: "SET_FLASHCARD_LIST", payload: [] });

      updateFormData({
        title: "",
        description: "",
        difficulty: "easy",
        language: "english",
        quantity: "",
        flashcards: [],
      });
    } catch (error) {
      toast(error.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <Dialog
      open={state.openCollectionModal}
      onClose={() =>
        dispatch({ type: "SET_COLLECTION_TOGGLE", payload: false })
      }
    >
      <DialogTitle>Save Collection Sets</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <TextField
              label="Collection Name"
              variant="outlined"
              required
              fullWidth
              name="title"
              value={state.formData.title}
              onChange={handleChange}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() =>
            dispatch({ type: "SET_COLLECTION_TOGGLE", payload: false })
          }
          disabled={creating}
        >
          Cancel
        </Button>
        <Button
          onClick={addNewFlashCard}
          variant="contained"
          color="primary"
          disabled={creating}
          sx={{
            "&.Mui-disabled": {
              color: "#fff",
              backgroundImage: "linear-gradient(to bottom, #646669, #B5B8BB)",
            },
          }}
        >
          {creating ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CollectionForm;
