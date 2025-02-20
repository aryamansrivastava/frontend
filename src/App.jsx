import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserManagement from "./components/UserManagement";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState()

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  
  }, [token])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={token ? <Navigate to="/feed" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/feed" /> : <SignUp />} />

        <Route path="/feed" element={token ? <UserManagement setToken={setToken} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
