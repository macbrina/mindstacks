"use client";

import { useFlash } from "@/app/_context/FlashContext";
import { updateFlashcardScore } from "@/app/_lib/data-service";
import { generateCardGradient } from "@/app/_util/utilities";
import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Flashcard = ({ front, back, onAnswered }) => {
  const [flipped, setFlipped] = useState(false);
  const theme = useTheme();
  const [gradient, setGradient] = useState("");
  const [buttonState, setButtonState] = useState({
    disabled: false,
    clicked: null,
  });

  const handleButtonClick = (event, isCorrect) => {
    event.stopPropagation();
    setButtonState({ disabled: true, clicked: isCorrect });
    onAnswered(isCorrect);
  };

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
        {flipped ? (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                textAlign: "center",
                transform: flipped ? "rotateY(180deg)" : "none",
              }}
            >
              Did you get it correct?
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ transform: flipped ? "rotateY(180deg)" : "none" }}
            >
              <Button
                variant="contained"
                onClick={(e) => handleButtonClick(e, true)}
                disabled={buttonState.disabled}
                sx={{
                  background:
                    buttonState.clicked === true ? "green" : undefined,
                  color: "#fff",
                  "&:disabled": {
                    background:
                      buttonState.clicked === true
                        ? "green"
                        : theme.palette.grey[400],
                    color:
                      buttonState.clicked === true
                        ? "white"
                        : "rgba(0, 0, 0, 0.26)",
                    outline:
                      buttonState.clicked === true
                        ? "1px solid green"
                        : theme.palette.grey[400],
                  },
                }}
              >
                Correct
              </Button>
              <Button
                variant="contained"
                onClick={(e) => handleButtonClick(e, false)}
                disabled={buttonState.disabled}
                sx={{
                  background:
                    buttonState.clicked === false
                      ? theme.palette.error.main
                      : undefined,
                  "&:disabled": {
                    background:
                      buttonState.clicked === false
                        ? theme.palette.error.main
                        : theme.palette.grey[400],
                    outline:
                      buttonState.clicked === false
                        ? theme.palette.error.main
                        : theme.palette.grey[400],
                    color:
                      buttonState.clicked === false
                        ? "white"
                        : "rgba(0, 0, 0, 0.26)",
                  },
                }}
              >
                Incorrect
              </Button>
            </Stack>
          </Box>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

const FlipCardStack = ({ flashcards, user, collectionId, setFlashcards }) => {
  const [open, setOpen] = useState(false);
  const [answeredCards, setAnsweredCards] = useState(new Set());
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    router.push("/user/flashcards");
  };

  const handleAnswered = async (cardIndex, cardId, isCorrect) => {
    setAnsweredCards((prev) => {
      const updated = new Set(prev);
      updated.add(cardIndex);
      return updated;
    });
    try {
      const updatedFlashcards = await updateFlashcardScore(
        user,
        collectionId,
        cardId,
        isCorrect
      );
      setFlashcards(updatedFlashcards);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (answeredCards.size === flashcards.length) {
      setOpen(true);
    }
  }, [answeredCards, flashcards.length]);

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: 10 }}>
        <Grid container spacing={2}>
          {flashcards.map((card, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Flashcard
                front={card.question}
                back={card.answer}
                onAnswered={(isCorrect) => {
                  handleAnswered(index, card.id, isCorrect);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>All Cards Completed</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have completed all flashcards.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Go Back to Collections
          </Button>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlipCardStack;
