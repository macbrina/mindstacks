import CollectionForm from "@/app/_components/Backend/Flashcards/CollectionForm";
import CollectionList from "@/app/_components/Backend/Flashcards/CollectionList";
import Display from "@/app/_components/Backend/Flashcards/Display";
import FlashcardForm from "@/app/_components/Backend/Flashcards/FlashcardForm";
import ClientOnly from "@/app/_components/ClientOnly";
import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const metadata = {
  title: "Create and Customize Flashcards",
  description:
    "Generate personalized flashcards with ease on MindStacks. Enhance your learning experience by creating customized flashcards tailored to your needs.",
};

function Flashcard() {
  return (
    <ClientOnly>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
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
              Create and organize your flashcards into collections to enhance
              your learning experience.
            </Typography>
          </Stack>
          <FlashcardForm />
        </Grid>
        <Display />
        <CollectionForm />
        <CollectionList />
      </Grid>
    </ClientOnly>
  );
}

export default Flashcard;
