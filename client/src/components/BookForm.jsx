import { useEffect, useState } from "react";

export default function BookForm({ addBook, updateBook, editingBook }) {
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

  // handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target; // name = input field name, value = current value
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    // validate: make sure all fields are filled
    if (
      !formData.title ||
      !formData.author ||
      !formData.genre_id ||
      !formData.stock
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.id) {
      // editing existing book
      updateBook(formData);
    } else {
      // add new book
      addBook(formData);
    }

    // clear form input after submission
    setFormData({ title: "", author: "", genre_id: "", stock: "" });
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
        <option value="1">Non-Fiction</option>
        <option value="2">Science</option>
        <option value="3">Fiction</option>
        <option value="4">History</option>
        <option value="5">Technology</option>
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

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        {formData.id ? "Save changes" : "Add Book"}
      </button>
    </form>
  );
}
