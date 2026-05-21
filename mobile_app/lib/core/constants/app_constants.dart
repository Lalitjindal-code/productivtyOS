// App-wide constants
class AppConstants {
  // ── API ──────────────────────────────────────────────────────────
  static const String apiBaseUrl = 'http://10.0.2.2:5002/api';
  // Use 10.0.2.2 for Android emulator (maps to localhost on host machine)
  // Change to your LAN IP for physical device: e.g. 'http://192.168.1.x:5002/api'

  // ── Secure Storage Keys ───────────────────────────────────────────
  static const String keyJwtToken    = 'jwt_token';
  static const String keyUserId      = 'user_id';
  static const String keyUserName    = 'user_name';
  static const String keyUserEmail   = 'user_email';

  // ── Pomodoro defaults ─────────────────────────────────────────────
  static const int pomodoroWorkMinutes       = 25;
  static const int pomodoroShortBreakMinutes = 5;
  static const int pomodoroLongBreakMinutes  = 15;
  static const int pomodoroLongBreakInterval = 4;

  // ── Misc ──────────────────────────────────────────────────────────
  static const String appName = 'ProductivityOS';
}
