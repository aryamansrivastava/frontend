import { useState, useEffect } from "react";

import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post("http://localhost:4000/login", form);
  
      console.log("Login Response:", data); 
  
      if (data.token) {
        localStorage.setItem("token", data.token);
        
        console.log("Token Stored:", localStorage.getItem("token")); 
        
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
