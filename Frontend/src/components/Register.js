import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('user/register/', user);

      alert('User registered successfully!');
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-500 p-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-2 text-center">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};


export default Register;
