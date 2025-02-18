import { useState, useEffect } from "react";
import { createUser, getAllUsers, deleteUser, updateUser } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const toastStyle = {
  userSelect: 'none', 
};

const UserManagement = ({setToken}) => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        toast.success("User updated successfully! ✅", {
          style: toastStyle, 
        });
      } else {
        await createUser(formData);
        toast.success("Signed In successfully! 🎉", {
          style: toastStyle, 
        });
      }
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      setEditingUser(null);
      setShowUsers(false); 
      fetchUsers();
    } catch (error) {
      toast.error("Error saving user ❌", {
        style: toastStyle, 
      });
      console.error("Error saving user:", error.response ? error.response.data : error);
    }
  };

  const handleCancel = () => {
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    setEditingUser(null);
    setShowUsers(true); // Show users list when canceling edit mode
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully! ✅", {
        style: toastStyle, 
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("Error deleting user ❌", {
        style: toastStyle, 
      });
      console.error("Error deleting user:", error.response ? error.response.data : error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="relative p-5 bg-gray-900 text-white min-h-screen flex flex-col items-center pt-20">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 bg-red-500 p-2 rounded text-white hover:bg-red-600 transition duration-300 z-10"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-5 text-center">CRUD Sequelize</h1>

      <div className="mb-5 bg-gray-800 p-5 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {editingUser ? "Edit User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600 transition duration-300 w-full"
          >
            {editingUser ? "Update" : "Create User"}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 p-2 rounded text-white hover:bg-gray-600 transition duration-300 w-full"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* User List - Hidden When Editing */}
      {!editingUser && (
        <>
          <h2 className="text-xl mb-3">Users Created: {users.length}</h2>
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="bg-green-500 p-2 rounded text-white hover:bg-green-600 transition duration-300"
          >
            {showUsers ? "Hide Users" : "View All Users"}
          </button>

          {showUsers && (
            <div className="overflow-x-auto w-full max-w-4xl mt-5">
              <table className="w-full bg-gray-800 border border-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700 text-center">
                      <td className="p-2">{user.firstName} {user.lastName}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setFormData({
                              firstName: user.firstName,
                              lastName: user.lastName,
                              email: user.email,
                              password: "", 
                            });
                            setShowUsers(false); 
                          }}
                          className="bg-yellow-500 p-1 rounded text-black hover:bg-yellow-600 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 p-1 rounded text-white hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserManagement;