import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AddContact from './AddContact';
import EditContact from './EditContact';
import { Link } from 'react-router-dom';

const ContactList = ({ token }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [userId, setUserId] = useState(null);

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

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('contacts/', {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            owner: userId,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    if (userId) {
      fetchContacts();
    }
  }, [token, userId]);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };
  
  const handleDeleteContact = async (contactId) => {
    try {
      await api.delete(`contacts/${contactId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      // Update the contact list by excluding the deleted contact
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-2">
            <div className="bg-gray-200 p-4 rounded-md">
              <strong>{contact.name}</strong> - {contact.email} - {contact.phone_number} - {contact.address}
              <button onClick={() => handleEditContact(contact)} className="ml-2  py-2 px-4 rounded-md bg-blue-400">
                Edit
              </button>
              <button onClick={() => {
                handleDeleteContact(contact.id);
                window.location.reload();
              }} className="ml-2 bg-red-400 py-2 px-4 rounded-md">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedContact && <EditContact contact={selectedContact} token={token} />}
      <div>
      <AddContact token={token} onAdd={handleAddContact} />
      </div>
      <div className='bottom-0 mt-4'>
        <button className='bg-red-600 rounded-md px-3 py-2'>
          <Link to='/'>LogOut</Link>
        </button>
      </div>
    </div>
  );
};

export default ContactList;
