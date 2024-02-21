import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ContactList from './components/ContactList';
import Register from './components/Register';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/contacts" element={<ContactList />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
