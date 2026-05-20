# Phase 6 — Production Ready (Priority: LOW-MEDIUM 🟢)

> **Estimated Time:** 5-7 days
> **When to do:** Sab features implement hone ke baad

---

## 🚀 Production Readiness Checklist

### 6.1 — Server: Performance & Security

#### Fix Redis Connection (Important)

**Problem:** Redis connection fail hone pe server crash ho sakta hai
**Current code:** Redis connect na ho to bhi graceful degradation ho

```javascript
// server/config/redis.js — Update:
const { createClient } = require('redis');

let client = null;
let isConnected = false;

const getClient = async () => {
  if (client && isConnected) return client;
  
  client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  
  client.on('connect', () => { 
    isConnected = true;
    console.log('✅ Redis connected');
  });
  
  client.on('error', (err) => {
    isConnected = false;
    console.error('Redis error:', err.message);
    // Don't crash — just log
  });
  
  try {
    await client.connect();
  } catch (err) {
    console.error('Redis connection failed — proceeding without cache');
    client = null;
  }
  
  return client;
};

// Safe get/set with fallback:
module.exports = {
  async get(key) {
    const c = await getClient();
    if (!c) return null;
    try {
      const value = await c.get(key);
      return value ? JSON.parse(value) : null;
    } catch { return null; }
  },
  async set(key, value, options = {}) {
    const c = await getClient();
    if (!c) return false;
    try {
      await c.set(key, JSON.stringify(value), options);
      return true;
    } catch { return false; }
  }
};
```

#### Add Rate Limiting Globally

```javascript
// server/app.js — Add:
const rateLimit = require('express-rate-limit');

const generalLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                   // 200 requests per window
  message: { error: 'Too many requests, please slow down' }
});

const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,  // 10 login attempts per 15 min
  message: { error: 'Too many login attempts' }
});

app.use('/api/', generalLimit);
app.use('/api/user/login', authLimit);
app.use('/api/user/register', authLimit);
```

#### Add Input Validation

```javascript
// Use express-validator (already installed) in ALL routes:
const { body, validationResult } = require('express-validator');

// Example - Create Task validation:
router.post('/', [
  body('title').trim().notEmpty().isLength({ max: 200 }).withMessage('Title required, max 200 chars'),
  body('priority').isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority'),
  body('category').optional().trim().isLength({ max: 50 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  // ...proceed
});
```

#### Add Request Logging

```javascript
// server/middleware/logger.js (NEW):
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

module.exports = logger;

// Use in app.js:
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userId: req.user?.userId
  });
  next();
});
```

#### Add `start` Script to package.json

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  }
}
```

---

### 6.2 — Frontend: Build Optimization

#### Code Splitting

**`vite.config.js` update:**
```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          tanstack: ['@tanstack/react-query'],
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});
```

#### Lazy Load Pages

**`App.jsx` update:**
```javascript
// Lazy load all pages — faster initial load:
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const Goals = React.lazy(() => import('./pages/Goals'));
const Gym = React.lazy(() => import('./pages/Gym'));
const Journal = React.lazy(() => import('./pages/Journal'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Timer = React.lazy(() => import('./pages/Timer'));
const Character = React.lazy(() => import('./pages/Character'));
const Settings = React.lazy(() => import('./pages/Settings'));
const WallOfShame = React.lazy(() => import('./pages/WallOfShame'));

// Wrap routes:
<Suspense fallback={<PageLoadingSpinner />}>
  <Routes>
    {/* ...routes */}
  </Routes>
</Suspense>
```

#### Environment Variables Check

**`frontend/.env.example` update:**
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=ProductivityOS
```

**`frontend/.env` (for production):**
```
VITE_API_URL=https://your-backend.render.com/api
VITE_SOCKET_URL=https://your-backend.render.com
```

#### Add Error Boundary

```jsx
// frontend/src/components/common/ErrorBoundary.jsx (NEW):
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-surface">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="text-xl font-bold text-white mb-2">System Crash Detected</h2>
          <p className="text-neutral-400 mb-6">{this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-500 text-black font-bold rounded-xl"
          >
            Restart System
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

### 6.3 — Mobile: Performance

#### Fix Memory Leaks

```dart
// Always dispose controllers, animations, timers:
@override
void dispose() {
  _timerController.dispose();
  _pulseController.dispose();
  _searchDebounce?.cancel();
  super.dispose();
}
```

#### Optimize Images

```dart
// Use CachedNetworkImage everywhere:
CachedNetworkImage(
  imageUrl: user.avatarUrl,
  placeholder: (context, url) => CircleAvatar(child: Icon(Icons.person)),
  errorWidget: (context, url, error) => CircleAvatar(
    child: Text(user.displayName[0].toUpperCase()),
  ),
)
```

#### Reduce Build Rebuilds

```dart
// Use Select to listen to specific parts of state:
// Instead of:
ref.watch(userProvider) // Rebuilds on ANY user change

// Use:
final userName = ref.watch(userProvider.select((u) => u.displayName));
// Only rebuilds when displayName changes
```

---

### 6.4 — Deployment Setup

#### Server (Render.com)

**`render.yaml` (NEW — root folder mein):**
```yaml
services:
  - type: web
    name: productivityos-server
    env: node
    rootDir: server
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGO_URI
        fromDatabase:
          name: productivityos-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: REDIS_URL
        fromService:
          name: productivityos-redis
          property: connectionString
  
  - type: redis
    name: productivityos-redis
    maxmemoryPolicy: allkeys-lru
    plan: free
```

#### Frontend (Vercel)

**`vercel.json` in frontend folder:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "env": {
    "VITE_API_URL": "@api_url",
    "VITE_SOCKET_URL": "@socket_url"
  }
}
```

**Build command:** `npm run build`
**Output dir:** `dist`

#### Mobile (Google Play / App Store)

**Android:**
1. `flutter build apk --release` — Testing ke liye
2. `flutter build appbundle --release` — Play Store ke liye
3. Sign with keystore
4. Submit to Play Store (internal testing first)

**iOS (future):**
1. MacOS needed for iOS build
2. Apple Developer account needed ($99/year)
3. `flutter build ipa`

---

### 6.5 — Monitoring

#### Sentry Error Tracking

**Server:**
```bash
npm install @sentry/node
```
```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

**Frontend:**
```bash
npm install @sentry/react
```
```javascript
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1
});
```

**Flutter:**
```yaml
sentry_flutter: ^9.1.0
```
```dart
await SentryFlutter.init((options) {
  options.dsn = 'YOUR_SENTRY_DSN';
}, appRunner: () => runApp(MyApp()));
```

#### Health Check Dashboard

**Server — Add comprehensive health check:**
```javascript
app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: dbStatus,
      redis: await checkRedis(),
      ai: process.env.GROQ_API_KEY ? 'configured' : 'missing'
    },
    uptime: process.uptime()
  });
});
```

---

### 6.6 — Environment Variables Complete List

**`server/.env` (full list):**
```env
# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/productivityos

# Auth
JWT_SECRET=your_very_long_random_secret_here_min_64_chars

# Redis
REDIS_URL=redis://localhost:6379

# AI Services
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key

# Firebase (for push notifications)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email (for weekly reports)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password

# Monitoring
SENTRY_DSN=https://...@sentry.io/...
```

**`frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_SENTRY_DSN=https://...
```

---

## ✅ Production Launch Checklist

- [ ] Auth system fully working (Phase 1 ✓)
- [ ] All website bugs fixed (Phase 2 ✓)
- [ ] Mobile app rebuilt (Phase 3 ✓)
- [ ] Web-Mobile sync working (Phase 4 ✓)
- [ ] Key new features added (Phase 5 partial ✓)
- [ ] Rate limiting on all endpoints
- [ ] Input validation on all endpoints
- [ ] Error boundary on website
- [ ] Sentry error tracking
- [ ] Environment variables set in production
- [ ] HTTPS everywhere
- [ ] Mobile app signed and ready
- [ ] Database indexes added for performance
- [ ] Load tested (at least 100 concurrent users)
- [ ] Backup strategy for MongoDB

---

## 🗄️ Database Indexes (Performance)

```javascript
// Add to each model:
// Task.js:
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });
taskSchema.index({ userId: 1, dueDate: 1 });

// User.js:
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ userId: 1 }, { unique: true });

// Journal.js:
journalSchema.index({ userId: 1, date: -1 });

// PomodoroSession.js:
pomodoroSchema.index({ userId: 1, completedAt: -1 });

// Workout.js:
workoutSchema.index({ userId: 1, date: -1 });
```
