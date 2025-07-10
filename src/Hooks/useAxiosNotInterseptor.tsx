import axios from "axios";
import { useState } from "react";

const useAxiosNotInterseptor = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (method = "get", requestData = {}, config = {}, customUrl?: string) => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await axios({
        url: customUrl || url,
        method,
        data: requestData,
        ...config,
      });
      if (response.status === 204) {
        if (method === "delete") {
          setData("delete");
        }
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        window.location.href = "/";
        localStorage.removeItem("token");
      } else {
        setError(error);
      }
      setError(error);
      // @ts-ignore
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, data, loading, error };
};

export default useAxiosNotInterseptor;