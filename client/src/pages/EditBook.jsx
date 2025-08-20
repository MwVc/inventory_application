import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookForm from "../components/BookForm";
import { useBooks } from "../context/BooksContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const { getById, update } = useBooks();
  const navigate = useNavigate();
  const book = getById(id);
  const [form, setForm] = useState(
    book || {
      title: "",
      author: "",
      category: "Programming",
      price: 0,
      stock: 0,
      description: "",
    }
  );

  useEffect(() => {
    if (book) setForm({ ...book, price: book.price / 100 });
  }, [book]);

  const onChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  const onSubmit = (e) => {
    e.preventDefault();
    update(id, { ...form, price: Math.round(Number(form.price) * 100) });
    navigate(`/books/${id}`);
  };

  if (!book) return <Typography>Book not found</Typography>;

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Edit Book
      </Typography>
      <BookForm
        data={form}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="Save"
      />
    </Box>
  );
}
