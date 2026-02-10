# Project Overview & Architecture

## 🎯 Project Goals
✅ Build a **fully functional Authentication System** with JWT tokens and bcrypt encryption
✅ Create a **Responsive Dashboard** with task management capabilities
✅ Implement **CRUD Operations** (Create, Read, Update, Delete)
✅ Establish **Secure Backend API** with validation and error handling
✅ Design **Production-Ready Architecture** that scales horizontally

---

## 📊 Architecture Diagram

### Technology Stack Interaction
```
┌──────────────────────────────────────────────────────────┐
│                       FRONTEND (Next.js)                 │
│  Components: Forms, Cards, Filters, Modals, Navigation  │
│  State: Zustand (Auth & Task Stores)                   │
│  Styling: TailwindCSS (Responsive Design)               │
│  API: Axios (with Bearer Token)                         │
└─────────────────────────┬────────────────────────────────┘
                          │ HTTP/REST
                          │ JWT Tokens
┌─────────────────────────┴────────────────────────────────┐
│                    BACKEND (Express.js)                  │
│  Routes: /api/auth/* and /api/tasks/*                  │
│  Middleware: JWT Protection, CORS, Error Handling      │
│  Controllers: Business Logic & Validation              │
│  Models: User & Task Schemas with Methods              │
└─────────────────────────┬────────────────────────────────┘
                          │ MongoDB Wire
                          │ Protocol
┌─────────────────────────┴────────────────────────────────┐
│                    DATABASE (MongoDB)                    │
│  Collections: users, tasks                             │
│  Indexes: userId, email, createdAt                     │
│  Authentication: Connection String URI                  │
└──────────────────────────────────────────────────────────┘
```

---

## 🔄 Authentication Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │ Submit Credentials
       ▼
┌──────────────────────────┐
│   Frontend Auth Form     │
│  (Register / Login)      │
└──────┬───────────────────┘
       │ POST /api/auth/register or /api/auth/login
       │ { email, password, ... }
       ▼
┌──────────────────────────┐
│   Backend Auth Route     │
│  (Validation & Hashing)  │
└──────┬───────────────────┘
       │ Check in MongoDB
       ▼
┌──────────────────────────┐
│   Password Verification  │
│  (bcryptjs.compare)      │
└──────┬───────────────────┘
       │ Generate JWT Token
       ▼
┌──────────────────────────┐
│   Return Token & User    │
└──────┬───────────────────┘
       │ Save to localStorage
       ▼
┌──────────────────────────┐
│   Protected Dashboard    │
│  (Token in Headers)      │
└──────────────────────────┘
```

---

## 📋 API Request/Response Flow

### Example: Creating a Task
```
FRONTEND:
  const token = localStorage.getItem('token')
  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, ... })
  })

BACKEND:
  1. Extract token from Authorization header
  2. Verify JWT signature with JWT_SECRET
  3. Decode token to get userId
  4. Validate request body
  5. Create task with userId
  6. Return task object (201 Created)

FRONTEND:
  1. Receive response
  2. Add task to Zustand store
  3. Update UI with new task
  4. Show success toast notification
```

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required, min 3 chars),
  email: String (required, unique, valid email),
  password: String (hashed, 6+ chars),
  bio: String (max 500 chars),
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email`: Unique index for fast lookups

### Task Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  title: String (required, 3-100 chars),
  description: String (max 1000 chars),
  status: Enum ['pending', 'in-progress', 'completed'],
  priority: Enum ['low', 'medium', 'high'],
  dueDate: Date,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ userId: 1, createdAt: -1 }`: Compound index for user's tasks
- `userId`: For ownership verification

---

## 🔐 Security Features

### Password Security
```
User Input: "password123"
         ↓
    bcryptjs.hash(password, 10)
         ↓
$2b$10$1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNO
         ↓
    Stored in Database
```

### JWT Token Structure
```
Header.Payload.Signature

Header: { "alg": "HS256", "typ": "JWT" }
Payload: { "id": "userId", "iat": 1234567890, "exp": 1234654290 }
Signature: HMACSHA256(header.payload, JWT_SECRET)
```

### Authorization Check
```javascript
// All protected routes:
Authorization: Bearer <token>
  ↓
Extract token from header
  ↓
jwt.verify(token, JWT_SECRET)
  ↓
Verify signature & expiration
  ↓
Get userId from decoded payload
  ↓
req.user = { id: userId }
  ↓
Proceed to route handler
```

---

## 🎨 Frontend Architecture

### Component Hierarchy
```
Layout (RootLayout)
├── Home Page
│   ├── Navbar
│   └── Feature Cards
├── Auth Pages
│   ├── Login Page
│   │   ├── Navbar
│   │   └── LoginForm
│   └── Register Page
│       ├── Navbar
│       └── RegisterForm
└── Dashboard Page
    ├── DashboardNavbar
    ├── TaskStats (Cards showing counts)
    ├── TaskFilters (Search/Filter Panel)
    └── TaskCard (List of tasks)
        ├── Edit Button → Modal
        └── Delete Button
    
Modal Component
└── TaskForm (For create/edit)
```

### State Management (Zustand)
```
authStore:
  ├── user: User data from server
  ├── token: JWT token
  ├── isAuthenticated: Boolean flag
  ├── login(credentials) → API call
  ├── register(data) → API call
  ├── logout() → Clear localStorage
  └── updateProfile(data) → API call

taskStore:
  ├── tasks: Array of task objects
  ├── filters: { status, priority, search, sort }
  ├── fetchTasks() → API call with filters
  ├── createTask(data) → API call
  ├── updateTask(id, data) → API call
  └── deleteTask(id) → API call
```

---

## 🚀 Deployment Architecture

### Single Server (Phase 1)
```
Server (Heroku/Railway)
├── Node.js + Express
└── MongoDB Atlas
```

### Scaled Architecture (Phase 2+)
```
CDN (Cloudflare)
    ↓
Load Balancer (ALB)
    ↓
┌───────────┬───────────┬───────────┐
│ App Pod 1 │ App Pod 2 │ App Pod 3 │ (Kubernetes)
└───────────┴───────────┴───────────┘
    ↓
MongoDB Cluster (Sharded)
    ↓
Redis Cache (Session Store)
```

---

## 📈 Key Metrics

### Performance
- Page Load Time: < 2 seconds
- API Response Time: < 200ms
- Lighthouse Score: > 90
- SEO Score: Optimized

### Scalability
- Handle 10,000+ concurrent users
- Process 1000+ requests/second
- Database queries < 50ms

### Reliability
- 99.9% uptime
- Automated backups
- Disaster recovery plan

---

## 📝 Data Flow Examples

### User Workflow: Registration
```
1. User fills registration form
2. Frontend validates input (client-side)
3. POST /api/auth/register with { name, email, password, passwordConfirm }
4. Backend validates input (server-side)
5. Hash password with bcryptjs (10 rounds, takes ~100ms)
6. Check if email already exists in MongoDB
7. Create user document in MongoDB
8. Generate JWT token (expires in 7 days)
9. Return token and user data
10. Frontend stores token in localStorage
11. Frontend redirects to dashboard
12. Dashboard component loads authenticated state
```

### User Workflow: Create Task
```
1. User clicks "+ New Task" button
2. Modal opens with TaskForm component
3. User fills task details
4. Frontend validates form (client-side)
5. User clicks "Create Task"
6. POST /api/tasks with task data and Bearer token
7. Backend middleware extracts and verifies JWT
8. Backend validates task data (server-side)
9. Create task document with current userId
10. Return created task object
11. Frontend adds task to Zustand store
12. UI updates to show new task
13. Toast notification shows "Task created!"
```

### User Workflow: Filter Tasks
```
1. User selects filter options (status, priority, etc.)
2. Frontend calls setFilters() in Zustand
3. useEffect detects filter change
4. GET /api/tasks?status=pending&priority=high with Bearer token
5. Backend uses MongoDB query operators
6. Returns matching tasks array
7. Frontend updates store with new tasks
8. UI re-renders with filtered list
```

---

## 🔧 Development Workflow

### Making Changes
```
1. Make code changes in frontend/backend
2. Frontend: Changes auto-reload (Next.js HMR)
3. Backend: Changes auto-reload (nodemon)
4. Test in browser/Postman
5. Check browser console and network tab
6. Check backend terminal logs
```

### Adding New Feature (e.g., Task Comments)
```
BACKEND:
  1. Create Comment model/schema
  2. Create comment routes (/api/comments)
  3. Create comment controller
  4. Add middleware for auth
  5. Test with Postman

FRONTEND:
  1. Create CommentForm component
  2. Create useComments hook
  3. Add comment store to Zustand
  4. Create Comment API calls
  5. Integrate components into TaskDetail page
  6. Test in browser
```

---

## 🎯 Key Files & Their Purpose

### Backend Key Files
| File | Purpose |
|------|---------|
| `src/index.js` | Express server setup, middleware config |
| `src/models/User.js` | User schema with password hashing |
| `src/models/Task.js` | Task schema with indexes |
| `src/controllers/authController.js` | Auth logic (register, login, etc.) |
| `src/controllers/taskController.js` | Task CRUD logic |
| `src/middleware/auth.js` | JWT verification middleware |
| `src/routes/authRoutes.js` | Auth endpoints |
| `src/routes/taskRoutes.js` | Task endpoints |
| `.env` | Configuration values |

### Frontend Key Files
| File | Purpose |
|------|---------|
| `app/layout.js` | Root layout wrapper |
| `app/page.js` | Home page |
| `app/(auth)/login/page.js` | Login page |
| `app/dashboard/page.js` | Protected dashboard |
| `contexts/authStore.js` | Auth state management |
| `contexts/taskStore.js` | Task state management |
| `components/TaskForm.jsx` | Task form component |
| `lib/api.js` | Axios instance with interceptors |
| `hooks/useAuth.js` | Auth custom hook |

---

## ✅ Features Implementation Status

| Feature | Status | Location |
|---------|--------|----------|
| User Registration | ✅ Done | Backend + Frontend |
| User Login | ✅ Done | Backend + Frontend |
| JWT Authentication | ✅ Done | Backend middleware |
| Password Hashing | ✅ Done | User model |
| Protected Routes | ✅ Done | Dashboard page |
| Profile Management | ✅ Done | Auth routes |
| Create Task | ✅ Done | Backend + Frontend |
| Read Tasks | ✅ Done | Backend + Frontend |
| Update Task | ✅ Done | Backend + Frontend |
| Delete Task | ✅ Done | Backend + Frontend |
| Task Filtering | ✅ Done | Backend + Frontend |
| Task Search | ✅ Done | Backend + Frontend |
| Task Statistics | ✅ Done | Backend + Frontend |
| Responsive UI | ✅ Done | TailwindCSS |
| Error Handling | ✅ Done | Backend + Frontend |

---

## 🚀 Next Steps for Enhancement

1. **Add Email Notifications**
   - Send welcome email on registration
   - Task reminder emails

2. **Implement Task Comments**
   - Add comment model
   - Comment routes
   - Comment UI components

3. **Add Team Collaboration**
   - Share tasks with other users
   - Real-time updates with WebSockets

4. **Mobile App**
   - React Native version
   - iOS/Android apps

5. **Advanced Features**
   - Recurring tasks
   - Time tracking
   - Analytics dashboard
   - Export to PDF

---

This architecture ensures the application is **secure, scalable, maintainable, and ready for production deployment**.
