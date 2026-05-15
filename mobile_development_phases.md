# ProductivityOS Mobile — Phase-by-Phase Development Guide

This document outlines the systematic upgrade and development of the ProductivityOS Mobile App (Flutter), based on the `mobile_prd_trd.md` and `mobile_design_system.md`.

---

## Phase 1: Foundation & Design System (Current Focus)
**Goal:** Establish the architecture, core theme, and shared UI components.

1.  **Architecture Setup**: Refactor `lib/` directory into the feature-based structure defined in TRD.
2.  **Design System Implementation**:
    *   Create `core/theme/app_colors.dart` with the Electric Amber & Plasma Cyan palette.
    *   Create `core/theme/app_typography.dart` using Google Fonts (Rajdhani, Outfit, JetBrains Mono).
    *   Create `core/theme/app_spacing.dart` and `core/theme/app_theme.dart`.
3.  **Shared Components**:
    *   Build `AppButton`, `AppCard`, `XPBar`, and `LoadingShimmer`.
4.  **Base Shell**:
    *   Setup `GoRouter` with `ShellRoute` for bottom navigation.
    *   Create `MainShell` with the 5 main tabs (Home, Tasks, Focus, Gym, Profile).

---

## Phase 2: Core Features & State Management
**Goal:** Implement authentication, task management, and basic data flow.

1.  **Auth Layer**:
    *   Login screen with JWT storage in `flutter_secure_storage`.
    *   Auth interceptor for `Dio` to handle token refresh.
2.  **Task Management**:
    *   Task list view with swipe-to-complete (Haptic feedback).
    *   Quick Add FAB with AI categorization (Groq integration on backend).
3.  **Offline Support (Drift)**:
    *   Setup SQLite schema for Tasks, Gym Sessions, and Sync Queue.
    *   Implement repository pattern to handle local-first data strategy.

---

## Phase 3: Focus Shield (The "Killer" Feature)
**Goal:** Implement the background blocking service and overlay system.

1.  **Background Service**:
    *   Setup `flutter_background_service` as a foreground daemon.
    *   Implement foreground app detection using `usage_stats`.
2.  **Overlay System**:
    *   Design and implement `OverlayScreen` using `system_alert_window`.
    *   Connect overlay to current task and focus schedule.
3.  **Schedule Manager**:
    *   UI to create and manage focus schedules (days/hours).
    *   Blocked apps picker.

---

## Phase 4: Gym & RPG Integration
**Goal:** Build the gym logger and sync RPG stats with the web.

1.  **Gym Mode**:
    *   High-contrast, large-button UI for workout logging.
    *   Rest timer and PR detection.
2.  **RPG System**:
    *   Profile screen with 3D orb/Lottie animations.
    *   XP/Level sync with backend.
3.  **Achievements**:
    *   Local and Push notification triggers for milestones.

---

## Phase 5: Polish, Sync & Analytics
**Goal:** Finalize offline sync, notifications, and performance tuning.

1.  **Sync Engine**:
    *   Auto-sync on connectivity return.
    *   Conflict resolution (Last-write-wins).
2.  **Smart Notifications**:
    *   Morning briefing and streak-at-risk alerts.
    *   Deep linking from notifications to specific screens.
3.  **Widgets**:
    *   Home screen widget (2x2 and 4x2) for quick task access.
4.  **Performance & QA**:
    *   Memory leak check for background services.
    *   Firebase Crashlytics & Analytics integration.

---

## Phase 6: Deployment
1.  **Android Release**: App bundle generation, ProGuard setup.
2.  **iOS Release**: App Store Connect setup, Push certificates.
3.  **Documentation**: User guide and internal API docs.
