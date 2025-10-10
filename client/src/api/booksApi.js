import axios from "axios";

export const fetchAllBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/books");
    const books = await response.data;
    return books;
  } catch (error) {
    console.log(error);
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/books/create",
      bookData
    );
    const createdBook = await response.data[0];
    return createdBook;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/books/${bookId}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
fetchBookById(3);
