# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas account)
- Git

---

## Step 1: Clone & Navigate

```bash
cd frontend-intern
```

---

## Step 2: Download & Install MongoDB

### Option A: Local MongoDB
```bash
# Windows - Download from https://www.mongodb.com/try/download/community
# macOS
brew install mongodb-community

# Start MongoDB
# Windows: Run MongoDB from Start Menu
# macOS: brew services start mongodb-community
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string (replace username/password)

---

## Step 3: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
copy .env.example .env

# Edit .env with your MongoDB connection string:
# MONGODB_URI=mongodb://localhost:27017/scalable-app
# or for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# Start the server (runs on http://localhost:5000)
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: localhost
```

---

## Step 4: Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file (copy from .env.local.example)
copy .env.local.example .env.local

# Start development server (runs on http://localhost:3000)
npm run dev
```

**Expected Output:**
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

---

## Step 5: Test the Application

### In Your Browser:
1. **Home Page**: http://localhost:3000
2. **Register**: http://localhost:3000/register
   - Fill in details
   - Click "Create Account"
3. **Dashboard**: http://localhost:3000/dashboard
   - You're now logged in!
   - Click "+ New Task" to create a task

---

## Testing with Postman (Optional)

1. **Download Postman**: https://www.postman.com/downloads/
2. **Import Collection**:
   - Open Postman
   - Click "Import" in the top-left
   - Select `postman-collection.json` from the project root
3. **Set Variables**:
   - Go to "Environments" → "New"
   - Create variable `base_url` = `http://localhost:5000/api`
   - Create variable `token` = (empty, will be filled after login)
4. **Test Endpoints**:
   - Run "Register" endpoint first
   - Copy the token from response
   - Paste into `token` variable
   - Test other endpoints

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Make sure MongoDB is running
- Check connection string in .env
- For Atlas, whitelist your IP: https://docs.atlas.mongodb.com/ipaddress/

### Port Already in Use
```
Error: EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Find process on port 5000
lsof -i :5000  # macOS
netstat -ano | findstr :5000  # Windows

# Kill the process or change port in .env
PORT=5001
```

### CORS Errors in Browser
**Solution**:
- Check `FRONTEND_URL` in backend `.env`
- Should match your frontend URL (http://localhost:3000)

### Cannot Login
**Solution**:
- Check if backend is running
- Clear localStorage: Open DevTools → Application → Local Storage → Clear All
- Register a new account

---

## File Structure Quick Reference

```
frontend-intern/
├── backend/                # Express.js API
│   ├── src/
│   │   ├── controllers/   # Route logic
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API endpoints
│   │   └── middleware/    # Auth, error handling
│   └── package.json
│
├── frontend/              # Next.js app
│   ├── app/               # Pages and layouts
│   ├── components/        # Reusable components
│   ├── contexts/          # Zustand stores
│   ├── hooks/             # Custom hooks
│   └── package.json
│
├── README.md             # Full documentation
├── API_DOCUMENTATION.md  # API endpoint docs
└── postman-collection.json  # Postman tests
```

---

## Main Features to Try

1. **Authentication**
   - Register a new account
   - Login with credentials
   - View user profile
   - Logout

2. **Task Management**
   - ✅ Create task with title, description, priority
   - ✅ Edit task details
   - ✅ Delete task
   - ✅ Mark as completed
   - ✅ Filter by status/priority
   - ✅ Search tasks

3. **Dashboard**
   - View task statistics
   - See all tasks
   - Advanced filtering and sorting

---

## Next Steps

1. **Read Full Documentation**: `README.md`
2. **Explore API Docs**: `API_DOCUMENTATION.md`
3. **Review Scaling Strategy**: `SCALING_STRATEGY.md`
4. **Customize**:
   - Add more fields to tasks
   - Create user teams
   - Add task comments
   - Build mobile app

---

## Useful Commands

```bash
# Backend
cd backend
npm install              # Install dependencies
npm run dev             # Start with auto-reload
npm start               # Start production server
npm test                # Run tests (if added)

# Frontend
cd frontend
npm install
npm run dev             # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Check code quality

# Database
# MongoDB shell
mongosh
use scalable-app
db.users.find().pretty()

# Git (when ready to commit)
git init
git add .
git commit -m "Initial commit: Full-stack auth app"
```

---

## Environment Variables Explained

### Backend (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| MONGODB_URI | Database connection | mongodb://localhost:27017/scalable-app |
| PORT | Server port | 5000 |
| JWT_SECRET | Token encryption key | your-secret-key-change-this |
| JWT_EXPIRE | Token lifetime | 7d |
| FRONTEND_URL | CORS origin | http://localhost:3000 |

### Frontend (.env.local)
| Variable | Purpose | Example |
|----------|---------|---------|
| NEXT_PUBLIC_API_URL | Backend API endpoint | http://localhost:5000/api |

---

## Common Code Examples

### Register User (Frontend)
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    passwordConfirm: 'password123'
  })
});
const data = await response.json();
localStorage.setItem('token', data.token);
```

### Create Task (Frontend)
```javascript
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Task',
    description: 'Task description',
    priority: 'high',
    status: 'pending'
  })
});
```

---

## Performance Tips

- Keep browser DevTools open to monitor network requests
- Check Application → Local Storage to see stored data
- Use Postman to test API before frontend integration
- Clear cache if changes don't appear: Ctrl+Shift+Delete

---

## Need Help?

Check these in order:
1. **Terminal Output**: Read error messages carefully
2. **Browser Console**: F12 → Console tab
3. **Network Tab**: F12 → Network tab (check API responses)
4. **Documentation**: README.md or API_DOCUMENTATION.md
5. **Code Comments**: Check inline code documentation

---

**You're all set! Start building! 🎉**
