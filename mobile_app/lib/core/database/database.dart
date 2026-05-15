import 'dart:io';
import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

part 'database.g.dart';

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

// Sync Queue
class SyncQueue extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get endpoint => text()();
  TextColumn get method => text()();
  TextColumn get body => text().nullable()();
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
  TextColumn get scheduleIds => text()().nullable()(); // JSON: [1, 2]
  BoolColumn get isBlocked => boolean().withDefault(const Constant(true))();
}

@DriftDatabase(tables: [LocalTasks, SyncQueue, FocusSchedules, BlockedApps])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 1;
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'db.sqlite'));
    return NativeDatabase(file);
  });
}
