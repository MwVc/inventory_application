import apiClient from "./apiClient";

export const fetchGenres = async () => {
  return await apiClient.get("/genres");
};
