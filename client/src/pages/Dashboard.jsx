import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { deleteBookById, fetchAllBooks, updateBookById } from "../api/booksApi";
import { createBook } from "../api/booksApi";
import PopUp from "../components/PopUp";
import toast, { Toaster } from "react-hot-toast";
import GenreList from "../components/GenreList";

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
  // active tab state
  const [activeTab, setActiveTab] = useState("books");

  // fetch books
  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchAllBooks();

        setBooks(data);
      } catch (error) {
        toast.error(`Failed to fetch books: ${error.message}`);
        setBooks([]);
      }
    })();
  }, []);

  // fetch genres

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
      setUpdateSuccess(false);

      if (error.status !== 400) {
        toast.error(`Something went wrong: ${error.message}`);
        return;
      }

      error.data.errors.forEach((error) => toast.error(error.msg));
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
      // notify the user
      toast.success("Book created succesfully");
    } catch (error) {
      console.log(error);

      if (error.status !== 400) {
        toast.error(error.message);
        return;
      }

      // handle validation error
      error.data.errors.forEach((error) =>
        toast.error(`Validation error: ${error.msg}`)
      );
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
      if (error.status === 401) {
        toast.error("Wrong password");
      } else if (error.status === 404) {
        toast.error("Book not found");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">Book_Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
        <div className="bg-white p-4 rounded-xl shadow">
          <BookForm
            addBook={addBook}
            updateBook={updateBook}
            editingBook={editingBook}
            updateSuccess={updateSuccess}
          />
        </div>
        <div className="bg-white p-4 rounded-xl shadow overflow-y-auto">
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setActiveTab("books")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === "books" ? "bg-blue-600 text-white" : "bg-gray-200"
              } `}
            >
              Books
            </button>
            <button
              onClick={() => setActiveTab("genres")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab == "genres" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Genres
            </button>
          </div>
          {activeTab === "books" ? (
            <BookList
              books={books}
              handleDeleteClick={handleDeleteClick}
              startEditing={startEditing}
            />
          ) : (
            <GenreList />
          )}
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
