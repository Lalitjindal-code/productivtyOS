import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:drift/drift.dart';
import '../database/database.dart';
import '../network/dio_client.dart';

class SyncService {
  final AppDatabase _db;
  final Dio _dio;

  SyncService(this._db) : _dio = DioClient.getInstance();

  Future<void> processSyncQueue() async {
    final queue = await (_db.select(_db.syncQueue)).get();
    if (queue.isEmpty) return;

    for (final item in queue) {
      try {
        final response = await _dio.request(
          item.endpoint,
          options: Options(method: item.method),
          data: item.body != null ? jsonDecode(item.body!) : null,
        );

        if (response.statusCode == 200 || response.statusCode == 201) {
          // Success: Remove from queue and mark local item as synced
          await (_db.delete(_db.syncQueue)..where((t) => t.id.equals(item.id))).go();
        }
      } catch (e) {
        // Increment retry count
        await (_db.update(_db.syncQueue)..where((t) => t.id.equals(item.id)))
            .write(SyncQueueCompanion(retryCount: Value(item.retryCount + 1)));
            
        if (item.retryCount >= 5) {
          // Give up after 5 retries to avoid infinite loops
          await (_db.delete(_db.syncQueue)..where((t) => t.id.equals(item.id))).go();
        }
      }
    }
  }
}
