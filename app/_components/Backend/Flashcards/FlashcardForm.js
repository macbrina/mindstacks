"use client";

import GenerateForm from "@/app/_components/Backend/Flashcards/GenerateForm";
import { useFlash } from "@/app/_context/FlashContext";
import { validateFormEntries } from "@/app/_util/utilities";
import { useUser } from "@clerk/nextjs";
import { Add } from "@mui/icons-material";
import { Button, Grid, Skeleton } from "@mui/material";
import { useState } from "react";

function FlashcardForm() {
  const [openFlashModal, setOpenFlashModal] = useState(false);
  const [errors, setErrors] = useState({});
  const { user, isLoaded } = useUser();
  const [generating, setGenerating] = useState(false);
  const { state, dispatch } = useFlash();

  const toggleFlashModal = () => setOpenFlashModal(true);
  const handleCloseModal = () => setOpenFlashModal(false);

  const isValidation = () => {
    const errors = validateFormEntries(state.formData);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
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
        {!isLoaded || !user || !state.fbUser ? (
          <Skeleton
            variant="rectangular"
            width="150px"
            height="50px"
            animation="wave"
          />
        ) : (
          <Button
            fullWidth
            type="button"
            variant="outlined"
            onClick={toggleFlashModal}
            startIcon={<Add />}
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
            Add Flashcard
          </Button>
        )}
      </Grid>
      <GenerateForm
        openFlashModal={openFlashModal}
        setOpenFlashModal={setOpenFlashModal}
        errors={errors}
        handleCloseModal={handleCloseModal}
        generating={generating}
        isValidation={isValidation}
        setGenerating={setGenerating}
        user={user}
      />
    </>
  );
}

export default FlashcardForm;
