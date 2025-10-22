import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
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
      message: error.response?.data?.message || "Something went wrong",
      data: error.response?.data || null,
    };

    return Promise.reject(err);
  }
);

export default apiClient;
