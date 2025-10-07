import { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

export default function Dashboard() {
  // define initial state ie list of books
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-help",
      quantity: 10,
    },
  ]);

  console.log(books);

  // add a placeholder function (to be implemented later)
  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: Date.now() }]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Book_Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <BookForm addBook={addBook} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <BookList books={books} deleteBook={deleteBook} />
        </div>
      </div>
    </div>
  );
}
