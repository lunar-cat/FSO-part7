import { useEffect, useState } from 'react';
import axios from 'axios';

export const useResource = (baseURL) => {
  const [token, setToken] = useState(null);
  const [resources, setResources] = useState([]);
  useEffect(() => {
    getAll(baseURL).then(data => setResources(data));
  }, [baseURL]);

  const getAll = async (baseURL) => {
    const response = await axios.get(baseURL);
    return response.data;
  };
  const create = async (newObject) => {
    const config = { headers: { Authorization: token } };
    const response = await axios.post(baseURL, newObject, config);
    setResources([...resources, response.data]);
    return response.data;
  };
  const update = async (id, newObject) => {
    const response = await axios.put(`${baseURL}/${id}`, newObject);
    setResources(resources.map(r => r.id !== id ? r : response.data));
    return response.data;
  };
  const updateToken = (token) => setToken(`Bearer ${token}`);

  const service = { create, update, updateToken };
  return [resources, service];
};