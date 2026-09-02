# Login Setup & Troubleshooting Guide

## Problem
You're getting a **401 Unauthorized** error when trying to login because the admin user (`fanteskorri36@gmail.com`) doesn't exist in MongoDB yet.

## Solution

### Step 1: Configure Backend Environment

Create or update `backend/.env` with your MongoDB connection details:

```env
PORT=1000
NODE_ENV=development

# Get your MongoDB URI from MongoDB Atlas or your MongoDB provider
# Format: mongodb+srv://username:password@cluster/database?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster/your-db?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-make-it-long-and-random
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-super-secret-refresh-key-also-long-random
JWT_REFRESH_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
```

### Step 2: Create the Admin User

Run this command from the `backend` directory:

```bash
cd backend
node setup-admin.js
```

**Expected output:**
```
✅ Connected to MongoDB
➡️ Setting up admin: fanteskorri36@gmail.com
🆕 Creating new admin user...
✅ Admin user created

📋 Final Status:
   Email: fanteskorri36@gmail.com
   Role: admin
   Login Test: ✅ PASS

🎉 Admin ready! Use these credentials to login:
   Email: fanteskorri36@gmail.com
   Password: fantes36
```

### Step 3: Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster.mongodb.net
🚀 Server running on port: 1000
```

### Step 4: Start the Frontend

In a new terminal (at the project root):

```bash
npm run dev
```

### Step 5: Test Login

1. Open `http://localhost:5173/login`
2. Enter credentials:
   - Email: `fanteskorri36@gmail.com`
   - Password: `fantes36`
3. You should be redirected to `/dashboard`

## If Login Still Fails

### Debug Check 1: Verify User in DB
```bash
# From backend directory
curl http://localhost:1000/api/debug/users
```
This will show all users and whether their passwords are set correctly.

### Debug Check 2: Test Login Endpoint Directly
```bash
curl -X POST http://localhost:1000/api/debug/login-test \
  -H "Content-Type: application/json" \
  -d '{"email":"fanteskorri36@gmail.com","password":"fantes36"}'
```

### Debug Check 3: Verify Environment Variables
Make sure `backend/.env` has:
- ✅ `MONGODB_URI` - valid MongoDB connection string
- ✅ `JWT_SECRET` - any random string at least 16 chars
- No empty values

## React Development Warnings (Minor)

You may see warnings about:
- `UNSAFE_componentWillMount` - This is from the `react-tsparticles` library, not our code
- React Router v7 future flags - Informational, no action needed
- These don't affect functionality

---

**Need help?** Check the backend logs for specific errors when running in development mode.
