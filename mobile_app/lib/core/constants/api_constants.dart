class ApiConstants {
  // Default base URL. Set to http://127.0.0.1:5002/api for adb reverse on physical Android devices.
  // Use http://10.0.2.2:5002/api for Android Emulator.
  static const String baseUrl = 'http://127.0.0.1:5002/api';

  // Auth
  static const String login    = '/auth/login';
  static const String register = '/auth/register';
  static const String profile  = '/user/profile';
  static const String stats    = '/user/stats';
  static const String rpg      = '/user/rpg-status';

  // Tasks
  static const String tasks = '/tasks';

  // Goals
  static const String goals = '/goals';

  // Pomodoro
  static const String pomodoroSessions = '/pomodoro/sessions';
  static const String pomodoroStats    = '/pomodoro/stats/daily';

  // Gym
  static const String gymWorkouts  = '/gym/workouts';
  static const String gymExercises = '/gym/exercises';

  // Journal
  static const String journal = '/journal';

  // Memory / AI
  static const String memory   = '/memory';
  static const String insights = '/memory/insights';
}
