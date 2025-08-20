import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import NotFound from "./pages/NotFound";
import { BooksProvider } from "./context/BooksContext";

export default function App() {
  return (
    <BooksProvider>
      <Topbar />
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </BooksProvider>
  );
}
