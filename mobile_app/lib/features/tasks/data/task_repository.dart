import 'package:dio/dio.dart';
import '../domain/task_model.dart';
import '../../../core/database/database.dart';
import '../../../core/network/dio_client.dart';
import '../../../core/constants/api_constants.dart';
import 'package:drift/drift.dart';

class TaskRepository {
  final AppDatabase _db;
  final Dio _dio;

  TaskRepository(this._db) : _dio = DioClient.getInstance();

  // Fetch from API and sync to Local DB
  Future<List<TaskModel>> getTasks() async {
    try {
      final response = await _dio.get(ApiConstants.tasks);
      final List<dynamic> data = response.data;
      final tasks = data.map((json) => TaskModel.fromJson(json)).toList();

      // Sync to local DB
      for (final task in tasks) {
        await _db.into(_db.localTasks).insertOnConflictUpdate(
          LocalTasksCompanion(
            id: Value(task.id),
            title: Value(task.title),
            category: Value(task.category),
            priority: Value(task.priority),
            status: Value(task.status),
            deadline: Value(task.deadline),
            createdAt: Value(task.createdAt),
            updatedAt: Value(task.updatedAt),
            syncPending: const Value(false),
          ),
        );
      }
      return tasks;
    } catch (e) {
      // If offline, return from local DB
      final localTasks = await _db.select(_db.localTasks).get();
      return localTasks.map((row) => TaskModel(
        id: row.id,
        title: row.title,
        category: row.category,
        priority: row.priority,
        status: row.status,
        deadline: row.deadline,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      )).toList();
    }
  }

  // Create Task (Offline-first)
  Future<void> createTask(String title, String category, String priority) async {
    final tempId = 'temp_${DateTime.now().millisecondsSinceEpoch}';
    final now = DateTime.now();

    // 1. Save to local DB with syncPending = true
    await _db.into(_db.localTasks).insert(
      LocalTasksCompanion.insert(
        id: tempId,
        title: title,
        category: category,
        priority: priority,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
        syncPending: const Value(true),
        localAction: const Value('create'),
      ),
    );

    // 2. Add to Sync Queue
    await _db.into(_db.syncQueue).insert(
      SyncQueueCompanion.insert(
        endpoint: ApiConstants.tasks,
        method: 'POST',
        body: Value('{"title": "$title", "category": "$category", "priority": "$priority"}'),
        createdAt: now,
      ),
    );

    // 3. Trigger immediate sync if online (future implementation)
  }
}
