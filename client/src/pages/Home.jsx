import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useBooks } from "../context/BooksContext";
import BookTable from "../components/BookTable";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  const { list, remove } = useBooks();
  const books = list();

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Books</Typography>
        <Button component={RouterLink} to="/add" variant="contained">
          Add Book
        </Button>
      </Box>
      <BookTable books={books} onDelete={remove} />
    </Box>
  );
}
