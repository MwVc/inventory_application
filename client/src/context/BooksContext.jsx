import React, { createContext, useContext, useMemo, useState } from "react";
import booksData from "../data/books";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  // in memory store (resets on refresh)

  const [books, setBooks] = useState(booksData);

  const actions = useMemo(
    () => ({
      list: () => books,
      getById: (id) => books.find((book) => book.id == id),
      create: (payload) =>
        setBooks((prev) => [...prev, { ...payload, id: String(Date.now()) }]),
      update: (id, patch) =>
        setBooks((prev) =>
          prev.map((book) => (book.id == id ? { ...book, patch } : book))
        ),
      remove: (id) => setBooks((prev) => prev.filter((book) => book.id !== id)),
    }),
    [books]
  );
  return (
    <BooksContext.Provider value={actions}>{children}</BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used within BooksProvider");
  return ctx;
}
