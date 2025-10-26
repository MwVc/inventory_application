import apiClient from "./apiClient";

export const fetchGenres = async () => {
  return await apiClient.get("/genres");
};

export const deleteGenre = async (id) => {
  return await apiClient.delete(`/genres/${id}`);
};
