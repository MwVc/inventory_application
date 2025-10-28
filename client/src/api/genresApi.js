import apiClient from "./apiClient";

export const fetchGenres = async () => {
  return await apiClient.get("/genres");
};

export const deleteGenreById = async (id, password) => {
  return await apiClient.delete(`/genres/${id}`, {
    data: { password: password },
  });
};

export const createGenre = async (name) => {
  await apiClient.post("/genres/create", { name: name });
};
