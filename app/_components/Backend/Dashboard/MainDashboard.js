"use client";

import RecentFlashcards from "@/app/_components/Backend/Dashboard/RecentFlashcards";
import { useFlash } from "@/app/_context/FlashContext";
import {
  deleteCollection,
  fetchUserRecentCollections,
} from "@/app/_lib/data-service";
import { BarChart, PieChart } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useOptimistic } from "react";
import { toast } from "react-toastify";

const MainDashboard = ({
  user,
  flashcardSets,
  collectionSets,
  streak,
  recentSets,
  analytics,
  updateCollectionsList,
  setRecentSets,
  setAnalytics,
}) => {
  const [optimisticCollections, optimisticDelete] = useOptimistic(
    recentSets,
    (curCollections, collectionId) =>
      curCollections.filter((collection) => collection.id !== collectionId)
  );

  const handleDelete = async (collectionId) => {
    try {
      optimisticDelete(collectionId);

      await deleteCollection(collectionId, user, updateCollectionsList);
      toast.success("Collection deleted successfully.");
      const updatedRecentCollections = await fetchUserRecentCollections(user);
      setRecentSets(updatedRecentCollections);
      if (updateCollectionsList.length == 0) {
        setAnalytics({
          totalCorrect: 0,
          totalIncorrect: 0,
          averageScore: 0,
        });
      }
    } catch (error) {
      toast.error("Error deleting collection:", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome back, {user.username}!
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5">Total Flashcard Sets</Typography>
                <Typography variant="h6">{collectionSets}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5">Total Flashcards</Typography>
                <Typography variant="h6">{flashcardSets}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5">Current Streak</Typography>
                <Typography variant="h6">{streak} Days</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Recent Flashcard Sets
        </Typography>
        <Grid container spacing={2}>
          {optimisticCollections.length == 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
                No collections found. Start by creating some.
              </Typography>
            </Grid>
          ) : (
            optimisticCollections.map((flashcard, index) => (
              <RecentFlashcards
                key={index}
                flashcard={flashcard}
                onDelete={handleDelete}
              />
            ))
          )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Progress and Analytics
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5">Total Correct</Typography>
                <Typography variant="h6">{analytics.totalCorrect}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5">Total Incorrect</Typography>
                <Typography variant="h6">{analytics.totalIncorrect}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5">Average Score</Typography>
                <Typography variant="h6">
                  {analytics.averageScore.toFixed(2)}{" "}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainDashboard;
