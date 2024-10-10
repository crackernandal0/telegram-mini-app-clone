import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.needup.in";
// const BASE_URL = 'http://localhost:5001/';

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: BASE_URL,
  });

  // Function to set the token in the request header
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["access-token"] = { token };
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  const get = async (url) => {
    try {
      setLoading(true);
      const response = await api.get(url);
      // console.log('response: ', response);
      setData(response?.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const post = async (url, body) => {
    try {
      setLoading(true);
      const response = await api.post(url, body);
      setData(response.data);
      // console.log('response: ', response);
    } catch (error) {
      setData(error);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const put = async (url, body) => {
    try {
      setLoading(true);
      const response = await api.put(url, body);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (url) => {
    try {
      setLoading(true);
      await api.delete(url);
      setData(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    setAuthToken,
    get,
    post,
    put,
    remove,
  };
};

export { useApi };
