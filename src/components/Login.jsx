import { useState, useEffect } from "react";

import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState()

  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    const storedPassword = localStorage.getItem("signupPassword");

    if (storedEmail && storedPassword) {
      setForm({ email: storedEmail, password: storedPassword });

      localStorage.removeItem("signupEmail");
      localStorage.removeItem("signupPassword");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return;
    }
    console.log("auth token set")
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/login`, form);
  
      console.log("Login Response:", data); 

      setUser({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      })
  
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        window.location.href = "/feed"; 
      } else {
        console.error("Token not received");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white py-8">
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-full sm:w-96 max-w-md border border-gray-700 transition-all transform">
        <h2 className="text-3xl font-bold text-center text-purple-300 mb-5">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Log In
          </button>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-purple-400 hover:text-purple-200 transition-colors duration-300">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;