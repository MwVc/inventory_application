import axios from "axios";

export const fetchAllBooks = async () => {
  const response = await axios.get("http://localhost:5000/api/books");
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await axios.post(
    "http://localhost:5000/api/books/create",
    bookData
  );
  console.log(response);
  return response;
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/books/${bookId}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);

    throw new Error("Unable to fetch book. Check your server connection.");
  }
};

export const updateBookById = async (bookData) => {
  const response = await axios.patch(
    `http://localhost:5000/api/books/${bookData.id}`,
    bookData
  );
  return response;
};

export const deleteBookById = async (bookId, password) => {
  console.log(bookId, password);
  const response = await axios.delete(
    `http://localhost:5000/api/books/${bookId}`,
    { data: { password: password } }
  );
  return response;
};
