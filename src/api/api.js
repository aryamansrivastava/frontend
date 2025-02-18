import axios from "axios";

const API_URL = "http://localhost:4000"; 

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, userData);
    return response.data; 
  } catch (err) {
    throw err.response?.data?.message || "Failed to create user"; 
  }
};

export const getAllUsers = async () => {
  return await axios.get(`${API_URL}/getallusers`);
};

export const getUserById = async (id) => {
  return await axios.get(`${API_URL}/getuser/${id}`);
};

export const updateUser = async (id, userData) => {
  return await axios.put(`${API_URL}/update/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`);
};
