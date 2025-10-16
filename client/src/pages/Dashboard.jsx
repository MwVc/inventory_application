import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { fetchAllBooks } from "../api/booksApi";
import { createBook } from "../api/booksApi";

export default function Dashboard() {
  // define initial state ie list of books
  const [books, setBooks] = useState([]);

  // fetch data
  useEffect(() => {
    (async () => {
      try {
        const fetchedBooks = await fetchAllBooks();

        setBooks(fetchedBooks);
      } catch (error) {
        console.log("Failed to fetch books: ", error.message);
        setBooks([]);
      }
    })();
  }, []);

  // // checking books state
  // console.log(books);

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

  // add book to server
  const addBook = async (newBook) => {
    try {
      const response = await createBook(newBook);
      // expect new book from server
      const book = await response.data.data;
      // add new book to state
      setBooks((prevBooks) => [...prevBooks, book]);
    } catch (error) {
      console.log(error);
      // the backend sent a known response
      if (error.response) {
        const { status, data } = error.response;

        // handle validation errors
        if (status === 400 && data.errors) {
          console.log("Validation errors:", data.errors);

          // display to the user in the form
        } else {
          // handle other errors
          console.log(`Server error ${status}:`, data.message);
        }
      }
      // handle if server doesn't respond
      else if (error.request) {
        console.log("No response from server:", error.message);
      } else {
        console.log("Error sending request:", error.message);
      }
    }
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
