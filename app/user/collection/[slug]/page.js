"use client";

import FlipCardStack from "@/app/_components/Backend/Flashcards/FlipCardStack";
import { useFlash } from "@/app/_context/FlashContext";
import { getFlashcardsInCollection } from "@/app/_lib/data-service";
import { useUser } from "@clerk/nextjs";
import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Page({ params }) {
  const { user, isLoaded } = useUser();
  const { updateCollectionList } = useFlash();
  const { slug } = params;
  const collectionId = slug.split("-")[1];
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user || !collectionId) {
      return;
    }
    async function fetchFlashcards() {
      try {
        const flashcardsData = await getFlashcardsInCollection(
          collectionId,
          user.id
        );
        setFlashcards(flashcardsData);
      } catch (error) {
        toast.error("Failed to fetch flashcards:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, [slug, collectionId, user, isLoaded]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (flashcards.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">
          No flashcards found in this collection.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            style={{ maxWidth: "100%", flexGrow: "1" }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                sm: "flex-start",
                md: "center",
                lg: "center",
              },
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
              },
            }}
          >
            <Stack direction="column" spacing={1} flexGrow="1">
              <Typography variant="h5">Flashcards</Typography>
              <Typography variant="body1">
                Test your knowledge by flipping the cards and answering the
                questions. Track your progress as you improve
              </Typography>
            </Stack>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "flex-start",
                  sm: "flex-start",
                  md: "flex-end",
                  lg: "flex-end",
                },
                alignItems: "center",
              }}
            >
              <Link href="/user/flashcards">
                <Button
                  fullWidth
                  type="button"
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  sx={{
                    mt: 3,
                    mb: 2,
                    p: 3,
                    width: {
                      xs: "100%",
                      sm: "200px",
                      md: "200px",
                      lg: "200px",
                    },
                  }}
                >
                  Back to Collections
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5">Total Correct</Typography>
              <Typography variant="h6">
                {flashcards.reduce(
                  (total, card) => total + card.correctCount,
                  0
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5">Total Incorrect</Typography>
              <Typography variant="h6">
                {flashcards.reduce(
                  (total, card) => total + card.incorrectCount,
                  0
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5">Average Score</Typography>
              {flashcards.length > 0
                ? (
                    flashcards.reduce(
                      (total, card) => total + card.correctCount,
                      0
                    ) / flashcards.length
                  ).toFixed(2)
                : 0}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <FlipCardStack
        flashcards={flashcards}
        updateCollectionList={updateCollectionList}
        user={user}
        collectionId={collectionId}
        setFlashcards={setFlashcards}
      />
    </Box>
  );
}

export default Page;
