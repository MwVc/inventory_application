import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookForm from "../components/BookForm";
import { useBooks } from "../context/BooksContext";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const { create } = useBooks();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Programming",
    price: 0,
    stock: 0,
    description: "",
  });

  const onChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  const onSubmit = (e) => {
    e.preventDefault();
    create({ ...form, price: Math.round(Number(form.price) * 100) });
    navigate("/");
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Add Book
      </Typography>
      <BookForm
        data={form}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="Create"
      />
    </Box>
  );
}
