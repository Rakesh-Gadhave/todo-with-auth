Todo API with Authentication & Authorization

A simple RESTful API built with Node.js and Express for managing todos. This project demonstrates how to implement user authentication using JSON Web Tokens (JWT) and role-based authorization. In this API, any authenticated user can add a todo, but only an admin user is allowed to update or delete todos.

Features
User Authentication:
Users can log in to receive a JWT token.

Role-Based Authorization:

Authenticated Users: Can add todos.
Admin Users: Can update and delete todos.
CRUD Operations:
Endpoints for creating, reading, updating, and deleting todos.

Middleware:
Custom middleware for JWT authentication and admin role checking.

Requirements
Node.js (v14 or later recommended)
npm (Node Package Manager)

Installation
npm install

Running the Application
Start the server with:
npm run dev
The server will run on http://localhost:8000.

API Endpoints
Authentication
POST /login
Authenticate a user and receive a JWT token.
Request Body:
{
  "username": "user1",
  "password": "password"
}
Response:
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Todos
Note: All endpoints below require an Authorization header with the JWT token:
Authorization: Bearer <your.jwt.token>

POST /todos
Create a new todo. (Accessible to any authenticated user)
Request Body:
{
  "todo": "Learn Node.js"
  "isCompleted" : false
}
Response:
{
  "id": 1616161616161,
  "todo": "Learn Node.js",
  "isCompleted": false,
}

GET /todos
Retrieve all todos. Supports optional pagination with query parameters (page and limit).

Response:
[
  {
    "id": 1616161616161,
    "todo": "Learn Node.js",
    "isCompleted": false,
  },
]


GET /todos/:id
Retrieve a single todo by its ID.

Response:
{
  "id": 1616161616161,
  "todo": "Learn Node.js",
  "isCompleted": false,
}

PUT /todos/:id
Update a todo. Admin access is required for this endpoint.

Request Body:
{
  "todo": "Learn Express.js",
  "isCompleted": true
}
Response:
{
  "id": 1616161616161,
  "todo": "Learn Express.js",
  "isCompleted": true,
}

DELETE /todos/:id
Delete a todo. Admin access is required for this endpoint.

Response:
{
  "data": {
    "id": 1616161616161,
    "todo": "Learn Node.js",
    "isCompleted": false,
  },
  "message": "Todo is deleted"
}

Middleware Overview
Authentication Middleware:
Verifies the JWT token provided in the Authorization header and attaches the decoded user information to req.user.

Admin Authorization Middleware:
Checks that the authenticated user has an admin role. If not, access to update and delete endpoints is denied.

Testing the API
You can test the API using tools like Postman