# Scalable Web App with Authentication & Dashboard

A full-stack web application built with **Next.js** (frontend) and **Node.js/Express** (backend), featuring secure authentication, JWT tokens, and a complete task management dashboard.

## 🚀 Features

### ✅ Authentication & Security
- **JWT-based authentication** with secure token management
- **bcryptjs** password hashing for enhanced security
- User registration and login with validation
- Token verification and refresh mechanisms
- Protected routes requiring authentication

### ✅ Dashboard & Task Management
- **Create, Read, Update, Delete** (CRUD) operations for tasks
- Advanced filtering by status, priority, and custom tags
- Task search functionality
- Task statistics dashboard
- Responsive, mobile-friendly UI

### ✅ User Profile Management
- View and update user profile information
- Change password functionality
- User profile display on dashboard

### ✅ Code Quality & Architecture
- Clean, modular code structure
- Scalable project organization
- Error handling and validation
- CORS configuration
- Environment variable management

---

## 📁 Project Structure

```
frontend/
├── app/                     # Next.js app directory
│   ├── (auth)/             # Auth routes (login, register)
│   ├── dashboard/          # Protected dashboard
│   └── layout.js
├── components/             # Reusable React components
├── contexts/               # Zustand stores (auth, tasks)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and API calls
├── styles/                 # CSS files
└── public/                 # Static assets

backend/
├── src/
│   ├── models/            # MongoDB schemas (User, Task)
│   ├── controllers/        # Route handlers (auth, tasks)
│   ├── routes/            # API routes
│   ├── middleware/        # Auth, error handling
│   ├── config/            # Database configuration
│   └── index.js           # Express server entry point
├── package.json
└── .env.example
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (React)
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Toast Notifications**: react-hot-toast
- **Date Formatting**: date-fns

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: validator.js

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend-intern
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and secrets
# MONGODB_URI=mongodb://localhost:27017/scalable-app
# JWT_SECRET=your-super-secret-key
# PORT=5000

# Start the server
npm run dev    # Development with nodemon
# or
npm start      # Production
```

Backend will be running at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Update API URL if different
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

Frontend will be running at `http://localhost:3000`

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "passwordConfirm": "securePassword123"
}

Response (201):
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "123456",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>

Response (200):
{
  "status": "success",
  "user": {...}
}
```

#### Update Profile
```http
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "bio": "Updated bio",
  "avatar": "url-to-avatar"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123",
  "newPasswordConfirm": "newPassword123"
}
```

### Task Management Endpoints

#### Get All Tasks (with filters)
```http
GET /api/tasks?status=pending&priority=high&search=task&sort=due-date
Authorization: Bearer <token>

Query Parameters:
- status: pending | in-progress | completed
- priority: low | medium | high
- search: search string
- sort: due-date | priority

Response (200):
{
  "status": "success",
  "count": 5,
  "data": [...]
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the scalable web app",
  "priority": "high",
  "status": "pending",
  "dueDate": "2024-12-31",
  "tags": ["work", "urgent"]
}

Response (201):
{
  "status": "success",
  "data": {...}
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "in-progress"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>

Response (200):
{
  "status": "success",
  "message": "Task deleted successfully"
}
```

#### Get Task Statistics
```http
GET /api/tasks/stats/summary
Authorization: Bearer <token>

Response (200):
{
  "status": "success",
  "byStatus": [
    { "_id": "pending", "count": 5 },
    { "_id": "completed", "count": 3 }
  ],
  "byPriority": [...]
}
```

---

## 🔐 Security Features

### Password Security
- Hashed with **bcryptjs** (10 salt rounds)
- Never transmitted or stored in plain text
- Validated on registration

### JWT Authentication
- Tokens expire after 7 days (configurable)
- Stored securely in localStorage
- Verified on each request with Bearer scheme
- Automatic token refresh on 401 errors

### API Security
- CORS configured for authorized origins
- Request validation and sanitization
- HTTP status codes and error messages
- MongoDB injection prevention via mongoose

### Best Practices
- Environment variables for secrets
- Password confirmation on registration
- Token verification before data access
- Authorization checks on protected resources

---

## 🚀 Scalability Considerations

### Frontend Scalability
1. **Component Structure**: Reusable, modular components for easy scaling
2. **State Management**: Zustand for lightweight, scalable state
3. **API Layer**: Centralized API calls in `lib/api.js` for easy modification
4. **Page Organization**: App router structure allows feature-based organization
5. **Performance**: Image optimization, code splitting with Next.js

### Backend Scalability
1. **Controller-Service Pattern**: Separation of concerns for maintainability
2. **Middleware Architecture**: Reusable, composable middleware
3. **Database Indexing**: Compound indexes on frequently queried fields
4. **Error Handling**: Centralized error handler for consistency
5. **CORS Configuration**: Ready for multi-origin deployments
6. **Environment Config**: Easy deployment across environments

### Database Scalability
1. **MongoDB Aggregation**: Stats computed efficiently
2. **Indexes**: Optimized queries with proper indexing
3. **Schema Design**: Flexible schema for adding features
4. **Connection Pooling**: Built into mongoose

### Deployment Ready
- Containerization: Ready for Docker/Kubernetes
- Load Balancing: Stateless backend for horizontal scaling
- CDN Compatible: Static assets fully optimizable
- Environment Agnostic: Works with any cloud provider

---

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/scalable-app
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📚 Postman Collection

Import the provided Postman collection to test all API endpoints:

1. Create a new workspace in Postman
2. Import `postman-collection.json`
3. Set environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: Your JWT token (obtained from login)
4. Test all endpoints

---

## 🧪 Testing the Application

### Register a New User
1. Go to http://localhost:3000/register
2. Fill in registration form
3. Click "Create Account"

### Login
1. Go to http://localhost:3000/login
2. Use registered credentials
3. Redirected to dashboard

### Create a Task
1. Click "+ New Task" button
2. Fill in task details
3. Submit form

### Manage Tasks
- **Edit**: Click "Edit" on any task card
- **Delete**: Click "Delete" to remove task
- **Filter**: Use filter panel to search/sort
- **View Stats**: Dashboard shows task statistics

---

## 📈 Production Deployment Guide

### Docker Deployment
```bash
# Backend
docker build -t scalable-backend ./backend
docker run -p 5000:5000 --env-file .env scalable-backend

# Frontend
docker build -t scalable-frontend ./frontend
docker run -p 3000:3000 scalable-frontend
```

### Cloud Deployment Options
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Heroku, Railway, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB

### Environment Configuration
1. Update `FRONTEND_URL` in backend
2. Update `NEXT_PUBLIC_API_URL` in frontend
3. Change `JWT_SECRET` to strong random string
4. Set `NODE_ENV=production`
5. Configure HTTPS
6. Set up database backups

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MongoDB is running
- Check `MONGODB_URI` in .env
- For MongoDB Atlas, whitelist your IP

### CORS Errors
- Ensure `FRONTEND_URL` matches your frontend domain
- Check browser console for detailed error

### Token Expiration
- Tokens automatically refresh on login
- Clear localStorage and re-login if issues persist

### Port Already in Use
- Backend: Change `PORT` in .env
- Frontend: Use `npm run dev -- -p 3001`

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

## 🤝 Contributing

This is a learning project. Feel free to fork and modify for your needs!

---

## 📞 Support

For issues or questions:
1. Check the API documentation above
2. Review error messages in browser console
3. Check backend logs for detailed errors

---

**Created for Scalable Web Application Development**
