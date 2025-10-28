import apiClient from "./apiClient";

export const fetchBooks = async () => {
  return await apiClient.get("/books");
};

export const createBook = async (bookData) => {
  return await apiClient.post("/books/create", bookData);
};

export const fetchBookById = async (bookId) => {
  return await apiClient.get(`/books/${bookId}`);
};

export const updateBookById = async (bookData) => {
  return apiClient.patch(`/books/${bookData.id}`, bookData);
};

export const deleteBookById = async (bookId, password) => {
  return apiClient.delete(`/books/${bookId}`, { data: { password: password } });
};
