import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/api_constants.dart';
import '../../../core/network/dio_client.dart';

// ── Models ────────────────────────────────────────────────────────────
class DashboardStats {
  final int level;
  final int xp;
  final int xpToNext;
  final int streak;
  final int tasksCompleted;
  final int tasksTotal;
  final int pomodorosToday;
  final String characterClass;
  final String username;

  const DashboardStats({
    required this.level,
    required this.xp,
    required this.xpToNext,
    required this.streak,
    required this.tasksCompleted,
    required this.tasksTotal,
    required this.pomodorosToday,
    required this.characterClass,
    required this.username,
  });

  factory DashboardStats.fromJson(Map<String, dynamic> json) {
    final rpg = json['rpgStatus'] as Map<String, dynamic>? ?? {};
    final daily = json['daily'] as Map<String, dynamic>? ?? {};
    return DashboardStats(
      level: (rpg['level'] as num?)?.toInt() ?? 1,
      xp: (rpg['xp'] as num?)?.toInt() ?? 0,
      xpToNext: (rpg['xpToNext'] as num?)?.toInt() ?? 100,
      streak: (daily['streak'] as num?)?.toInt() ?? 0,
      tasksCompleted: (daily['tasksCompleted'] as num?)?.toInt() ?? 0,
      tasksTotal: (daily['tasksTotal'] as num?)?.toInt() ?? 0,
      pomodorosToday: (daily['pomodorosToday'] as num?)?.toInt() ?? 0,
      characterClass: (rpg['class'] as String?) ?? 'Warrior',
      username: (json['username'] as String?) ?? 'Commander',
    );
  }

  static DashboardStats get empty => const DashboardStats(
    level: 1, xp: 0, xpToNext: 100, streak: 0,
    tasksCompleted: 0, tasksTotal: 0, pomodorosToday: 0,
    characterClass: 'Warrior', username: 'Commander',
  );
}

class TaskSummary {
  final String id;
  final String title;
  final String priority;
  final String category;
  final bool completed;

  const TaskSummary({
    required this.id,
    required this.title,
    required this.priority,
    required this.category,
    required this.completed,
  });

  factory TaskSummary.fromJson(Map<String, dynamic> json) => TaskSummary(
    id: json['_id']?.toString() ?? '',
    title: json['title']?.toString() ?? 'Untitled',
    priority: json['priority']?.toString() ?? 'medium',
    category: json['category']?.toString() ?? 'personal',
    completed: json['status'] == 'completed',
  );
}

// ── Repository ────────────────────────────────────────────────────────
class HomeRepository {
  final Dio _dio;
  HomeRepository(this._dio);

  Future<DashboardStats> getDashboardStats() async {
    final res = await _dio.get(ApiConstants.stats);
    return DashboardStats.fromJson(res.data as Map<String, dynamic>);
  }

  Future<List<TaskSummary>> getTodayTasks() async {
    final res = await _dio.get(ApiConstants.tasks, queryParameters: {'filter': 'today'});
    final list = res.data['tasks'] as List? ?? res.data as List? ?? [];
    return list.map((t) => TaskSummary.fromJson(t as Map<String, dynamic>)).toList();
  }
}

// ── Providers ─────────────────────────────────────────────────────────
final homeRepositoryProvider = Provider<HomeRepository>(
  (ref) => HomeRepository(DioClient.getInstance()),
);

final dashboardStatsProvider = FutureProvider<DashboardStats>((ref) async {
  return ref.watch(homeRepositoryProvider).getDashboardStats();
});

final todayTasksProvider = FutureProvider<List<TaskSummary>>((ref) async {
  return ref.watch(homeRepositoryProvider).getTodayTasks();
});
