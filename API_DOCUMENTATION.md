# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Auth Routes

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "passwordConfirm": "securePassword123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### POST /auth/login
Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

---

#### GET /auth/verify
Verify the current token and get user data. **[Protected]**

**Response (200):**
```json
{
  "status": "success",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### PUT /auth/update-profile
Update user profile. **[Protected]**

**Request Body:**
```json
{
  "name": "Jane Doe",
  "bio": "Updated bio",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (200):**
```json
{
  "status": "success",
  "user": {...}
}
```

---

#### PUT /auth/change-password
Change user password. **[Protected]**

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123",
  "newPasswordConfirm": "newPassword123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

---

### Task Routes

#### GET /tasks
Get all tasks for the current user with optional filtering. **[Protected]**

**Query Parameters:**
| Parameter | Type | Values |
|-----------|------|--------|
| `search` | string | Task title or description |
| `status` | string | `pending`, `in-progress`, `completed` |
| `priority` | string | `low`, `medium`, `high` |
| `sort` | string | `due-date`, `priority` |

**Example:**
```
GET /tasks?status=pending&priority=high&search=important&sort=due-date
```

**Response (200):**
```json
{
  "status": "success",
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Important Task",
      "description": "Description here",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "tags": ["work", "urgent"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST /tasks
Create a new task. **[Protected]**

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "priority": "high",
  "status": "pending",
  "dueDate": "2024-12-31",
  "tags": ["work", "urgent"]
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    ...
  }
}
```

---

#### GET /tasks/:id
Get a single task. **[Protected]**

**Response (200):**
```json
{
  "status": "success",
  "data": {...}
}
```

---

#### PUT /tasks/:id
Update a task. **[Protected]**

**Request Body:** (any field can be updated)
```json
{
  "title": "Updated Title",
  "status": "in-progress"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {...}
}
```

---

#### DELETE /tasks/:id
Delete a task. **[Protected]**

**Response (200):**
```json
{
  "status": "success",
  "message": "Task deleted successfully"
}
```

---

#### GET /tasks/stats/summary
Get task statistics. **[Protected]**

**Response (200):**
```json
{
  "status": "success",
  "byStatus": [
    { "_id": "pending", "count": 5 },
    { "_id": "in-progress", "count": 2 },
    { "_id": "completed", "count": 8 }
  ],
  "byPriority": [
    { "_id": "low", "count": 3 },
    { "_id": "medium", "count": 7 },
    { "_id": "high", "count": 5 }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "message": "Email already in use"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Server-side error |

---

## Rate Limiting & Best Practices

- No built-in rate limiting (can be added with `express-rate-limit`)
- Keep token secure and never expose in logs
- Always validate input on the client and server
- Use HTTPS in production
- Implement token refresh for long sessions
