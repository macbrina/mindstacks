"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { generateCardGradient } from "@/app/_util/utilities";
import { Box } from "@mui/system";
import { useFlash } from "@/app/_context/FlashContext";

const Flashcard = ({ front, back, onEdit, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const theme = useTheme();
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(generateCardGradient(theme));
  }, [theme]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "16rem",
        cursor: "pointer",
        transform: flipped ? "rotateY(180deg)" : "none",
        transition: "transform 0.6s",
        background: flipped ? theme.palette.background.paper : gradient,
        color: flipped ? theme.palette.text.primary : "#fff",
        boxShadow: flipped ? 3 : 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: "1000px",
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <CardContent
        sx={{
          position: "relative",
          transformStyle: "preserve-3d",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: flipped ? theme.palette.text.primary : "#fff",
            transform: flipped ? "rotateY(180deg)" : "none",
            pb: 1,
          }}
        >
          {flipped ? back : front}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          sx={{
            color: flipped ? theme.palette.text.primary : "#fff",
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            color: flipped ? theme.palette.text.primary : "#fff",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

const FlashcardPreview = ({ flashcards, onEditCard, onDeleteCard }) => {
  return (
    <Grid container spacing={2}>
      {flashcards.map((card, index) => (
        <Grid item key={index} xs={12} md={4}>
          <Flashcard
            front={card.front}
            back={card.back}
            onEdit={() => onEditCard(index)}
            onDelete={() => onDeleteCard(index)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const FlashcardDisplay = () => {
  const { state, dispatch, updateFormData } = useFlash();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [editData, setEditData] = useState({ front: "", back: "" });
  const dropdownRef = useRef();

  const memoizedFlashCardListLength = useMemo(
    () => state.flashcardsList.length,
    [state.flashcardsList]
  );

  const handleOpenEditDialog = (index) => {
    setCurrentIndex(index);
    setEditData(state.flashcardsList[index]);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditCard = () => {
    if (currentIndex !== null) {
      const updatedCards = [...state.flashcardsList];
      updatedCards[currentIndex] = editData;
      dispatch({
        type: "SET_FLASHCARD_LIST",
        payload: updatedCards,
      });
      handleCloseEditDialog();
    }
  };

  const handleOpenDeleteDialog = (index) => {
    setCurrentIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteCard = () => {
    if (currentIndex !== null) {
      dispatch({
        type: "SET_FLASHCARD_LIST",
        payload: state.flashcardsList.filter((_, i) => i !== currentIndex),
      });
      updateFormData({ ["quantity"]: +state.formData.quantity - 1 });
      handleCloseDeleteDialog();
    }
  };

  useEffect(() => {
    const dropdownElement = dropdownRef.current;
    if (memoizedFlashCardListLength > 0) {
      dropdownElement.style.maxHeight = `${
        dropdownElement.scrollHeight + 20
      }px`;
    } else {
      dropdownElement.style.maxHeight = "0px";
    }
  }, [memoizedFlashCardListLength]);

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: 10 }} ref={dropdownRef}>
        <Typography variant="h5" gutterBottom>
          Preview Your Flashcards
        </Typography>
        <FlashcardPreview
          flashcards={state.flashcardsList}
          onEditCard={handleOpenEditDialog}
          onDeleteCard={handleOpenDeleteDialog}
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              dispatch({ type: "SET_COLLECTION_TOGGLE", payload: true })
            }
            sx={{
              mt: 4,
            }}
          >
            Save Flashcards
          </Button>
        </Box>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Flashcard</DialogTitle>
        <DialogContent>
          <TextField
            label="Front"
            variant="outlined"
            required
            fullWidth
            name="front"
            value={editData.front}
            onChange={(e) =>
              setEditData({ ...editData, front: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Back"
            variant="outlined"
            required
            fullWidth
            name="back"
            value={editData.back}
            onChange={(e) => setEditData({ ...editData, back: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleEditCard} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this flashcard?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDeleteCard} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlashcardDisplay;
