export default function BookList({ books, deleteBook, startEditing }) {
  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-2">Book Inventory</h2>

      {/* if there are no books */}
      {books.length === 0 ? (
        <p className="text-gray-500">No books available</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Genre</th>
              <th className="p-2 border text-center">Quantity</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr className="hover:bg-gray-50" key={book.id}>
                  <td className="p-2 border">{book.title}</td>
                  <td className="p-2 border">{book.author}</td>
                  <td className="p-2 border">{book.genre_id}</td>
                  <td className="p-2 border text-center">{book.quantity}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => startEditing(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
