"# lab-auth-api" 


A simple authentication API built with **Node.js**, **Express**, and **MySQL**.  
It provides user signup, login, profile access, and logout functionality using **JWT** authentication.

---

## 🚀 Project Overview
This project demonstrates a basic authentication system:
- User registration with hashed passwords
- User login with JWT issuance
- Token-protected routes (Profile)
- Token revocation (Logout)
- Health check endpoint for DB/server status

---

Setup Instructions

1. Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. Install dependencies
sh
Copy code
npm install
3. Configure environment
Create a .env file in the project root:

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
Run these queries in your MySQL database:

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
Server runs at: http://localhost:3000

📌 API Endpoints
Health Check
GET /api/health → returns server and DB status

Authentication
POST /api/auth/signup → register a new user
Body: { "email": "user@example.com", "password": "Pass@1234", "full_name": "User One", "role": "student" }

POST /api/auth/login → login and receive JWT
Body: { "email": "user@example.com", "password": "Pass@1234" }

POST /api/auth/logout → revoke token
Header: Authorization: Bearer <token>

Profile (Protected)
GET /api/profile → get logged-in user info
Header: Authorization: Bearer <token>

🧪 Negative Test Cases
Duplicate signup → 409 Conflict

Wrong password → 401 Unauthorized

No token on /profile → 401 Unauthorized

Tampered/expired token → 401 Unauthorized

📖 Lessons Learned
While building this project, errors such as missing DB columns and incorrect route prefixes were encountered.
This highlighted the importance of syncing code with the database schema and carefully handling Express routes.
It also reinforced how JWT tokens and revocation logic provide secure user authentication.
