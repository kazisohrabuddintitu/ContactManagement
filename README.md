# ContactManagement

# Backend Setup
1. **Clone the repository:**

   ```bash
   git clone https://github.com/kazisohrabuddintitu/ContactManagement
   cd Backend
2. **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. **Install backend dependencies:**
    ```bash
    pip install -r requirements.txt

4. **Direct to project folder**
    ```bash
    cd contact_manager

5. **Run the Django development server:**
    ```bash
    python manage.py runserver
    The API will be accessible at http://localhost:8000/api/.


# Frontend Setup
1. **Navigate to the frontend directory:**
    ```bash
    cd Frontend

2. **Install frontend dependencies:**
    ```bash
    npm install

3. **Start the development server:**
    ```bash
    npm start  # or use `yarn start`
    The UI will be accessible at http://localhost:3000, this is set as CORS_ALLOWED_ORIGINS in backend.


# Contact Management UI Documentation

This documentation outlines the features and functionality of a simple Contact Management UI.

## Features

### 1. List all contacts

The ContactList component displays a list of contacts. It fetches contact data from the server using an API endpoint and renders the contacts on the UI.

### 2. Add a new contact

The AddContact component allows users to add new contacts. It collects contact information such as name, email, phone number, and address. The contact is then sent to the server via an API request for storage.

### 3. Edit an existing contact

The ContactList component provides functionality to edit existing contacts. Users can click on the "Edit" button next to a contact, and the EditContact component is triggered, allowing modifications to the contact details.

### 4. Delete a contact

Contacts can be deleted using the ContactList component. Clicking the "Delete" button next to a contact triggers an API request to remove the contact from the server. The contact list is updated accordingly.

### 5. User Registration and Authentication

User registration functionality is implemented, allowing new users to sign up. Authentication is handled using tokens, and users need to log in with valid credentials to access and manage their contacts.

## Components

### 1. ContactList

- Lists and displays all contacts.
- Allows editing and deleting contacts.
- Fetches contact data from the server.

### 2. AddContact

- Provides a form to add new contacts.
- Collects contact details and sends them to the server for storage.

### 3. EditContact

- Allows editing existing contact details.
- Triggered by the ContactList component.

### 4. User Registration and Login

- UserRegistrationView: Handles user registration.
- Login: Provides a login form for users.

## API Endpoints

- `/contacts/`: Manages contacts (GET, POST).
- `/contacts/<contact_id>/`: Manages individual contacts (GET, PUT, DELETE).
- `/user/register/`: User registration endpoint (POST).
- `/login/`: User login endpoint (POST).
- `/get_user_info/`: Fetches user information (GET).

## Usage

1. Clone the repository.
2. Install dependencies (`npm install` or `yarn install`).
3. Start the development server (`npm start` or `yarn start`).
4. Access the UI in your web browser.


For any issues or questions, contact kazisohrab73@gmail.com.

