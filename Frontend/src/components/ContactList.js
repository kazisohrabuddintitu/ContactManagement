import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AddContact from './AddContact';
import EditContact from './EditContact';

const ContactList = ({ token }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('contacts/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [token]);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
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
              <button onClick={() => handleEditContact(contact)} className="ml-2 text-blue-500">
                Edit
              </button>
              <button onClick={() => handleDeleteContact(contact.id)} className="ml-2 text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedContact && <EditContact contact={selectedContact} token={token} />}
      <AddContact token={token} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" />
    </div>
  );
};

export default ContactList;

