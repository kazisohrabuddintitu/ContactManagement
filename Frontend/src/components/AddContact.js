import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddContact = ({ onAdd, token }) => {
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('get_user_info/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Extract user ID from the response
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('contacts/', {
        ...newContact,
        owner: userId,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      onAdd(response.data);

      // Show pop-up alert
      setShowAlert(true);

      // Reset form fields
      setNewContact({
        name: '',
        email: '',
        phone_number: '',
        address: '',
      });

      // Redirect to /contacts after the alert is dismissed
      setTimeout(() => {
        setShowAlert(false);
        navigate('/contacts');
      }, 3000);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };
  
  return (
    <div className="container mx-auto my-8 bg-gray-200 p-20 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Contact</h2>
      <form onSubmit={handleAdd} className="max-w-md mx-auto">
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
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={(e) => handleAdd(e)}
        >
          Add Contact
        </button>
      </form>

      {showAlert && (
        <div className="fixed bottom-0 right-0 p-4 bg-green-500 text-white">
          Contact added successfully!
        </div>
      )}
    </div>
  );
};

export default AddContact;
