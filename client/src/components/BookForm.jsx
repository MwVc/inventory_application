import { useEffect, useState } from "react";

export default function BookForm({ addBook, updateBook, editingBook }) {
  // local state for form inputs
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    author: "",
    category: "",
    quantity: "",
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
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate: make sure all fields are filled
    if (
      !formData.title ||
      !formData.author ||
      !formData.category ||
      !formData.quantity
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
    setFormData({ title: "", author: "", category: "", quantity: "" });
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

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />

      <input
        type="number"
        min={0}
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
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
