import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import axios from "axios";

export default function Dashboard() {
  // fetching data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // define initial state ie list of books
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      genre_id: "Self-help",
      quantity: 10,
    },
  ]);

  // track which book is currently being edited
  const [editingBook, setEditingBook] = useState(null);

  // start editing book
  const startEditing = (book) => {
    setEditingBook(book);
  };

  // save the edited book
  const updateBook = (updateBook) => {
    setBooks(
      books.map((book) => (book.id === updateBook.id ? updateBook : book))
    );
    setEditingBook(null);
  };

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
          <BookForm
            addBook={addBook}
            updateBook={updateBook}
            editingBook={editingBook}
          />
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <BookList
            books={books}
            deleteBook={deleteBook}
            startEditing={startEditing}
          />
        </div>
      </div>
    </div>
  );
}
