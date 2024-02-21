import React, { useState } from 'react';
import api from '../services/api';

const AddContact = ({ onAdd, token }) => {
    const [newContact, setNewContact] = useState({
      name: '',
      email: '',
      phone_number: '',
      address: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewContact({ ...newContact, [name]: value });
    };
  
    const handleAdd = async () => {
      try {
        const response = await api.post('contacts/', newContact, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        onAdd(response.data);
        setNewContact({
          name: '',
          email: '',
          phone_number: '',
          address: '',
        });
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleInputChange}
            className="border border-gray-500 p-2 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
            className="border border-gray-500 p-2 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={newContact.phone_number}
            onChange={handleInputChange}
            className="border border-gray-500 p-2 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <input
            type="text"
            name="address"
            value={newContact.address}
            onChange={handleInputChange}
            className="border border-gray-500 p-2 rounded-md w-full"
          />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
