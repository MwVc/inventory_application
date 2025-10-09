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
