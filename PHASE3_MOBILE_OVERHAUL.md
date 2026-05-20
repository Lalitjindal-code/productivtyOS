# Phase 3 — Mobile App Complete Overhaul (Priority: HIGH 🟠)

> **Estimated Time:** 10-14 days
> **This is the biggest change — mobile app basically rebuild karna hai**

---

## 📊 Current Mobile State (Very Bad)

```
lib/
├── screens/                    ← OLD architecture (StatefulWidget)
│   ├── home_screen.dart        ← Uses ApiService (direct calls, no state mgmt)
│   ├── focus_screen.dart       ← Very basic
│   └── settings_screen.dart   ← App blocker only
│
├── features/                   ← NEW architecture (Riverpod) — INCOMPLETE
│   ├── auth/                   ← Has login screen but no real form
│   ├── home/                   ← Only presentation folder, empty
│   ├── tasks/                  ← Has domain/data/presentation but may be stubs
│   ├── focus/                  ← Services exist
│   ├── gym/                    ← Stubs
│   ├── profile/                ← May be stub
│   └── notifications/          ← Service only
│
└── app.dart                    ← Routes to features/ BUT old screens/ ka bhi use hota hai
```

**Main Problem:** Dono architectures mix hain — iska result: confusion, bugs, crashes

---

## 🎯 Target Mobile Architecture

```
lib/
├── core/
│   ├── theme/          ← Complete design system
│   ├── network/        ← API client with auth
│   ├── database/       ← SQLite for offline
│   └── constants/      ← App-wide constants
│
├── features/           ← Feature-first architecture (CLEAN)
│   ├── auth/           ← Login, Register, Onboarding
│   ├── home/           ← Dashboard with real data
│   ├── tasks/          ← Full task management
│   ├── focus/          ← Pomodoro timer + app blocker
│   ├── gym/            ← Workout tracker
│   ├── journal/        ← NEW - Daily journal
│   ├── goals/          ← NEW - Goals with boss fight
│   ├── rpg/            ← NEW - Character & achievements
│   └── profile/        ← User profile & settings
│
├── shared/
│   ├── widgets/        ← Reusable UI components
│   └── providers/      ← Global state providers
│
└── main.dart
```

---

## 🔧 Step-by-Step Mobile Overhaul

### Step 3.1 — Fix Architecture Conflict

**Delete old screens** (after migrating):
- `lib/screens/home_screen.dart` — Replace with `features/home/presentation/home_screen.dart`
- `lib/screens/focus_screen.dart` — Replace with `features/focus/presentation/focus_screen.dart`
- `lib/screens/settings_screen.dart` — Replace with `features/profile/presentation/settings_screen.dart`

**Fix `lib/services/api_service.dart`** (old file):
- Remove it entirely
- Use `core/network/dio_client.dart` everywhere

---

### Step 3.2 — Update Design System (Theme)

**File:** `lib/core/theme/app_theme.dart` — Comprehensive update:

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Colors (match website):
  static const Color primary = Color(0xFFFFAD00);      // Golden
  static const Color surface = Color(0xFF0D0D12);      // Dark bg
  static const Color surfaceCard = Color(0xFF13131A);  // Card bg
  static const Color elevated = Color(0xFF1A1A24);     // Elevated surface
  static const Color plasma = Color(0xFF00D4FF);       // Cyan accent
  static const Color success = Color(0xFF22C55E);      // Green
  static const Color danger = Color(0xFFEF4444);       // Red
  static const Color warning = Color(0xFFF59E0B);      // Amber
  
  static ThemeData get darkTheme => ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: surface,
    colorScheme: ColorScheme.dark(
      primary: primary,
      surface: surface,
      secondary: plasma,
      error: danger,
    ),
    textTheme: GoogleFonts.interTextTheme().apply(
      bodyColor: Colors.white,
      displayColor: Colors.white,
    ),
    cardTheme: CardThemeData(
      color: surfaceCard,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(color: Colors.white.withValues(alpha: 0.08)),
      ),
      elevation: 0,
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: surfaceCard,
      selectedItemColor: primary,
      unselectedItemColor: Colors.white38,
      type: BottomNavigationBarType.fixed,
      elevation: 0,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
      scrolledUnderElevation: 0,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 18,
        fontWeight: FontWeight.w700,
        color: Colors.white,
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: elevated,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: Colors.white12),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: Colors.white12),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: primary, width: 2),
      ),
    ),
  );
}
```

---

### Step 3.3 — Home Screen (Complete Redesign)

**File:** `lib/features/home/presentation/home_screen.dart`

**Current:** Basic StatefulWidget, fetches profile and tasks
**Target:** Beautiful gamified dashboard

**Features to add:**
1. **Character Banner Card** — Avatar, Level, HP bar, XP bar (animated)
2. **Today's Stats** — Tasks done/total, Pomodoros count, Streak days
3. **Quick Actions Row** — Start Focus, Add Task, Log Workout
4. **Today's Tasks** — Scrollable list with swipe-to-complete
5. **Daily Challenge** — AI-suggested daily challenge
6. **Streak Fire** — Animated flame for streak

**Example structure:**
```dart
class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final statsAsync = ref.watch(dashboardStatsProvider);
    final tasksAsync = ref.watch(todayTasksProvider);

    return Scaffold(
      body: RefreshIndicator(
        onRefresh: () async {
          ref.invalidate(dashboardStatsProvider);
          ref.invalidate(todayTasksProvider);
        },
        child: CustomScrollView(
          slivers: [
            SliverAppBar(
              expandedHeight: 200,
              flexibleSpace: FlexibleSpaceBar(
                background: _CharacterBanner(stats: statsAsync),
              ),
            ),
            SliverToBoxAdapter(child: _QuickActionsRow()),
            SliverToBoxAdapter(child: _TodayStatsRow(stats: statsAsync)),
            _TodayTasksList(tasks: tasksAsync),
          ],
        ),
      ),
    );
  }
}
```

---

### Step 3.4 — Tasks Screen (Full Implementation)

**File:** `lib/features/tasks/presentation/tasks_screen.dart`

**Features:**
- Filter tabs: All / Today / Completed
- Search bar
- Priority filter chips
- Task cards with:
  - Swipe right → Complete ✓
  - Swipe left → Delete 🗑️
  - Tap → Expand details
  - Long press → Edit
- FAB to add new task
- New task bottom sheet (title, priority, category, due date, notes)

```dart
class TasksScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: Text('Tasks')),
      body: Column(
        children: [
          FilterTabBar(), // All / Today / Completed
          SearchBar(),
          Expanded(child: TaskList()),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => showAddTaskSheet(context),
        icon: Icon(Icons.add),
        label: Text('New Task'),
        backgroundColor: AppTheme.primary,
        foregroundColor: Colors.black,
      ),
    );
  }
}
```

---

### Step 3.5 — Focus Screen (Pomodoro Timer)

**File:** `lib/features/focus/presentation/focus_screen.dart`

**Current:** Very basic timer
**Target:** Full pomodoro experience

**Features:**
1. **Circular progress timer** — Beautiful animated ring
2. **Work/Break phases** — Visual distinction
3. **Session counter** — "Session 2 of 4"
4. **Linked task** — Select task you're working on
5. **App shield** — Focus mode blocks other apps
6. **Ambient sound** — Lo-fi, rain, white noise
7. **Break suggestions** — AI suggests break activity
8. **Sync to server** — Session saves when complete

```dart
class FocusScreen extends ConsumerStatefulWidget {
  @override
  ConsumerState<FocusScreen> createState() => _FocusScreenState();
}

class _FocusScreenState extends ConsumerState<FocusScreen> 
    with TickerProviderStateMixin {
  late AnimationController _timerController;
  late AnimationController _pulseController;
  
  // Build circular timer with custom painter
  Widget _buildTimer() {
    return AnimatedBuilder(
      animation: _timerController,
      builder: (context, _) {
        return CustomPaint(
          painter: TimerRingPainter(
            progress: _timerController.value,
            color: _isWorkPhase ? AppTheme.primary : AppTheme.success,
          ),
          child: Center(child: _buildTimeDisplay()),
        );
      },
    );
  }
}
```

---

### Step 3.6 — Gym Screen (Full Workout Tracker)

**File:** `lib/features/gym/presentation/gym_screen.dart`

**Features:**
1. **Today's Target** — Pull from gym plan
2. **Start Workout** → Opens workout logger
3. **Exercise search** — Add exercises with sets/reps/weight
4. **PR detection** — Automatic PR badge when new record
5. **Workout history** — List of past workouts
6. **Progress charts** — Volume over time (fl_chart)
7. **Rest timer** — Countdown between sets

---

### Step 3.7 — Journal Screen (NEW FEATURE)

**New Feature — Journal not in mobile at all!**

**File:** `lib/features/journal/presentation/journal_screen.dart`

**Features:**
1. **Daily entry** — Rich text input
2. **Mood tracker** — 5 emoji mood selector
3. **Voice input** — Speak to write (speech_to_text already installed!)
4. **Past entries** — Calendar view
5. **AI summary** — "Your week in words" from AI

```dart
class JournalScreen extends ConsumerStatefulWidget {
  // Voice input integration:
  void _startListening() async {
    await _speech.listen(
      onResult: (result) {
        setState(() {
          _controller.text = result.recognizedWords;
        });
      },
    );
  }
}
```

---

### Step 3.8 — Goals Screen (NEW FEATURE)

**New Feature — Goals not in mobile at all!**

**File:** `lib/features/goals/presentation/goals_screen.dart`

**Features:**
1. **Goal cards** — Progress with boss HP metaphor
2. **Boss fight visual** — Enemy with HP bar decreasing
3. **Milestone checkboxes** — Progress tracking
4. **XP reward** — Visual when milestone complete
5. **Add/Edit goals** — Full form

---

### Step 3.9 — RPG Character Screen (NEW FEATURE)

**New Feature — RPG not in mobile at all!**

**File:** `lib/features/rpg/presentation/character_screen.dart`

**Features:**
1. **Character card** — Avatar, class, level with animated XP bar
2. **Stats grid** — STR, INT, WIS, CHA, LCK bars
3. **Achievements list** — Unlocked badges with animation
4. **Class selection** — Warrior / Scholar / Cyborg / Monk (if not selected)
5. **Level-up animation** — Confetti + sound when leveling up

---

### Step 3.10 — Bottom Navigation Redesign

**File:** `lib/app.dart` — Update MainShell

**Current 5 items:** Home, Tasks, Focus, Gym, Profile
**Updated 5 items:** Home, Tasks, Focus, Goals, Profile

**Style improvements:**
```dart
NavigationBar(
  backgroundColor: AppTheme.surfaceCard,
  indicatorColor: AppTheme.primary.withValues(alpha: 0.2),
  destinations: [
    NavigationDestination(
      icon: Icon(Icons.home_outlined),
      selectedIcon: Icon(Icons.home, color: AppTheme.primary),
      label: 'Home',
    ),
    // ...
  ],
)
```

---

### Step 3.11 — Shared Widgets Library

Create these reusable widgets in `lib/shared/widgets/`:

```
widgets/
├── pos_card.dart           ← Standard card with border
├── pos_button.dart         ← Primary/Secondary button styles
├── stat_chip.dart          ← Stat display chip
├── xp_bar.dart             ← Animated XP/Progress bar
├── loading_skeleton.dart   ← Shimmer loading effect
├── empty_state.dart        ← Empty state with icon
├── priority_badge.dart     ← Task priority indicator
└── streak_flame.dart       ← Animated streak fire
```

**Example — LoadingSkeleton:**
```dart
class LoadingSkeleton extends StatefulWidget {
  final double width;
  final double height;
  final double borderRadius;
  
  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.3, end: 0.7),
      duration: Duration(milliseconds: 800),
      builder: (context, value, _) {
        return Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: value * 0.1),
            borderRadius: BorderRadius.circular(borderRadius),
          ),
        );
      },
    );
  }
}
```

---

### Step 3.12 — Fix Deprecated APIs

**Search for and fix all `withOpacity()` calls:**
```bash
# Find all instances:
grep -r "withOpacity" lib/
```

**Replace all with:**
```dart
// Before (deprecated):
color.withOpacity(0.5)

// After (correct):
color.withValues(alpha: 0.5)
```

---

### Step 3.13 — Offline-First Architecture

**Current:** Koi bhi offline support nahi — no internet = app broken

**Fix:** Local SQLite database se serve karo:
```dart
// In SyncService:
Future<List<Task>> getTasks() async {
  try {
    // 1. Try from server
    final tasks = await _apiClient.get('/tasks');
    await _db.cacheTasks(tasks); // Cache locally
    return tasks;
  } catch (e) {
    // 2. Fallback to local cache
    return await _db.getLocalTasks();
  }
}
```

**Sync queue for offline actions:**
```dart
// User adds task offline:
Future<void> addTask(Task task) async {
  await _db.saveTaskLocally(task); // Save immediately
  await _syncQueue.enqueue(SyncAction.create('tasks', task)); // Queue for sync
}

// When online again:
Future<void> processSyncQueue() async {
  final pending = await _syncQueue.getPending();
  for (final action in pending) {
    await _apiClient.perform(action);
    await _syncQueue.markComplete(action.id);
  }
}
```

---

## 📱 Screen-by-Screen Plan

| Screen | Current | Target | Days |
|--------|---------|--------|------|
| Auth/Login | Basic form | Polished with validation | 1 |
| Home | StatefulWidget, basic | Riverpod, gamified dashboard | 3 |
| Tasks | May be stub | Full CRUD with swipe | 2 |
| Focus | Basic timer | Full pomodoro + app shield | 2 |
| Gym | May be stub | Full workout tracker | 2 |
| Journal | MISSING | New - with voice input | 2 |
| Goals | MISSING | New - with boss fight | 1 |
| RPG Character | MISSING | New - full stats | 1 |
| Profile/Settings | App blocker only | Full settings | 1 |

**Total: ~15 days realistic estimate**

---

## 📦 New Dependencies to Add

**`pubspec.yaml` mein add karo:**
```yaml
# Already have these - KEEP:
flutter_riverpod, go_router, dio, drift, flutter_animate, fl_chart, speech_to_text

# Add these NEW:
flutter_slidable: ^3.1.0    # Swipe to complete/delete tasks
shimmer: ^3.0.0             # Loading skeleton effect
cached_network_image: ^3.4.1 # Profile pictures
image_picker: ^1.1.2        # Profile photo picker
share_plus: ^10.0.0         # Share achievements
url_launcher: ^6.3.0        # Open links
```

---

## 🧪 Testing Mobile

After each screen:
1. Run on Android emulator
2. Test offline mode (airplane mode)
3. Test back button navigation
4. Test dark theme consistency
5. Test with slow network (simulated)
