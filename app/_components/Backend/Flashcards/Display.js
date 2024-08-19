"use client";

import { useFlash } from "@/app/_context/FlashContext";
import FlashcardDisplay from "@/app/_components/Backend/Flashcards/FlashcardDisplay";
import CardSkeleton from "@/app/_components/Backend/Flashcards/CardSkeleton";

function Display() {
  const { state } = useFlash();
  return (
    <>
      {state.generatingFlashcards && (
        <CardSkeleton count={state.formData.quantity} />
      )}
      {state.flashcardsList.length > 0 && <FlashcardDisplay />}
    </>
  );
}

export default Display;
