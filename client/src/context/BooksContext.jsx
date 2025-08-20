import React, { createContext, useContext, useMemo, useState } from "react";
import sample from "../data/sampleBooks";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  // in memory store (resets on refresh)

  const [books, setBooks] = useState(sample);

  const actions = useMemo(
    () => ({
      list: () => books,
      getById: (id) => books.find((b) => b.id == id),
      create: (payload) =>
        setBooks((prev) => [...prev, { ...payload, id: String(Date.now()) }]),
      update: (id, patch) =>
        setBooks((prev) => prev.map((b) => (b.id == id ? { ...b, patch } : b))),
      remove: (id) => setBooks((prev) => prev.filter((b) => b.id !== id)),
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
