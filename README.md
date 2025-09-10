"# lab-auth-api" 


This project is a simple authentication API built with Node.js, Express, and MySQL. It provides user signup, login, profile access, and logout functionality using JWT authentication.

The system allows new users to register with their email, full name, role, and a securely hashed password. Once registered, users can log in with their credentials, and the API issues a JWT that can be used to access protected routes. A profile endpoint is secured with JWT authentication, ensuring that only logged-in users can retrieve their account information. The API also includes a logout feature, which works by revoking tokens so they cannot be reused after logout. Additionally, a health check endpoint is available to confirm that both the server and database are running properly.

To set up the project, you first need to clone the repository and install the dependencies using npm install. Then, you should create a .env file in the project root with the required environment variables for database connection, server port, and JWT configuration. Afterward, you must set up the MySQL database by creating the lab_auth database along with two tables: users for storing registered accounts and revoked_tokens for tracking invalidated JWTs. Once this is complete, the server can be started using npm run dev, and it will run on http://localhost:3000.

The API exposes several endpoints. The health check endpoint (GET /api/health) reports the status of the server and database. Authentication endpoints include signup (POST /api/auth/signup) to register a new user, login (POST /api/auth/login) to obtain a JWT, and logout (POST /api/auth/logout) to revoke a token. The profile endpoint (GET /api/profile) is protected and requires a valid JWT to return the logged-in user’s information.

Negative test cases have also been considered. Attempting to register with an already-used email results in a 409 Conflict error. Logging in with the wrong password returns a 401 Unauthorized error. Trying to access the profile endpoint without providing a token also leads to a 401 Unauthorized response, as does using a tampered or expired token.

During the development of this project, several errors were encountered, such as missing database columns and incorrect route prefixes. These issues highlighted the importance of keeping the code and database schema in sync and paying close attention to how routes are defined in Express. The process also reinforced the value of JWTs for authentication and showed how token revocation is essential for maintaining secure sessions.
It also reinforced how JWT tokens and revocation logic provide secure user authentication.
