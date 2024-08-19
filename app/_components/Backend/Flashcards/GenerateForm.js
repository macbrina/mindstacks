"use client";

import { useFlash } from "@/app/_context/FlashContext";
import { hasActiveOrCanceledPremiumSubscription } from "@/app/_lib/data-service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function GenerateForm({
  openFlashModal,
  setOpenFlashModal,
  errors,
  handleCloseModal,
  isValidation,
}) {
  const { dispatch, updateFormData, state } = useFlash();
  const [isPremiumOrCanceled, setIsPremiumOrCanceled] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (state.fbUser && state.fbUser.userId) {
        const status = await hasActiveOrCanceledPremiumSubscription(
          state.fbUser.userId
        );
        setIsPremiumOrCanceled(status);
      }
    };

    checkSubscription();
  }, [state.fbUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = async () => {
    if (!isValidation()) {
      return;
    }

    if (state.fbUser.subscription.cardLimit != -1 || !isPremiumOrCanceled) {
      if (state.collectionList.length >= state.fbUser.subscription.cardLimit) {
        toast.error("You have reached your card limit.");
        return;
      }
    }

    if (
      (state.fbUser && state.fbUser.subscription.plan === "Premium") ||
      isPremiumOrCanceled
    ) {
      if (state.formData.quantity > 10) {
        toast.error("Premium plan allows a maximum of 10 flashcards.");
        return;
      }
    }

    if (
      state.fbUser &&
      state.fbUser.subscription.plan === "Basic" &&
      !isPremiumOrCanceled
    ) {
      if (state.formData.quantity > 3) {
        toast.error("Basic plan allows a maximum of 3 flashcards.");
        return;
      }
      if (state.formData.language !== "english") {
        toast.error("Basic plan allows only English language.");
        return;
      }
      if (state.formData.difficulty !== "easy") {
        toast.error("Basic plan allows only easy difficulty.");
        return;
      }
    }

    dispatch({ type: "SET_GENERATION_LOADING", payload: true });
    handleCloseModal();
    try {
      const response = await fetch(`/api/generate-cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: state.formData.title,
          difficulty: state.formData.difficulty,
          language: state.formData.language,
          quantity: state.formData.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.content || !data.content.flashcards) {
        throw new Error("Flashcards data is undefined or missing.");
      }

      dispatch({
        type: "SET_FLASHCARD_LIST",
        payload: data.content.flashcards,
      });
    } catch (error) {
      "error: ", error;
      toast.error(error.message);
    } finally {
      dispatch({ type: "SET_GENERATION_LOADING", payload: false });
    }
  };
  return (
    <Dialog open={openFlashModal} onClose={() => setOpenFlashModal(false)}>
      <DialogTitle>Add New Flashcard</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              required
              fullWidth
              name="title"
              value={state.formData.title}
              onChange={handleChange}
            />
            {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description (Optional)"
              variant="outlined"
              name="description"
              type="text"
              fullWidth
              multiline
              value={state.formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              variant="outlined"
              name="quantity"
              type="number"
              fullWidth
              value={state.formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <div style={{ color: "red" }}>{errors.quantity}</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={state.formData.difficulty}
                required
                onChange={handleChange}
                label="Difficulty"
                name="difficulty"
                sx={{
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
            {errors.difficulty && (
              <div style={{ color: "red" }}>{errors.difficulty}</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={state.formData.language}
                required
                onChange={handleChange}
                label="Language"
                name="language"
                sx={{
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="italian">Italian</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="turkish">Turkish</MenuItem>
              </Select>
            </FormControl>
            {errors.language && (
              <div style={{ color: "red" }}>{errors.language}</div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleCloseModal}
          disabled={state.generatingFlashcards}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={state.generatingFlashcards}
          sx={{
            "&.Mui-disabled": {
              color: "#fff",
              backgroundImage: "linear-gradient(to bottom, #646669, #B5B8BB)",
            },
          }}
        >
          {state.generatingFlashcards ? "Generating..." : "Generate"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GenerateForm;
