# ProductivityOS Mobile App — PRD + TRD
## Version 1.0 | Flutter App — Full System Integration

---

# PART 1: PRODUCT REQUIREMENTS DOCUMENT (PRD)

---

## 1. Executive Summary

ProductivityOS Mobile App ek Flutter-based Android/iOS application hai jo web dashboard ka mobile extension hai. Yeh app primarily do kaam karta hai: (1) time-based distraction blocking with task popups, aur (2) web dashboard ka mobile mirror jahan se user tasks, gym, journal sab manage kar sake. Dono platforms ek shared backend se connected hain — real-time sync hota hai.

## 2. Mobile App ka Core Purpose (Web se Different Kyun)

| Feature | Web Dashboard | Mobile App |
|---------|--------------|------------|
| Primary use | Deep work, planning, analytics | Quick actions, blocking, on-the-go |
| Task management | Full CRUD | Quick add + complete |
| AI features | Full access | Chat + quick quiz |
| Unique feature | DNA report, calendar | APP BLOCKING + task popup overlay |
| Gym logging | Full session | Quick log during workout |
| Journal | Full entry | Quick mood + 3 lines |
| Notifications | Browser only | Native push + local alarms |

## 3. Features — Mobile Specific

### Feature 1: Focus Shield (App Blocking)
**Core unique feature — sirf mobile pe possible**

Flow:
1. User sets "Focus Schedule" — e.g. 9am-11am weekdays
2. At schedule start → Focus Shield activates
3. Background service constantly checks foreground app
4. If blocked app detected (Instagram, YouTube, etc.) → Full screen overlay appears
5. Overlay shows current task — cannot be dismissed without acknowledging
6. Emergency override: hold 5 seconds + PIN → 30 min bypass (logged)
7. Schedule ends → apps automatically unblocked
8. All override usage visible in web analytics

Blocked apps management:
- User picks apps from installed apps list
- Preset packs: Social Media Pack, Entertainment Pack, Gaming Pack
- Custom individual app blocking
- Different block lists for different schedules

Overlay screen shows:
- Current top priority task (from web dashboard)
- Task description
- Pomodoro timer (starts automatically)
- "I'm Working On It" button to dismiss overlay temporarily (5 min grace)
- Motivational quote from AI

### Feature 2: Home Screen Widget
- Shows today's tasks (top 3 by priority)
- Streak counter with fire emoji
- Current XP + level
- One-tap task complete
- Updates every 15 minutes from backend
- 2 sizes: 2x2 (streak + top task) and 4x2 (task list)

### Feature 3: Smart Notifications
- Morning briefing (configurable time): "Aaj ke X tasks ready hain. Streak: Y days"
- Task deadline approaching: 1 hour before
- Streak at risk: if no task completed by 8pm
- Achievement unlocked: instant
- Pomodoro end: sound + vibration
- Focus time starting: 5 min warning
- Weekly insight ready: Sunday evening
- All notifications: deep link to relevant app screen

### Feature 4: Quick Capture
- Floating action button on home screen
- Tap → add task in under 10 seconds
- Voice input: speak task title
- Auto-categorize using AI (Groq)
- Set reminder with natural language: "remind me tomorrow 9am"
- Syncs to web dashboard immediately

### Feature 5: Gym Mode
- Dedicated gym screen optimized for sweaty hands
- Large buttons, high contrast
- Auto-starts rest timer after each set
- Previous session reference while logging
- Quick PR detection with celebration
- Offline capable — syncs when connected

### Feature 6: Offline Mode
- Core features work without internet
- Tasks, journal, gym logs cached locally (SQLite via drift package)
- Sync queue: all offline actions queued
- On reconnect → sync queue processed in order
- Conflict resolution: last-write-wins with timestamp
- Sync status indicator in app header

## 4. Screen Structure

```
BOTTOM NAVIGATION (5 tabs):
  Home | Tasks | Focus | Gym | Profile

HOME SCREEN:
  - Streak + XP bar header
  - Today's tasks (swipeable)
  - Active focus schedule status
  - Quick stats (3 cards)
  - Recent achievement
  - AI tip of the day

TASKS SCREEN:
  - Filter tabs (Today / All / Goals)
  - Task list (same data as web)
  - FAB: quick add task
  - Swipe right: complete | Swipe left: options

FOCUS SCREEN:
  - Focus Shield ON/OFF toggle
  - Schedule manager (add/edit/delete schedules)
  - Blocked apps manager
  - Today's focus stats (hours blocked, overrides used)
  - Active session countdown

GYM SCREEN:
  - Log new session button
  - Recent sessions list
  - Weekly volume graph
  - PR board (top 5 recent PRs)
  - Quick exercises (favorites)

PROFILE SCREEN:
  - RPG character display (3D orb)
  - Stats bars
  - Achievements
  - Settings
  - Sync status
  - Logout
```

## 5. Connection to Web Dashboard

### Real-time Sync Architecture
```
Mobile App ←→ REST API ←→ MongoDB
     ↓                        ↑
Local SQLite              Web Dashboard
(offline cache)           (same backend)
```

### What Syncs:
- Tasks: Created/completed/failed on either platform → synced instantly
- Journal: Entries from mobile appear on web within 30 seconds
- Gym: Sessions logged on phone appear on web
- Streak: Calculated on server — both show same value
- XP/Level: Server is source of truth — mobile reads it
- AI Memory: Generated on server — mobile reads insights
- Focus stats: Mobile reports blocking events → web analytics shows them
- Notifications: Web can trigger mobile push (future: web dashboard reminder → phone notification)

### Sync Strategy:
- Online: All writes go directly to API, local cache updated
- Offline: Writes go to local SQLite queue, API called on reconnect
- Conflict: Server timestamp wins; user notified if conflict detected

## 6. Non-Functional Requirements

- App size: < 30MB initial download
- Cold start time: < 2 seconds
- Notification delivery: < 5 seconds from trigger
- Offline sync: < 10 seconds after reconnect
- Battery: Background service < 2% battery per hour
- Permissions requested only when needed (progressive permission)
- Android minimum: API 26 (Android 8.0)
- iOS minimum: iOS 14

---

# PART 2: TECHNICAL REQUIREMENTS DOCUMENT (TRD)

---

## 1. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Flutter | 3.19+ | Cross-platform UI |
| Language | Dart | 3.3+ | App logic |
| State Management | Riverpod | 2.5+ | App-wide state |
| Local DB | Drift (SQLite) | 2.18+ | Offline storage |
| HTTP Client | Dio | 5.4+ | API calls + interceptors |
| Notifications | flutter_local_notifications | 17+ | Local alarms |
| Push Notifications | firebase_messaging | 15+ | Server-triggered push |
| Background Service | flutter_background_service | 5+ | Focus Shield daemon |
| App Usage | usage_stats | 1.0+ | Android foreground detection |
| Overlay | system_alert_window | 0.4+ | Task popup over other apps |
| Workmanager | workmanager | 0.5+ | Scheduled background tasks |
| Widget | home_widget | 0.6+ | Home screen widget |
| Secure Storage | flutter_secure_storage | 9+ | JWT token storage |
| Connectivity | connectivity_plus | 6+ | Network status |
| Voice | speech_to_text | 6+ | Voice task input |
| Analytics | firebase_analytics | 11+ | Usage tracking |
| Crash Reporting | firebase_crashlytics | 4+ | Error monitoring |
| Animations | flutter_animate | 4+ | UI animations |
| Charts | fl_chart | 0.68+ | Gym + analytics graphs |
| 3D/Lottie | lottie | 3+ | Achievement animations |
| Deep Links | go_router | 13+ | Navigation + deep links |

## 2. Project Structure

```
lib/
├── main.dart                    # App entry point
├── app.dart                     # MaterialApp, theme, routing
├── core/
│   ├── constants/
│   │   ├── api_constants.dart   # Base URL, endpoint paths
│   │   ├── app_constants.dart   # App-wide constants
│   │   └── storage_keys.dart    # SharedPrefs + SecureStorage keys
│   ├── theme/
│   │   ├── app_theme.dart       # ThemeData dark + light
│   │   ├── app_colors.dart      # Color constants (match web design system)
│   │   ├── app_typography.dart  # TextStyle definitions
│   │   └── app_spacing.dart     # Spacing constants
│   ├── network/
│   │   ├── dio_client.dart      # Dio instance + interceptors
│   │   ├── auth_interceptor.dart# JWT inject + refresh
│   │   └── network_info.dart    # Connectivity checker
│   ├── errors/
│   │   ├── failures.dart        # Failure types
│   │   └── exceptions.dart      # Custom exceptions
│   └── utils/
│       ├── date_utils.dart
│       ├── xp_utils.dart        # XP calculation helpers
│       └── sync_utils.dart      # Offline sync helpers
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── auth_repository.dart
│   │   │   └── auth_local_datasource.dart
│   │   ├── domain/
│   │   │   └── auth_models.dart
│   │   └── presentation/
│   │       ├── login_screen.dart
│   │       └── auth_provider.dart
│   ├── tasks/
│   │   ├── data/
│   │   │   ├── task_repository.dart
│   │   │   ├── task_remote_datasource.dart
│   │   │   └── task_local_datasource.dart  # Drift
│   │   ├── domain/
│   │   │   └── task_model.dart
│   │   └── presentation/
│   │       ├── tasks_screen.dart
│   │       ├── task_card.dart
│   │       ├── quick_add_sheet.dart
│   │       └── tasks_provider.dart
│   ├── focus/
│   │   ├── services/
│   │   │   ├── focus_shield_service.dart  # Background blocking
│   │   │   ├── app_detector_service.dart  # Foreground app detection
│   │   │   └── overlay_service.dart       # Overlay management
│   │   ├── data/
│   │   │   └── focus_repository.dart
│   │   └── presentation/
│   │       ├── focus_screen.dart
│   │       ├── overlay_screen.dart        # Full screen task overlay
│   │       ├── schedule_manager.dart
│   │       └── focus_provider.dart
│   ├── gym/
│   │   ├── data/
│   │   │   ├── gym_repository.dart
│   │   │   └── gym_local_datasource.dart
│   │   └── presentation/
│   │       ├── gym_screen.dart
│   │       ├── log_session_screen.dart
│   │       └── gym_provider.dart
│   ├── home/
│   │   └── presentation/
│   │       ├── home_screen.dart
│   │       └── home_provider.dart
│   ├── profile/
│   │   └── presentation/
│   │       ├── profile_screen.dart
│   │       └── rpg_character_widget.dart
│   └── notifications/
│       ├── notification_service.dart
│       └── push_notification_handler.dart
├── shared/
│   ├── widgets/
│   │   ├── app_button.dart
│   │   ├── app_card.dart
│   │   ├── xp_bar.dart
│   │   ├── streak_badge.dart
│   │   ├── loading_shimmer.dart
│   │   └── empty_state.dart
│   └── providers/
│       ├── user_provider.dart
│       └── sync_provider.dart
└── background/
    ├── focus_background_main.dart  # Separate isolate for background service
    └── widget_update_task.dart     # Workmanager task for widget updates
```

## 3. Local Database Schema (Drift/SQLite)

```dart
// database.dart

@DriftDatabase(tables: [
  LocalTasks, LocalGymSessions, LocalJournalEntries,
  SyncQueue, FocusSchedules, BlockedApps
])
class AppDatabase extends _$AppDatabase { }

// Tasks table
class LocalTasks extends Table {
  TextColumn get id => text()();                    // MongoDB _id
  TextColumn get title => text()();
  TextColumn get category => text()();
  TextColumn get priority => text()();
  TextColumn get status => text()();
  DateTimeColumn get deadline => dateTime().nullable()();
  DateTimeColumn get createdAt => dateTime()();
  DateTimeColumn get updatedAt => dateTime()();
  BoolColumn get syncPending => boolean().withDefault(const Constant(false))();
  TextColumn get localAction => text().nullable()();  // 'create'|'update'|'complete'|'fail'
}

// Sync Queue — offline actions waiting to be synced
class SyncQueue extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get endpoint => text()();              // '/api/tasks/:id/complete'
  TextColumn get method => text()();                // 'POST'|'PATCH'|'DELETE'
  TextColumn get body => text().nullable()();       // JSON string
  DateTimeColumn get createdAt => dateTime()();
  IntColumn get retryCount => integer().withDefault(const Constant(0))();
}

// Focus Schedules
class FocusSchedules extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get daysOfWeek => text()();            // JSON: [1,2,3,4,5]
  IntColumn get startHour => integer()();
  IntColumn get startMinute => integer()();
  IntColumn get endHour => integer()();
  IntColumn get endMinute => integer()();
  BoolColumn get isActive => boolean().withDefault(const Constant(true))();
}

// Blocked Apps
class BlockedApps extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get packageName => text()();           // com.instagram.android
  TextColumn get appName => text()();
  TextColumn get scheduleIds => text()();           // JSON: [1, 2]
  BoolColumn get isBlocked => boolean().withDefault(const Constant(true))();
}
```

## 4. API Integration — Dio Setup

```dart
// dio_client.dart
class DioClient {
  static Dio getInstance() {
    final dio = Dio(BaseOptions(
      baseUrl: AppConstants.apiBaseUrl,  // from .env
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Content-Type': 'application/json'},
    ));

    dio.interceptors.addAll([
      AuthInterceptor(),        // Inject JWT, handle 401 refresh
      LogInterceptor(),         // Dev only
      RetryInterceptor(dio),    // Retry once on network error
      ConnectivityInterceptor(),// Queue requests when offline
    ]);

    return dio;
  }
}

// AuthInterceptor — JWT management
class AuthInterceptor extends Interceptor {
  @override
  Future onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await SecureStorage.getAccessToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  Future onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      // Try refresh token
      final refreshed = await _refreshToken();
      if (refreshed) {
        // Retry original request
        handler.resolve(await _retry(err.requestOptions));
        return;
      }
      // Refresh failed → logout
      await AuthService.logout();
    }
    handler.next(err);
  }
}
```

## 5. Focus Shield — Android Implementation

```dart
// focus_shield_service.dart
// Runs as a FOREGROUND SERVICE — survives app close

@pragma('vm:entry-point')
void focusShieldMain() {
  WidgetsFlutterBinding.ensureInitialized();
  FlutterBackgroundService().onStart.listen((event) async {
    final service = FlutterBackgroundService();

    // Check every 1 second
    Timer.periodic(const Duration(seconds: 1), (timer) async {
      if (!await _isScheduleActive()) {
        service.invoke('stopSelf');
        timer.cancel();
        return;
      }

      final foregroundApp = await AppDetectorService.getForegroundApp();
      final blockedApps = await DatabaseService.getBlockedApps();

      if (blockedApps.contains(foregroundApp)) {
        await OverlayService.showTaskOverlay();
        await _logBlockEvent(foregroundApp);
        await _reportToBackend(foregroundApp);  // sync to web analytics
      }
    });
  });
}

// OverlayService — shows full screen task popup over other apps
class OverlayService {
  static Future<void> showTaskOverlay() async {
    // Requires SYSTEM_ALERT_WINDOW permission
    final topTask = await TaskRepository.getTopPriorityTask();
    await SystemAlertWindow.showSystemWindow(
      height: MediaQuery.of(context).size.height.toInt(),
      prefMode: SystemWindowPrefMode.OVERLAY,
      body: SystemWindowBody(
        rows: [
          EachRow(columns: [
            EachColumn(text: SystemWindowText(text: "FOCUS MODE", fontSize: 14)),
          ]),
          EachRow(columns: [
            EachColumn(text: SystemWindowText(text: topTask.title, fontSize: 22, fontWeight: FontWeight.BOLD)),
          ]),
        ],
        padding: const EdgeInsets.all(24),
      ),
      footer: SystemWindowFooter(
        buttons: [
          EachButton(tag: "working", text: SystemWindowText(text: "I'm Working On It")),
          EachButton(tag: "override", text: SystemWindowText(text: "Emergency Override")),
        ],
        padding: const EdgeInsets.all(16),
      ),
    );
  }
}
```

## 6. Android Permissions Required

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC"/>
<uses-permission android:name="android.permission.PACKAGE_USAGE_STATS"
    tools:ignore="ProtectedPermissions"/>
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
<uses-permission android:name="android.permission.VIBRATE"/>
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"/>
```

## 7. State Management — Riverpod Providers

```dart
// Key providers

// Auth state
final authProvider = StateNotifierProvider<AuthNotifier, AuthState>(
  (ref) => AuthNotifier(ref.watch(authRepositoryProvider))
);

// Tasks — combines local + remote
final tasksProvider = AsyncNotifierProvider<TasksNotifier, List<Task>>(
  TasksNotifier.new
);

// User profile + RPG stats
final userProvider = AsyncNotifierProvider<UserNotifier, UserProfile>(
  UserNotifier.new
);

// Focus Shield state
final focusShieldProvider = StateNotifierProvider<FocusShieldNotifier, FocusShieldState>(
  (ref) => FocusShieldNotifier(ref.watch(focusServiceProvider))
);

// Sync status
final syncProvider = StateNotifierProvider<SyncNotifier, SyncState>(
  (ref) => SyncNotifier(ref.watch(syncQueueProvider))
);

// Connectivity
final connectivityProvider = StreamProvider<ConnectivityResult>(
  (ref) => Connectivity().onConnectivityChanged
);
```

## 8. Push Notifications — FCM Setup

```dart
// push_notification_handler.dart

class PushNotificationHandler {
  static Future<void> initialize() async {
    final messaging = FirebaseMessaging.instance;

    // Request permission
    await messaging.requestPermission(
      alert: true, badge: true, sound: true,
    );

    // Get FCM token → send to backend
    final token = await messaging.getToken();
    await UserRepository.updateFCMToken(token!);

    // Handle foreground messages
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);

    // Handle background messages
    FirebaseMessaging.onBackgroundMessage(_handleBackgroundMessage);

    // Handle notification tap (deep link)
    FirebaseMessaging.onMessageOpenedApp.listen(_handleNotificationTap);
  }

  static void _handleForegroundMessage(RemoteMessage message) {
    final type = message.data['type'];
    switch (type) {
      case 'achievement_unlock':
        NotificationService.showAchievementNotification(message.data);
        break;
      case 'streak_at_risk':
        NotificationService.showStreakWarning(message.data);
        break;
      case 'weekly_insight_ready':
        NotificationService.showWeeklyInsightNotification();
        break;
    }
  }

  static void _handleNotificationTap(RemoteMessage message) {
    final route = message.data['route'] ?? '/home';
    AppRouter.navigateTo(route);  // Deep link to correct screen
  }
}
```

## 9. Offline Sync System

```dart
// sync_service.dart

class SyncService {
  // Called every time connectivity returns
  static Future<void> processSyncQueue() async {
    final queue = await DatabaseService.getSyncQueue();
    if (queue.isEmpty) return;

    for (final item in queue) {
      try {
        final response = await DioClient.getInstance().request(
          item.endpoint,
          options: Options(method: item.method),
          data: item.body != null ? jsonDecode(item.body!) : null,
        );

        if (response.statusCode == 200 || response.statusCode == 201) {
          await DatabaseService.removeSyncQueueItem(item.id);
        }
      } catch (e) {
        // Increment retry count, give up after 5 retries
        if (item.retryCount >= 5) {
          await DatabaseService.removeSyncQueueItem(item.id);
          // Log as permanent failure
        } else {
          await DatabaseService.incrementRetryCount(item.id);
        }
      }
    }
  }

  // Add to queue when offline
  static Future<void> queueAction({
    required String endpoint,
    required String method,
    Map<String, dynamic>? body,
  }) async {
    await DatabaseService.addToSyncQueue(
      SyncQueueCompanion(
        endpoint: Value(endpoint),
        method: Value(method),
        body: Value(body != null ? jsonEncode(body) : null),
        createdAt: Value(DateTime.now()),
      ),
    );
  }
}
```

## 10. Backend Changes Needed for Mobile

New endpoints to add to existing backend:

```
POST /api/mobile/fcm-token
  Body: { token: string }
  → Save FCM token to user record

POST /api/mobile/focus-event
  Body: { blockedApp, timestamp, scheduleId, wasOverridden }
  → Log blocking event for web analytics

GET /api/mobile/sync
  Query: { lastSyncAt: ISO string }
  → Return all changed records since lastSyncAt
  → Includes: tasks, goals, journal, gym, user stats
  → Used after offline reconnect

POST /api/mobile/widget-data
  → Returns minimal data for home screen widget
  → { todayTasks: [...top3], streak, level, xp }
  → Cached on server 15 minutes

PUT /api/users/fcm-token
  Body: { fcmToken: string, platform: 'android'|'ios' }
  → Update FCM token when it refreshes
```

New fields on User model:
```javascript
mobileSync: {
  fcmToken: String,
  platform: String,
  lastSyncAt: Date,
  appVersion: String,
}
```

New collection: focus_events
```javascript
{
  userId: ObjectId,
  blockedApp: String,       // com.instagram.android
  appName: String,          // Instagram
  timestamp: Date,
  scheduleId: String,
  wasOverridden: Boolean,
  overrideReason: String,   // future
}
```

## 11. Firebase Setup Required

Services needed:
- Firebase Authentication (shared with web — same project)
- Firebase Cloud Messaging (push notifications)
- Firebase Crashlytics (crash reporting)
- Firebase Analytics (usage tracking)

google-services.json → android/app/
GoogleService-Info.plist → ios/Runner/
