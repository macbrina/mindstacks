"use client";

import {
  generateCardGradient,
  generateCollectionURL,
} from "@/app/_util/utilities";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

function RecentFlashcards({ flashcard, onDelete }) {
  const theme = useTheme();
  const [gradient, setGradient] = useState("");
  const [isPending, startTransistion] = useTransition();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const url = generateCollectionURL(flashcard.title, flashcard.id);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  function handleDeleteConfirm() {
    setShowDeleteConfirmation(false);
    startTransistion(() => onDelete(flashcard.id));
  }

  useEffect(() => {
    setGradient(generateCardGradient(theme));
  }, [theme]);
  return (
    <>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, background: gradient }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {flashcard.title}
          </Typography>
          <Typography sx={{ color: "#fff" }}>
            {flashcard.quantity} Flashcards
          </Typography>
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{ mt: 1, mb: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href={url}>
              <Button variant="contained">Study Now</Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
            >
              {!isPending ? "Delete" : <CircularProgress />}
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {flashcard?.title}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteConfirmation(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecentFlashcards;
