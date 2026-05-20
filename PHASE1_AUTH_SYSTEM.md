# Phase 1 — Authentication System (Priority: CRITICAL 🔴)

> **Estimated Time:** 5-7 days
> **Why First:** Bina auth ke koi bhi multi-user feature kaam nahi karega

---

## 🔴 Current Problem

Server ka `auth.js` middleware mein:
```js
// Abhi aisa hai — GALAT:
req.user = { userId: 'user_mvp_1' }; // Hardcoded!
```

Matlab:
- Sirf ek user exist karta hai puri duniya mein
- Koi bhi API call karo — same user ka data milega
- Mobile app mein bhi no real login
- Website mein bhi koi login screen nahi hai

---

## 🟢 Target Architecture

```
User → Login/Register → JWT Token → API Calls (authenticated)
                           ↓
                    Server verifies JWT
                           ↓
                    req.user.userId = actual user
```

---

## 📋 Step-by-Step Implementation

### Step 1.1 — Server: Add Auth Endpoints

**File:** `server/routes/userRoutes.js` mein add karo:

```
POST /api/user/register  ← New account banana
POST /api/user/login     ← Login karna
POST /api/user/logout    ← Logout
GET  /api/user/me        ← Current user info
POST /api/user/refresh   ← Token refresh
```

**File:** `server/controllers/authController.js` (NEW FILE banana hai):

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
exports.register = async (req, res) => {
  const { email, password, displayName } = req.body;
  
  // 1. Check if email already exists
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already registered' });
  
  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // 3. Create user
  const userId = `user_${Date.now()}`; // Unique ID
  const user = await User.create({
    userId,
    email,
    password: hashedPassword,
    displayName: displayName || 'Productivity Warrior'
  });
  
  // 4. Generate JWT
  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.status(201).json({ token, user: sanitizeUser(user) });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
  
  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ token, user: sanitizeUser(user) });
};

// Helper - password nahi bhejo
const sanitizeUser = (user) => ({
  userId: user.userId,
  displayName: user.displayName,
  email: user.email,
  character: user.character,
  rpgStats: user.rpgStats,
  streak: user.streak
});
```

### Step 1.2 — Server: Update User Model

**File:** `server/models/User.js` mein add karo:

```javascript
// Ye fields add karo existing schema mein:
email: { 
  type: String, 
  required: true, 
  unique: true, 
  lowercase: true,
  trim: true
},
password: { 
  type: String, 
  required: true, 
  select: false  // Password kabhi auto-return na ho
},
```

### Step 1.3 — Server: Fix Auth Middleware

**File:** `server/middleware/auth.js` — Replace with REAL auth:

```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      error: { code: 'UNAUTHORIZED', message: 'Login karein pehle.' }
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, email }
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: { code: 'TOKEN_EXPIRED', message: 'Session expired. Dobara login karein.' }
    });
  }
};
```

### Step 1.4 — Server: Remove All Hardcoded User IDs

**Files to update:** ALL controllers mein `TEMP_USER_ID` ko `req.user.userId` se replace karo:
- `goalController.js`
- `gymController.js`
- `journalController.js`
- `memoryController.js`
- `pomodoroController.js`
- `rageController.js`
- `taskController.js`
- `userController.js`

**Example change:**
```javascript
// Before (WRONG):
const TEMP_USER_ID = 'user_mvp_1';
const tasks = await Task.find({ userId: TEMP_USER_ID });

// After (CORRECT):
const tasks = await Task.find({ userId: req.user.userId });
```

---

### Step 1.5 — Website: Add Login/Register Pages

**New Files to create:**
- `frontend/src/pages/auth/LoginPage.jsx`
- `frontend/src/pages/auth/RegisterPage.jsx`
- `frontend/src/contexts/AuthContext.jsx`
- `frontend/src/services/authService.js`

**AuthContext.jsx (Main Logic):**
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('pos_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token on load
      authService.getMe(token)
        .then(user => setUser(user))
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { token, user } = await authService.login(email, password);
    localStorage.setItem('pos_token', token);
    setToken(token);
    setUser(user);
  };

  const register = async (email, password, displayName) => {
    const { token, user } = await authService.register(email, password, displayName);
    localStorage.setItem('pos_token', token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('pos_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

**LoginPage.jsx (Design):**
- Dark theme with animated background
- Email + Password fields
- "Remember me" checkbox
- Link to Register page
- Error messages (invalid credentials, etc.)
- Loading state on button

**RegisterPage.jsx:**
- Email, Password, Confirm Password, Display Name
- Password strength indicator
- Terms acceptance
- Auto-login after register

### Step 1.6 — Website: Protect Routes

**App.jsx mein update:**
```javascript
// Protected Route component:
const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

// Routes update:
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/" element={<ProtectedRoute />}>
  <Route element={<MainLayout />}>
    <Route index element={<Dashboard />} />
    {/* ...rest of routes */}
  </Route>
</Route>
```

### Step 1.7 — Website: Add Token to API Calls

**`frontend/src/services/api.js` mein:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Automatically add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pos_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pos_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

### Step 1.8 — Mobile: Real Login Screen

**File:** `mobile_app/lib/features/auth/presentation/login_screen.dart` — Update with:
- Email + Password form with proper validation
- Form submission to `/api/user/login`
- Token store karna `flutter_secure_storage` mein
- Error handling (wrong password, network error)
- "Keep me logged in" functionality

**File:** `mobile_app/lib/core/network/dio_client.dart` — Update:
```dart
// Add token to all requests:
class AuthInterceptor extends Interceptor {
  final FlutterSecureStorage storage;
  
  @override
  void onRequest(options, handler) async {
    final token = await storage.read(key: 'auth_token');
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    return handler.next(options);
  }
  
  @override
  void onError(error, handler) async {
    if (error.response?.statusCode == 401) {
      // Token expired — logout
      await storage.delete(key: 'auth_token');
      // Navigate to login
    }
    return handler.next(error);
  }
}
```

---

## 🧪 Testing Plan

After implementation:
1. Register new user → should get token
2. Login → should get token
3. API call without token → should get 401
4. API call with token → should get data
5. Mobile login → token saved → app opens
6. Mobile + Web same user → same data

---

## ⚠️ Important Notes

- `JWT_SECRET` environment variable set karna na bhulo (server ka `.env`)
- Existing data (`user_mvp_1`) migrate karo ya fresh start karo
- Password minimum 8 characters, 1 uppercase enforce karo
- Rate limit login endpoint (brute force protection)

---

## 📂 Files to Create/Modify

### Create (NEW):
- `server/controllers/authController.js`
- `frontend/src/pages/auth/LoginPage.jsx`
- `frontend/src/pages/auth/RegisterPage.jsx`
- `frontend/src/contexts/AuthContext.jsx`
- `frontend/src/services/authService.js`

### Modify (EXISTING):
- `server/models/User.js` (add email, password fields)
- `server/middleware/auth.js` (real JWT verification)
- `server/routes/userRoutes.js` (add auth endpoints)
- `server/controllers/*.js` (remove hardcoded user ID)
- `frontend/src/App.jsx` (add auth routes)
- `frontend/src/services/api.js` (add token interceptors)
- `frontend/src/main.jsx` (wrap with AuthProvider)
- `mobile_app/lib/features/auth/data/auth_repository.dart`
- `mobile_app/lib/core/network/dio_client.dart`
