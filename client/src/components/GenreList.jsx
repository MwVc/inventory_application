import { useState } from "react";
import { createGenre } from "../api/genresApi";
import toast from "react-hot-toast";

const GenreList = ({ genres, getGenres, handleDeleteGenre }) => {
  const [genre, setGenre] = useState("");

  // set input value to state - controlled form
  const handleChange = (event) => {
    const { value } = event.target;
    setGenre(value);
  };

  const handleGenreFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await createGenre(genre);

      setGenre("");
      getGenres();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container flex flex-col gap-y-9 h-full">
      <div className="container">
        <h2 className="text-xl font-semibold mb-2">Genres</h2>

        {/*if genres is undefined genres?.length gives undefined(fasly)
      if genres is [] then .length is 0 (falsey)
      if genres has elements then .length > 0 (truthy)
      */}
        {genres?.length ? (
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
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDeleteGenre(genre.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Genres not available</p>
        )}
      </div>
      <div className="container">
        <form onSubmit={handleGenreFormSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Add A New Genre</h2>
          <input
            type="text"
            name="genre"
            placeholder="Add a new genre"
            value={genre}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Add Genre
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenreList;
