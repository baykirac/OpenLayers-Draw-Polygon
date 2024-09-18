import axios from "axios";

const ax = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


function parseApiResponse(response) {
    const isSuccess = response.data.success;
    const message = response.data.message;
    const errors = response.data.errors;
    const body = response.data.data;
  
    return {
      isSuccess,
      message,
      errors,
      body,
    };
  }

  

const api = {
    get: async function (path, params = {}) {
      try {
        const response = await ax.get(path, {
          params,
        });
        return parseApiResponse(response);
      } catch (e) {
        console.error(e);
        return {
          isSuccess: false,
          message: "Bilinmeyen bir hata oluştu!",
        };
      }
    },
    post: async function (path, body) {
      try {
        debugger;
        const response = await ax.post(path, body);
        return parseApiResponse(response);
      } catch (e) {
        console.error(e);
  
        return {
          isSuccess: false,
          message: "Bilinmeyen bir hata oluştu!",
        };
      }
    },
  };

export default api;