import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
  userSelect: 'none', 
};

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("Please fill in all fields.", {
        style: toastStyle,
      });
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/signup", form);
  
      if (response.status === 201) {
        toast.success("User created successfully! 🎉", {
          style: toastStyle, 
        });
  
        localStorage.setItem("signupEmail", form.email);
        localStorage.setItem("signupPassword", form.password);
  
        window.location.href = "/login"; 
      }
    } catch (error) {
      toast.error("Error during signup ❌", {
        style: toastStyle, 
      });
      console.error("Signup failed", error);
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-full sm:w-96 max-w-md border border-gray-700 transition-all transform">
        <h2 className="text-3xl font-bold text-center text-purple-300 mb-5">Create a New Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300 text-white placeholder-gray-400"
          />

          <input
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300 text-white placeholder-gray-400"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300 text-white placeholder-gray-400"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-300 text-white placeholder-gray-400"
          />

          <button
            type="submit"
            className="bg-blue-500 p-3 rounded text-white hover:bg-blue-600 transition duration-300 w-full"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:text-purple-200 transition-colors duration-300">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
