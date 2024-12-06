# Passman: Password Management Tool

Passman is a simple yet secure password manager that allows you to store, retrieve, and manage your passwords. It supports features like encryption, password retrieval, and user verification. The app is designed with a clean interface and uses Angular for the frontend and a C# backend for secure password management.

## Installation

1. Clone the repository.
2. Install the necessary dependencies for both the frontend and backend:
   - **Frontend (Angular)**:  
     Navigate to the `frontend` directory and run:
     ```bash
     npm install
     ng serve
     ```
   - **Backend (C# .NET)**:  
     Navigate to the `backend` directory and run:
     ```bash
     dotnet run
     ```
     Ensure that the backend is running before using the frontend.

   [Link to Backend Code](#)

## Key Features & Usage

1. **Add Password**:  
   Use the "Add Password" form to securely add new passwords. Enter the required fields: category, app, username, and password.

2. **View and Decrypt Passwords**:  
   The list of saved passwords is displayed in a clean UI. You can choose to decrypt and view a password or keep it masked.

3. **Edit Passwords**:  
   Select an existing password, modify its details, and save the changes.

4. **Delete Password**:  
   Use the confirmation dialog to safely delete any password.

5. **User Verification**:  
   Enter a passkey (e.g., `jean@groupm`) to validate your identity and gain access to sensitive operations.

6. **Profile & Status**:  
   View the user’s profile with a round picture and verify status ("verified" or "unverified").

## Technologies Used

- **Frontend**: Angular, Tailwind CSS, Angular Material
- **Backend**: C# (ASP.NET Core)
