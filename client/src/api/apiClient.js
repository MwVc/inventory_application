import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

// intercept responses
apiClient.interceptors.response.use(
  (response) => {
    return response; // pass the response
  },
  (error) => {
    // normalize the error
    const err = {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      data: error.response?.data || null,
    };

    return Promise.reject(err);
  }
);

export default apiClient;
