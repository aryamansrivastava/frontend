import axios from "axios";

const API_URL = "http://localhost:4000"; 

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, userData);
    return response.data; 
  } catch (err) {
    throw err.response?.data?.message || "Failed to create user"; // Pass the error message
  }
};

// Get all users
export const getAllUsers = async () => {
  return await axios.get(`${API_URL}/getallusers`);
};

// Get a single user by ID
export const getUserById = async (id) => {
  return await axios.get(`${API_URL}/getuser/${id}`);
};

// Update a user
export const updateUser = async (id, userData) => {
  return await axios.put(`${API_URL}/update/${id}`, userData);
};

// Delete a user
export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`);
};
