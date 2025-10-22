import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { deleteBookById, fetchAllBooks, updateBookById } from "../api/booksApi";
import { createBook } from "../api/booksApi";
import PopUp from "../components/PopUp";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  // define initial state ie list of books
  const [books, setBooks] = useState([]);
  // track which book is currently being edited
  const [editingBook, setEditingBook] = useState(null);
  // book updateSuccess state
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // password for deletion of book
  const [password, setPassword] = useState("");
  // book to be deleted stored in state
  const [bookToDeleteId, setBookToDeleteId] = useState(null);

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

  // start editing book
  const startEditing = (book) => {
    setEditingBook(book);
  };

  // save the edited book
  const updateBook = async (bookFormData) => {
    try {
      const response = await updateBookById(bookFormData);
      const updatedBook = await response.data.data;

      // insert newly updated book to books state
      setBooks(
        books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );

      // clear editing book state
      setEditingBook(null);

      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
      setUpdateSuccess(false);
      // the backend sent a known response
      if (error.response) {
        const { status, data } = error.response;
        console.log(status, data);

        // handle validation errors
        if (status === 400 && data.errors) {
          console.log("validation errors", data.errors);

          // display to user
        }
      } else {
        // handle other errors
        console.log("Error sending request:", error.message);
      }
    }
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
      // request was made but no response was received
      else if (error.request) {
        console.log("No response from server:", error.message);
      } else {
        console.log("Error sending request:", error.message);
      }
    }
  };

  // function to handle delete click
  const handleDeleteClick = (bookId) => {
    setBookToDeleteId(bookId);
    setIsPopupOpen(true);
  };

  const deleteBook = async () => {
    setPassword(""); // clear password state
    try {
      const response = await deleteBookById(bookToDeleteId, password);
      console.log(response);
      toast.success("Book deleted successfully");
      // delete book in state and rerender
      setBooks(books.filter((book) => book.id !== bookToDeleteId));
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        toast.error("Wrong password");
      } else if (error.status === 404) {
        alert("Book not found");
      } else {
        alert("Something went wrong:", error.message);
      }
    }
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
            updateSuccess={updateSuccess}
          />
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <BookList
            books={books}
            handleDeleteClick={handleDeleteClick}
            startEditing={startEditing}
          />
        </div>
      </div>

      {/* popup */}
      <PopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        password={password}
        onPasswordChange={(event) => {
          setPassword(event.target.value);
        }}
        deleteBook={deleteBook}
      ></PopUp>
      <Toaster />
    </div>
  );
}
