"# lab-auth-api" 

A simple authentication API built with **Node.js**, **Express**, and **MySQL**.  
It provides user signup, login, profile access, and logout functionality using **JWT authentication**.

---

## 🚀 Project Overview

This project demonstrates a basic authentication system with the following features:

- User registration with hashed passwords  
- User login with JWT issuance  
- Token-protected routes (Profile access)  
- Token revocation (Logout)  
- Health check endpoint for DB/server status  

---

## ⚙️ Setup Instructions

```sh
### 1. Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo
### 2. Install dependencies
```sh
Copy code
npm install
3. Configure environment variables
Create a .env file in the project root and add:

ini
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=lab_auth
DB_PORT=3306

SERVER_PORT=3000

JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES=1h
4. Setup MySQL tables
Run the following SQL queries in your MySQL database:

sql
Copy code
CREATE DATABASE IF NOT EXISTS lab_auth;

USE lab_auth;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role ENUM('student', 'admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE revoked_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  jti VARCHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL
);
5. Start the server
sh
Copy code
npm run dev
Server will run at: http://localhost:3000

📌 API Endpoints
Health Check
GET /api/health → returns server and DB status

Authentication
POST /api/auth/signup → register a new user
Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "Pass@1234",
  "full_name": "User One",
  "role": "student"
}
POST /api/auth/login → login and receive JWT
Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "Pass@1234"
}
POST /api/auth/logout → revoke token
Header:

makefile
Copy code
Authorization: Bearer <token>
Profile (Protected)
GET /api/profile → get logged-in user info
Header:

makefile
Copy code
Authorization: Bearer <token>
🧪 Negative Test Cases
Duplicate signup → 409 Conflict

Wrong password → 401 Unauthorized

No token on /profile → 401 Unauthorized

Tampered/expired token → 401 Unauthorized

📖 Lessons Learned
While building this project, I encountered errors such as missing database columns and incorrect route prefixes.
These challenges highlighted the importance of keeping the code in sync with the database schema and carefully handling route definitions in Express.

The project also reinforced how JWT tokens provide secure user authentication, while revocation logic ensures that logged-out sessions cannot be reused.


