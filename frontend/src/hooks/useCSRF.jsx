import { useEffect } from "react";
import axios from "axios";

const useCSRF = () => {
  useEffect(() => {
    const fetchCSRF = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        await axios.get(`${baseURL}/users/csrf/`, {
          withCredentials: true,
        });
      } catch (err) {
        // console.error("Failed to get CSRF token:", err);
      }
    };
    fetchCSRF();
  }, []);
};

export default useCSRF;
