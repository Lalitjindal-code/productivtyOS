# Phase 4 — Website + Mobile Real-Time Sync (Priority: MEDIUM 🟡)

> **Estimated Time:** 5-7 days
> **Dependencies:** Phase 1 (Auth) + Phase 3 (Mobile rebuild) must be done first

---

## 🎯 Goal

Website pe karo → Mobile pe dikh jaye (aur vice versa) — REAL TIME mein.

```
User on Website     User on Mobile
      |                   |
   Add Task            Sees new task appear 
      |                immediately without
   Complete task        refreshing!
      |
   Level up!
      ↓
   Mobile shows
   level-up notification
```

---

## 🔗 Sync Strategy

### Option A: Polling (Simple, Less Real-Time)
- Every 30 seconds, app server se data fetch karta hai
- Pros: Easy to implement
- Cons: 30 second delay, battery drain

### Option B: WebSockets (RECOMMENDED)
- Permanent connection between app and server
- Server pushes updates instantly
- Pros: Real-time, efficient
- Cons: More complex to implement

### Option C: Push Notifications for Triggers + Pull for Data
- Server sends FCM notification when important event happens
- App receives notification → pulls fresh data
- Pros: Battery efficient, reliable
- Cons: Small delay (2-5 seconds)

**We'll implement Option B (WebSocket) for web + Option C (FCM) for mobile**

---

## 🌐 Step 4.1 — Server: Add WebSocket Support

**Install:**
```bash
npm install socket.io
```

**File:** `server/index.js` — Update:
```javascript
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Room per user — sirf unka data unhe milega
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

io.on('connection', (socket) => {
  // User apne private room mein join karo
  socket.join(`user:${socket.userId}`);
  console.log(`User ${socket.userId} connected via WebSocket`);
  
  socket.on('disconnect', () => {
    console.log(`User ${socket.userId} disconnected`);
  });
});

// Export io so controllers can use it:
module.exports = { httpServer, io };
```

---

## 📡 Step 4.2 — Server: Emit Events on Data Changes

**Create:** `server/utils/eventEmitter.js`
```javascript
let _io;

const setIO = (io) => { _io = io; };

const emitToUser = (userId, event, data) => {
  if (_io) {
    _io.to(`user:${userId}`).emit(event, data);
  }
};

// Define all events:
const events = {
  TASK_CREATED: 'task:created',
  TASK_UPDATED: 'task:updated',
  TASK_COMPLETED: 'task:completed',
  GOAL_UPDATED: 'goal:updated',
  LEVEL_UP: 'user:level-up',
  ACHIEVEMENT_UNLOCKED: 'user:achievement',
  WORKOUT_LOGGED: 'gym:workout-logged',
  JOURNAL_SAVED: 'journal:saved',
  STREAK_UPDATED: 'user:streak',
};

module.exports = { setIO, emitToUser, events };
```

**Update controllers to emit events:**

```javascript
// In taskController.js - after task completion:
const { emitToUser, events } = require('../utils/eventEmitter');

exports.completeTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { 
    status: 'completed', 
    completedAt: new Date() 
  }, { new: true });
  
  // Emit to all devices of this user:
  emitToUser(req.user.userId, events.TASK_COMPLETED, {
    taskId: task._id,
    title: task.title,
    xpEarned: task.xpEarned
  });
  
  // If user leveled up, emit that too:
  const levelUp = await rpgService.awardXP(req.user.userId, task.xpEarned);
  if (levelUp) {
    emitToUser(req.user.userId, events.LEVEL_UP, levelUp);
  }
  
  res.json({ success: true, task });
};
```

---

## 💻 Step 4.3 — Website: Connect to WebSocket

**Install:**
```bash
# In frontend folder:
npm install socket.io-client
```

**File:** `frontend/src/services/socket.js` (NEW FILE)
```javascript
import { io } from 'socket.io-client';
import { queryClient } from '../App';

let socket = null;

export const connectSocket = (token) => {
  if (socket?.connected) return socket;
  
  socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', {
    auth: { token },
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
  });

  // Connection events:
  socket.on('connect', () => {
    console.log('WebSocket connected');
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });

  // Data events — invalidate React Query cache:
  socket.on('task:completed', (data) => {
    queryClient.invalidateQueries(['tasks']);
    queryClient.invalidateQueries(['stats']);
    // Show notification:
    showToast(`Task completed: ${data.title} (+${data.xpEarned} XP)`);
  });

  socket.on('task:created', () => {
    queryClient.invalidateQueries(['tasks']);
  });

  socket.on('user:level-up', (data) => {
    queryClient.invalidateQueries(['stats']);
    showLevelUpModal(data); // Epic animation!
  });

  socket.on('user:achievement', (data) => {
    showAchievementToast(data);
  });

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
```

**In AuthContext.jsx — Connect on login:**
```javascript
import { connectSocket, disconnectSocket } from '../services/socket';

const login = async (email, password) => {
  const { token, user } = await authService.login(email, password);
  localStorage.setItem('pos_token', token);
  setToken(token);
  setUser(user);
  connectSocket(token); // Connect WebSocket after login!
};

const logout = () => {
  disconnectSocket(); // Disconnect WebSocket on logout
  localStorage.removeItem('pos_token');
  setToken(null);
  setUser(null);
};
```

---

## 📱 Step 4.4 — Mobile: Push Notifications (FCM)

**Firebase setup already in `pubspec.yaml` — `firebase_messaging: ^16.2.2`**

**File:** `lib/features/notifications/notification_service.dart` — Complete:
```dart
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  static final _fcm = FirebaseMessaging.instance;
  static final _localNotifications = FlutterLocalNotificationsPlugin();
  
  static Future<void> initialize() async {
    // Request permissions
    await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
    
    // Get FCM token and send to server
    final token = await _fcm.getToken();
    if (token != null) {
      await _sendTokenToServer(token);
    }
    
    // Handle token refresh
    _fcm.onTokenRefresh.listen(_sendTokenToServer);
    
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
    
    // Handle background tap
    FirebaseMessaging.onMessageOpenedApp.listen(_handleMessageTap);
  }
  
  static void _handleForegroundMessage(RemoteMessage message) {
    final data = message.data;
    
    // Show local notification
    _localNotifications.show(
      message.hashCode,
      message.notification?.title ?? 'ProductivityOS',
      message.notification?.body,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'main_channel',
          'Main Notifications',
          importance: Importance.high,
        ),
      ),
    );
    
    // Refresh relevant data
    switch (data['type']) {
      case 'task_completed':
        // Invalidate tasks provider
        break;
      case 'level_up':
        // Show level-up screen
        break;
      case 'focus_lock':
        // Activate focus shield
        break;
    }
  }
}
```

**Server:** `server/services/notificationService.js` — Update to send real FCM:
```javascript
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

const sendPushNotification = async (fcmToken, title, body, data = {}) => {
  try {
    // FCM v1 API
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/firebase.messaging']
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    await axios.post(
      `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`,
      {
        message: {
          token: fcmToken,
          notification: { title, body },
          data: { ...data, type: data.type || 'general' },
          android: {
            priority: 'high',
            notification: {
              channel_id: 'main_channel',
              sound: 'default'
            }
          }
        }
      },
      {
        headers: { Authorization: `Bearer ${accessToken.token}` }
      }
    );
  } catch (err) {
    console.error('FCM send failed:', err.message);
  }
};

exports.sendTaskComplete = async (userId, task) => {
  const user = await User.findOne({ userId });
  if (!user?.fcmToken) return;
  await sendPushNotification(
    user.fcmToken,
    '✅ Task Complete!',
    `${task.title} — +${task.xpEarned} XP earned`,
    { type: 'task_completed', taskId: task._id }
  );
};

exports.sendLevelUp = async (userId, newLevel) => {
  const user = await User.findOne({ userId });
  if (!user?.fcmToken) return;
  await sendPushNotification(
    user.fcmToken,
    '🎮 LEVEL UP!',
    `You reached Level ${newLevel}! New powers unlocked.`,
    { type: 'level_up', level: newLevel.toString() }
  );
};

exports.sendStreakReminder = async (userId, streak) => {
  const user = await User.findOne({ userId });
  if (!user?.fcmToken) return;
  await sendPushNotification(
    user.fcmToken,
    '🔥 Don\'t break your streak!',
    `You're on a ${streak} day streak. Complete a task today!`,
    { type: 'streak_reminder' }
  );
};
```

---

## 🔄 Step 4.5 — Data Sync Strategy

### What syncs in real-time:
| Event | Website | Mobile |
|-------|---------|--------|
| Task create/complete | WebSocket update | FCM notification |
| Workout logged | WebSocket update | FCM notification |
| Goal progress | WebSocket update | FCM notification |
| Level up | WebSocket + animation | FCM + local notification |
| Journal save | WebSocket | Silent FCM |
| Streak update | WebSocket | FCM reminder |

### Mobile Offline Sync:
```dart
// In SyncService - process queued actions when back online:
void _listenForConnectivity() {
  Connectivity().onConnectivityChanged.listen((results) {
    final isOnline = results.contains(ConnectivityResult.mobile) || 
                     results.contains(ConnectivityResult.wifi);
    if (isOnline) {
      processSyncQueue(); // Send all pending offline actions
    }
  });
}
```

---

## 🌐 Step 4.6 — Cross-Device "Focus Lock" Feature

**Unique Feature:** Website se mobile pe focus mode lock karo!

**Flow:**
1. User website pe task start karta hai
2. Click "Focus on Mobile" button
3. Server FCM notification bhejta hai mobile ko
4. Mobile app automatically focus mode mein chala jaata hai
5. All distracting apps blocked ho jaate hain

**Website button (in Timer.jsx):**
```jsx
const handleFocusOnMobile = async () => {
  await api.post('/user/trigger-mobile-focus', { 
    taskTitle: currentTask?.title || 'Focus Session' 
  });
  toast.success('📱 Mobile focus mode activated!');
};
```

**Mobile handler (in NotificationService):**
```dart
case 'focus_lock':
  // Navigate to focus screen and start timer:
  _router.go('/focus', extra: { 
    'taskTitle': message.data['taskTitle'],
    'autoStart': true 
  });
  break;
```

---

## 🔐 Step 4.7 — Settings Sync

**Goal:** Website pe settings change karo → Mobile pe bhi change ho

```javascript
// Server: settings update ho to WebSocket emit karo
socket.on('user:settings-updated', (data) => {
  // Apply settings:
  if (data.pomodoro) updatePomodoroSettings(data.pomodoro);
  if (data.theme) applyTheme(data.theme);
});
```

```dart
// Mobile: settings update WebSocket/FCM se receive karo
// Ye background service se handle hoga
```

---

## 📊 Expected Result After Phase 4

- Website pe task complete karo → Mobile pe 2 second mein notification aaye
- Mobile pe workout log karo → Website dashboard real-time update ho
- Level up on mobile → Website pe XP bar animate ho
- No manual refresh needed anywhere
- Seamless experience across devices
