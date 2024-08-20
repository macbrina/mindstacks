"use client";

import DashboardSkeleton from "@/app/_components/Backend/Dashboard/DashboardSkeleton";
import MainDashboard from "@/app/_components/Backend/Dashboard/MainDashboard";
import { useFlash } from "@/app/_context/FlashContext";
import { auth } from "@/app/_firebase/config";
import {
  calculateStreak,
  checkAndAddUserToFirestore,
  fetchUserRecentCollections,
  getUserDashboardData,
} from "@/app/_lib/data-service";
import {
  generateUniqueId,
  getCardLimitBasedOnPlan,
  getQuantityBasedOnPlan,
} from "@/app/_util/utilities";
import { useAuth, useUser } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { dispatch } = useFlash();
  const [collectionSets, setCollectionSets] = useState(0);
  const [flashcardSets, setFlashcardSets] = useState(0);
  const [streak, setStreak] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const [recentSets, setRecentSets] = useState([]);

  const [analytics, setAnalytics] = useState({
    totalCorrect: 0,
    totalIncorrect: 0,
    averageScore: 0,
  });
  // const [upcomingReviews, setUpcomingReviews] = useState([]);
  const { state, updateCollectionsList } = useFlash();

  useEffect(() => {
    if (user) {
      setDataLoading(true);

      const fetchUserDashboardData = async () => {
        try {
          const userDashboardData = await getUserDashboardData(
            user,
            updateCollectionsList
          );
          setCollectionSets(userDashboardData.collectionSets);
          setFlashcardSets(userDashboardData.flashcardSets);

          const streakCount = await calculateStreak(user.id);
          setStreak(streakCount);

          const recentCollections = await fetchUserRecentCollections(user);
          setRecentSets(recentCollections);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setDataLoading(false);
        }
      };

      fetchUserDashboardData();
    }
  }, [user, updateCollectionsList, recentSets.length]);

  useEffect(() => {
    const calculateAnalytics = () => {
      let totalCorrect = 0;
      let totalIncorrect = 0;
      let totalScore = 0;
      let totalFlashcards = 0;

      state.collectionList.forEach((set) => {
        set.flashcards.forEach((flashcard) => {
          totalCorrect += flashcard.correctCount;
          totalIncorrect += flashcard.incorrectCount;
          totalScore += flashcard.correctCount - flashcard.incorrectCount;
        });
        totalFlashcards += parseInt(set.quantity, 10);
      });

      const averageScore =
        totalFlashcards > 0 ? totalScore / totalFlashcards : 0;

      setAnalytics({
        totalCorrect,
        totalIncorrect,
        averageScore,
      });
    };
    if (state.collectionList.length > 0) {
      calculateAnalytics();
    }
  }, [state.collectionList, recentSets.length]);

  if (!isLoaded || !isSignedIn || dataLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <MainDashboard
      user={user}
      collectionSets={collectionSets}
      flashcardSets={flashcardSets}
      streak={streak}
      recentSets={recentSets}
      analytics={analytics}
      updateCollectionsList={updateCollectionsList}
      setRecentSets={setRecentSets}
      setAnalytics={setAnalytics}
    />
  );
};

export default Dashboard;
