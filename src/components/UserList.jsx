import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/api";
import { toast } from "react-toastify";

const toastStyle = {
  userSelect: 'none', 
};

// eslint-disable-next-line react/prop-types
const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users ❌", {
        style: toastStyle, 
      });
    }
  };

  const handleEdit = (user) => {
    onEdit(user);
    setEditingUserId(user.id);
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleDelete = async (userId) => {
    if (editingUserId === userId) {
      handleCancel();
      return;
    }
    try {
      console.log("Attempting to delete user with ID:", userId);
      
      const userExists = users.find(user => user.id === userId);
      if (!userExists) {
        toast.error("User not found! ❌", {
          style: toastStyle, 
        });
        return;
      }

      await deleteUser(userId);
      toast.success("User deleted successfully! 🗑️", {
        style: toastStyle, 
      });

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.response ? error.response.data : error);
      toast.error(error.response?.data?.message || "Error deleting user ❌", {
        style: toastStyle, 
      });
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className={`px-3 py-1 rounded mr-2 text-white ${editingUserId === user.id ? "bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
                  >
                    {editingUserId === user.id ? "Editing" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className={`px-3 py-1 rounded text-white ${editingUserId === user.id ? "bg-gray-500 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"}`}
                  >
                    {editingUserId === user.id ? "Cancel" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
