import axios from "axios";

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/create`, userData);
    return response.data; 
  } catch (err) {
    throw err.response?.data?.message || "Failed to create user"; 
  }
};

export const getAllUsers = async () => {
  console.log('Default Axios Headers:', axios.defaults.headers.common);
  return await axios.get(`${import.meta.env.VITE_API_URL}/getallusers`);
};

export const getUserById = async (id) => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/getuser/${id}`);
};

export const updateUser = async (id, userData) => {
  return await axios.put(`${import.meta.env.VITE_API_URL}/update/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`);
};