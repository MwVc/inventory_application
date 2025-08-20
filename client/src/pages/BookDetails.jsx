import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useBooks } from "../context/BooksContext";

export default function BookDetails() {
  const { id } = useParams();
  const { getById } = useBooks();
  const book = getById(id);

  if (!book) return <Typography>Book not found</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{book.title}</Typography>
        <Box>
          <Button component={RouterLink} to={`/edit/${book.id}`} sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button component={RouterLink} to="/">
            Back
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Author: {book.author}</Typography>
        <Typography variant="subtitle1">Category: {book.category}</Typography>
        <Typography variant="subtitle1">
          Price (KSh): {(book.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">Stock: {book.stock}</Typography>
        <Typography mt={2}>{book.description}</Typography>
      </Box>
    </Box>
  );
}
