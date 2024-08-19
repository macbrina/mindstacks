import { db, storage } from "@/app/_firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getCardLimitBasedOnPlan,
  getQuantityBasedOnPlan,
  isSubscriptionActive,
} from "@/app/_util/utilities";
import { isSameDay, subDays } from "date-fns";

export const checkAndAddUserToFirestore = async (
  userId,
  userData,
  subscriptionData
) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
  } else {
    await setDoc(userDocRef, userData);
    const subscriptionRef = doc(db, "subscriptions", subscriptionData.id);
    await setDoc(subscriptionRef, subscriptionData, { merge: true });
  }
};

export async function addProSubscription(userId, subscriptionData) {
  if (!userId || !subscriptionData) return;

  try {
    const premiumQuery = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("plan", "==", "Premium"),
      where("status", "==", "active")
    );

    const premiumSnapshot = await getDocs(premiumQuery);

    if (!premiumSnapshot.empty) {
      `Active Premium subscription already exists for userId ${userId}. No new subscription created.`;
      throw new Error(
        "You already have an active Premium subscription. Cancel it first."
      );
    }

    const basicQuery = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("plan", "==", "Basic"),
      where("status", "==", "active")
    );

    const basicSnapshot = await getDocs(basicQuery);

    if (!basicSnapshot.empty) {
      basicSnapshot.forEach(async (doc) => {
        const basicSubscriptionRef = doc.ref;
        await setDoc(
          basicSubscriptionRef,
          { status: "canceled" },
          { merge: true }
        );
        `Basic subscription for userId ${userId} has been canceled.`;
      });
    }

    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      { subscriptionId: subscriptionData.id },
      { merge: true }
    );
    const subscriptionRef = doc(db, "subscriptions", subscriptionData.id);
    await setDoc(subscriptionRef, subscriptionData, { merge: true });
  } catch (error) {
    throw error;
  }
}

export const uploadImage = async (image) => {
  if (!image) return null;

  try {
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    throw error;
  }
};

export const fetchUserCollections = async (user, updateCollectionsList) => {
  try {
    const q = query(
      collection(db, "flashcardCollections"),
      where("userId", "==", user.id)
    );
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    updateCollectionsList(items);
  } catch (error) {
    throw error;
  }
};

export const fetchUserSubscriptions = async (user, updateSubscriptionList) => {
  try {
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", user.id)
    );
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    updateSubscriptionList(items);
  } catch (error) {
    throw error;
  }
};

export const getFlashcardsInCollection = async (collectionId, userId) => {
  try {
    const docRef = doc(db, "flashcardCollections", collectionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return [];
    }

    const data = docSnap.data();

    if (data.userId !== userId) {
      return [];
    }

    return data.flashcards || [];
  } catch (error) {
    throw error;
  }
};

export const updateFlashcardScore = async (
  user,
  collectionId,
  cardId,
  isCorrect
) => {
  try {
    const docRef = doc(db, "flashcardCollections", collectionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return;
    }

    const data = docSnap.data();

    if (data.userId !== user.id) {
      return;
    }

    if (!data.flashcards) {
      return;
    }

    const updatedFlashcards = data.flashcards.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          correctCount: isCorrect ? card.correctCount + 1 : card.correctCount,
          incorrectCount: !isCorrect
            ? card.incorrectCount + 1
            : card.incorrectCount,
        };
      }
      return card;
    });

    const batch = writeBatch(db);
    batch.update(docRef, { flashcards: updatedFlashcards });
    await batch.commit();

    return updatedFlashcards;
  } catch (error) {
    throw error;
  }
};

export const fetchUserRecentCollections = async (user) => {
  try {
    const q = query(
      collection(db, "flashcardCollections"),
      where("userId", "==", user.id),
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (user) => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", user.id));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      throw new Error("No user found with the given ID");
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.subscriptionId) {
      const subscriptionRef = doc(db, "subscriptions", userData.subscriptionId);
      const subscriptionSnapshot = await getDoc(subscriptionRef);

      if (subscriptionSnapshot.exists()) {
        const subscriptionData = subscriptionSnapshot.data();
        return {
          ...userData,
          subscription: subscriptionData,
        };
      } else {
        return { ...userData, subscription: "No subscription found" };
      }
    } else {
      return userData;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserDashboardData = async (user, updateCollectionsList) => {
  if (!user) throw new Error("User not authenticated");

  try {
    const flashcardCollectionsRef = collection(db, "flashcardCollections");
    const q = query(flashcardCollectionsRef, where("userId", "==", user.id));
    const querySnapshot = await getDocs(q);

    let totalCollectionSets = 0;
    let totalFlashcardSets = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalCollectionSets += 1;

      totalFlashcardSets += data.flashcards.length || 0;
    });

    await fetchUserCollections(user, updateCollectionsList);

    return {
      collectionSets: totalCollectionSets,
      flashcardSets: totalFlashcardSets,
    };
  } catch (error) {
    throw error;
  }
};

export const addUserActivity = async (userId, activityDate = new Date()) => {
  try {
    const streakCollection = collection(db, "userStreaks");

    const dateQuery = query(
      streakCollection,
      where("userId", "==", userId),
      where("date", "==", activityDate)
    );

    const dateQuerySnapshot = await getDocs(dateQuery);

    if (!dateQuerySnapshot.empty) {
      return;
    }

    await addDoc(streakCollection, {
      userId,
      date: activityDate,
    });
  } catch (error) {
    throw error;
  }
};

export const calculateStreak = async (userId) => {
  const streakCollection = collection(db, "userStreaks");
  const today = new Date();

  const streakQuery = query(streakCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(streakQuery);

  if (querySnapshot.empty) {
    return 0;
  }

  const activityDates = querySnapshot.docs.map((doc) =>
    doc.data().date.toDate()
  );

  activityDates.sort((a, b) => b - a);

  let streakCount = 0;

  for (let i = 0; i < activityDates.length; i++) {
    const currentDate = subDays(today, streakCount);

    if (isSameDay(activityDates[i], currentDate)) {
      streakCount++;
    } else if (activityDates[i] < currentDate) {
      break;
    }
  }

  return streakCount;
};

export const addFlashCollectionWithBatch = async (
  user,
  collectionData,
  flashcards
) => {
  const batch = writeBatch(db);

  try {
    const collectionRef = await addDoc(collection(db, "flashcardCollections"), {
      ...collectionData,
      userId: user.id,
      flashcards: flashcards,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // const collectionId = collectionRef.id;

    // flashcards.forEach((flashcard) => {
    //   const flashcardRef = doc(collection(db, "flashcards"));
    //   batch.set(flashcardRef, {
    //     ...flashcard,
    //     collectionId: collectionId,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });
    // });

    await batch.commit();

    return collectionRef.id;
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async (
  collectionId,
  user,
  updateCollectionsList
) => {
  if (!collectionId) return;

  try {
    const docRef = doc(collection(db, "flashcardCollections"), collectionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.userId !== user.id) {
        return;
      }
      await deleteDoc(docRef);
    } else {
      throw new Error("Collection does not exist");
    }

    await fetchUserCollections(user, updateCollectionsList);
  } catch (error) {
    throw error;
  }
};

export const checkUserSubscription = async (userId) => {
  try {
    const user = await db.users.findUnique({
      where: { id: userId },
    });

    if (user && isSubscriptionActive(user.subscription.endsAt)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const getSubscriptionByUserId = async (userId) => {
  try {
    const basicQuery = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("plan", "==", "Basic"),
      where("status", "==", "canceled")
    );

    const basicSnapshot = await getDocs(basicQuery);

    if (!basicSnapshot.empty) {
      const doc = basicSnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const updateSubscription = async (userId, subscriptionId, updates) => {
  const subscriptionRef = doc(db, "subscriptions", subscriptionId);

  try {
    await updateDoc(subscriptionRef, updates);

    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { subscriptionId: subscriptionId }, { merge: true });
  } catch (error) {
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId, statusType) => {
  const subscriptionRef = doc(db, "subscriptions", subscriptionId);

  try {
    await updateDoc(subscriptionRef, { status: statusType });
  } catch (error) {
    throw error;
  }
};

export const getActivePremiumSubscription = async (userId) => {
  try {
    const premiumQuery = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("plan", "==", "Premium"),
      where("status", "==", "active")
    );

    const premiumSnapshot = await getDocs(premiumQuery);

    if (!premiumSnapshot.empty) {
      const doc = premiumSnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const resetUserToBasic = async (userId) => {
  try {
    const subscriptionQuery = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("plan", "==", "Basic"),
      where("status", "==", "canceled")
    );

    const subscriptionSnapshot = await getDocs(subscriptionQuery);

    if (!subscriptionSnapshot.empty) {
      const subscriptionDoc = subscriptionSnapshot.docs[0];
      await updateDoc(subscriptionDoc.ref, {
        status: "active",
        plan: "Basic",
        endsAt: null,
        price: "0.00",
        cardLimit: getCardLimitBasedOnPlan("Basic"),
        quantity: getQuantityBasedOnPlan("Basic"),
      });

      const userRef = doc(db, "users", userId);
      await setDoc(
        userRef,
        { subscriptionId: subscriptionDoc.id },
        { merge: true }
      );

      return { id: subscriptionDoc.id, ...subscriptionDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const hasActiveOrCanceledPremiumSubscription = async (userId) => {
  try {
    const subscriptionQuery = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("plan", "==", "Premium"),
      where("status", "in", ["active", "canceled"]),
      orderBy("endsAt", "desc")
    );

    const subscriptionSnapshot = await getDocs(subscriptionQuery);

    if (!subscriptionSnapshot.empty) {
      for (const subscriptionDoc of subscriptionSnapshot.docs) {
        const { endsAt, status } = subscriptionDoc.data();
        const endsAtDate = endsAt.toDate();

        if (status === "canceled" && endsAtDate > new Date()) {
          return true;
        }

        if (status === "active") {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    throw error;
  }
};
