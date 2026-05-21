class ApiConstants {
  // Android emulator: 10.0.2.2 maps to host's localhost
  // Physical device: change to your LAN IP, e.g. 'http://192.168.1.x:5002/api'
  static const String baseUrl = 'http://10.0.2.2:5002/api';

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
