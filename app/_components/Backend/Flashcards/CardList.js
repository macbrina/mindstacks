"use client";

import { useFlash } from "@/app/_context/FlashContext";
import { deleteCollection } from "@/app/_lib/data-service";
import {
  generateCardGradient,
  generateCollectionURL,
} from "@/app/_util/utilities";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export default function CardList({ flashcard, onDelete }) {
  const theme = useTheme();
  const [gradient, setGradient] = useState("");
  const [isPending, startTransistion] = useTransition();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const url = generateCollectionURL(flashcard.title, flashcard.id);

  useEffect(() => {
    setGradient(generateCardGradient(theme));
  }, [theme]);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  function handleDeleteConfirm() {
    setShowDeleteConfirmation(false);
    startTransistion(() => onDelete(flashcard.id));
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          // minHeight: "16rem",
          height: "100%",
          p: 2,
          borderRadius: 2,
          boxShadow: 10,
          background: gradient,
          color: "white",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
          }}
          aria-label="Bookmark"
        >
          <Checkbox
            icon={<BookmarkBorderIcon sx={{ color: "black" }} />}
            checkedIcon={<BookmarkIcon sx={{ color: "black" }} />}
            defaultChecked
          />
        </IconButton>
        <CardContent
          sx={{
            display: "flex",
            flexGrow: 1,
            gap: 3,
            alignItems: "center",
          }}
        >
          <Box>
            <Stack direction="row" spacing={2}>
              <Typography
                variant="body2"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "white",
                  color: "#000",
                  p: 1,
                  borderRadius: 1,
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {flashcard.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "white",
                  color:
                    flashcard.difficulty === "easy"
                      ? "green"
                      : flashcard.difficulty === "medium"
                      ? "orange"
                      : "red",
                  p: 1,
                  borderRadius: 1,
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {flashcard.difficulty}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "white",
                  color: "#000",
                  p: 1,
                  borderRadius: 1,
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {flashcard.language}
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mt: 2,
                color: "#fff",
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              <Link
                href={url}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {flashcard.description}
              </Link>
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: "#ccc" }}>
                {format(
                  new Date(
                    flashcard.createdAt.seconds * 1000 +
                      flashcard.createdAt.nanoseconds / 1000000
                  ),
                  "PPpp"
                )}
              </Typography>
              <CheckCircleIcon sx={{ fontSize: 20, color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#ccc" }}
              >
                Sets: {flashcard.quantity}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "flex-start",
            mt: "auto",
            pt: 2,
          }}
        >
          <Link href={url}>
            <Button
              variant="outlined"
              sx={{ color: "black", backgroundColor: "white" }}
            >
              View Details
            </Button>
          </Link>
          <Button
            variant="outlined"
            sx={{ color: "red", backgroundColor: "white" }}
            onClick={handleDeleteClick}
          >
            {!isPending ? "Delete" : <CircularProgress />}
          </Button>
        </CardContent>
      </Card>

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
