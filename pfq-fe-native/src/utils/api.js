import axios from "axios";

const apiURL = axios.create({
  baseURL: "https://chatpfq-api.onrender.com/api/",
});

export const getRequest = async (endpoint, params = {}) => {
    try {
      const res = await apiURL.get(endpoint, { params });
      return res.data;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };

  export const postRequest = async (endpoint, body) => {
    try {
        const res = await apiURL.post(endpoint, body)
        return res.data
    } catch (err) {
        console.log("Error:", err)
        throw err;
    }
};

