# TodoApp Backend

A simple Node.js, Express, TypeScript, and MongoDB backend for a Todo application. It supports user signup/login with JWT authentication and authenticated task CRUD operations.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing

## Project Structure

```text
src/
  middleware/
    auth.ts          # JWT auth middleware
  models/
    Task.ts          # Task schema
    User.ts          # User schema
  routes/
    auth.ts          # Signup and login routes
    tasks.ts         # Task CRUD routes
  types/
    TaskType.ts
    UserType.ts
  server.ts          # App entry point
```

## Requirements

- Node.js
- npm
- MongoDB connection string

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
```

## Installation

```bash
npm install
```

## Run the Server

```bash
npm run dev
```

The server starts at:

```text
http://localhost:5000
```

Health check:

```http
GET /
```

Response:

```text
Todo API is running
```

## API Endpoints

### Auth

#### Signup

```http
POST /api/auth/signup
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "User Created Successfully"
}
```

#### Login

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token_here",
  "email": "user@example.com"
}
```

### Tasks

All task routes require this header:

```http
Authorization: Bearer your_jwt_token
```

#### Create Task

```http
POST /api/task
```

Request body:

```json
{
  "title": "Finish backend README",
  "desc": "Add setup and API documentation",
  "dateTime": "2026-08-29T10:00:00.000Z",
  "deadLine": "2026-08-30T10:00:00.000Z",
  "importance": "medium"
}
```

Required fields:

- `title`
- `dateTime`
- `deadLine`

Allowed `importance` values:

- `low`
- `medium`
- `high`

#### Get All Tasks

```http
GET /api/task
```

Returns all tasks for the logged-in user.

#### Update Task

```http
PUT /api/task/:id
```

Example request body:

```json
{
  "title": "Updated task title",
  "status": true,
  "importance": "high"
}
```

#### Delete Task

```http
DELETE /api/task/:id
```

Response:

```json
{
  "message": "Task deleted"
}
```

## Scripts

```bash
npm run dev
```

Runs the server in development mode using `nodemon` and `tsx`.

```bash
npm test
```

No test suite is configured yet.

## Notes

- `.env` is ignored by Git and should not be committed.
- Users can only access, update, and delete their own tasks.
- JWT tokens expire after 1 day.
