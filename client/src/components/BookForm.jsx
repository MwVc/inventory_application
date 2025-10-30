import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookForm({
  addBook,
  updateBook,
  editingBook,
  setEditingBook,
  updateSuccess,
  genres,
}) {
  // local state for form inputs
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    author: "",
    genre_id: "",
    stock: "",
  });

  // when editingBook changes pre-fill the form
  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  // reset the form when book successfully updates
  useEffect(() => {
    if (updateSuccess) {
      setFormData({ title: "", author: "", genre_id: "", stock: "" });
    }
  }, [updateSuccess]);

  // reset formstate
  const resetFormState = () => {
    setFormData({ title: "", author: "", genre_id: "", stock: "" });
    setEditingBook(null);
  };

  // handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target; // name = input field name, value = current value
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate: make sure all fields are filled
    if (
      !formData.title ||
      !formData.author ||
      !formData.genre_id ||
      !formData.stock
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (!formData.id) {
      // add new book
      addBook(formData);

      // clear form input after submission
      setFormData({ title: "", author: "", genre_id: "", stock: "" });
      return;
    }

    // editing existing book
    updateBook(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        {formData.id ? "Edit Book" : "Add New Book"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />

      <select
        name="genre_id"
        id="genre_id"
        value={formData.genre_id}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      >
        <option value="">Choose A Genre</option>
        {/* <option value="1">Non-Fiction</option>
        <option value="2">Science</option>
        <option value="3">Fiction</option>
        <option value="4">History</option>
        <option value="5">Technology</option> */}
        {genres ? (
          genres.map((genre) => (
            <option value={`${genre.id}`} key={genre.id}>
              {genre.name}
            </option>
          ))
        ) : (
          <option>Error</option>
        )}
      </select>

      <input
        type="number"
        min={0}
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />

      <div className="flex  mb-6 space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {formData.id ? "Save changes" : "Add Book"}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-500"
          onClick={() => {
            resetFormState();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
