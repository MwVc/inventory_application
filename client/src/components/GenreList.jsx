const GenreList = ({ genres }) => {
  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-2">Genres</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Genre</th>
            <th className="p-2 border text-center">No. of Books</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => {
            return (
              <tr className="hover:bg-gray-50" key={genre.id}>
                <td className="p-2 border">{genre.name}</td>
                <td className="p-2 border text-center">{genre.books}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => console.log("Adding genre")}
                  >
                    Add
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => console.log("Deleting genre")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GenreList;
