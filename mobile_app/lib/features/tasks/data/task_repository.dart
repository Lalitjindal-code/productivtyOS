import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/api_constants.dart';
import '../../../core/network/dio_client.dart';

// ── Model ─────────────────────────────────────────────────────────────
class Task {
  final String id;
  final String title;
  final String? description;
  final String priority;
  final String category;
  final String status;
  final DateTime? deadline;
  final int? estimatedDuration;
  final int xpEarned;

  const Task({
    required this.id,
    required this.title,
    this.description,
    required this.priority,
    required this.category,
    required this.status,
    this.deadline,
    this.estimatedDuration,
    this.xpEarned = 0,
  });

  bool get isCompleted => status == 'completed';
  bool get isFailed => status == 'failed';

  factory Task.fromJson(Map<String, dynamic> json) => Task(
    id: json['_id']?.toString() ?? '',
    title: json['title']?.toString() ?? 'Untitled',
    description: json['description']?.toString(),
    priority: json['priority']?.toString() ?? 'medium',
    category: json['category']?.toString() ?? 'personal',
    status: json['status']?.toString() ?? 'pending',
    deadline: json['deadline'] != null
        ? DateTime.tryParse(json['deadline'].toString())
        : null,
    estimatedDuration: (json['estimatedDuration'] as num?)?.toInt(),
    xpEarned: (json['xpEarned'] as num?)?.toInt() ?? 0,
  );
}

// ── Repository ────────────────────────────────────────────────────────
class TaskRepository {
  final Dio _dio;
  TaskRepository(this._dio);

  Future<List<Task>> getTasks({String? filter}) async {
    final res = await _dio.get(
      ApiConstants.tasks,
      queryParameters: filter != null ? {'filter': filter} : null,
    );
    final raw = res.data;
    final list = raw is List ? raw : (raw['tasks'] as List? ?? []);
    return list.map((t) => Task.fromJson(t as Map<String, dynamic>)).toList();
  }

  Future<Task> createTask({
    required String title,
    String priority = 'medium',
    String category = 'personal',
    String? description,
    DateTime? deadline,
  }) async {
    final res = await _dio.post(ApiConstants.tasks, data: {
      'title': title,
      'priority': priority,
      'category': category,
      if (description != null) 'description': description,
      if (deadline != null) 'deadline': deadline.toIso8601String(),
    });
    return Task.fromJson(res.data['task'] as Map<String, dynamic>? ?? res.data);
  }

  Future<void> completeTask(String id) async {
    await _dio.patch('${ApiConstants.tasks}/$id/complete');
  }

  Future<void> deleteTask(String id) async {
    await _dio.delete('${ApiConstants.tasks}/$id');
  }
}

// ── Providers ─────────────────────────────────────────────────────────
final taskRepositoryProvider = Provider<TaskRepository>(
  (ref) => TaskRepository(DioClient.getInstance()),
);

final tasksProvider = FutureProvider.family<List<Task>, String>((ref, filter) async {
  return ref.watch(taskRepositoryProvider).getTasks(filter: filter == 'all' ? null : filter);
});
