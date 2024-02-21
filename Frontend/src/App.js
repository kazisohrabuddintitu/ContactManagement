import React, { useState } from 'react';
import Login from './components/Login';
import ContactList from './components/ContactList';
import api from './services/api';

const App = () => {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);

  const handleLogin = async (credentials) => {
    try {
      const response = await api.post('login/', credentials);
      const newToken = response.data.key;

      // Store the token in localStorage
      localStorage.setItem('token', `Token ${newToken}`);

      setToken(newToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className='relative p-10'>
          <ContactList token={token} onLogout={handleLogout} />
          <button className="absolute bottom-0 right-0 bg-red-500 text-white py-2 px-4 rounded-md m-4" onClick={handleLogout}>
            Logout
          </button>
        </div>

      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
