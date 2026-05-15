// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'database.dart';

// ignore_for_file: type=lint
class $LocalTasksTable extends LocalTasks
    with TableInfo<$LocalTasksTable, LocalTask> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $LocalTasksTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<String> id = GeneratedColumn<String>(
      'id', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _titleMeta = const VerificationMeta('title');
  @override
  late final GeneratedColumn<String> title = GeneratedColumn<String>(
      'title', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _categoryMeta =
      const VerificationMeta('category');
  @override
  late final GeneratedColumn<String> category = GeneratedColumn<String>(
      'category', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _priorityMeta =
      const VerificationMeta('priority');
  @override
  late final GeneratedColumn<String> priority = GeneratedColumn<String>(
      'priority', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _statusMeta = const VerificationMeta('status');
  @override
  late final GeneratedColumn<String> status = GeneratedColumn<String>(
      'status', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _deadlineMeta =
      const VerificationMeta('deadline');
  @override
  late final GeneratedColumn<DateTime> deadline = GeneratedColumn<DateTime>(
      'deadline', aliasedName, true,
      type: DriftSqlType.dateTime, requiredDuringInsert: false);
  static const VerificationMeta _createdAtMeta =
      const VerificationMeta('createdAt');
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
      'created_at', aliasedName, false,
      type: DriftSqlType.dateTime, requiredDuringInsert: true);
  static const VerificationMeta _updatedAtMeta =
      const VerificationMeta('updatedAt');
  @override
  late final GeneratedColumn<DateTime> updatedAt = GeneratedColumn<DateTime>(
      'updated_at', aliasedName, false,
      type: DriftSqlType.dateTime, requiredDuringInsert: true);
  static const VerificationMeta _syncPendingMeta =
      const VerificationMeta('syncPending');
  @override
  late final GeneratedColumn<bool> syncPending = GeneratedColumn<bool>(
      'sync_pending', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints: GeneratedColumn.constraintIsAlways(
          'CHECK ("sync_pending" IN (0, 1))'),
      defaultValue: const Constant(false));
  static const VerificationMeta _localActionMeta =
      const VerificationMeta('localAction');
  @override
  late final GeneratedColumn<String> localAction = GeneratedColumn<String>(
      'local_action', aliasedName, true,
      type: DriftSqlType.string, requiredDuringInsert: false);
  @override
  List<GeneratedColumn> get $columns => [
        id,
        title,
        category,
        priority,
        status,
        deadline,
        createdAt,
        updatedAt,
        syncPending,
        localAction
      ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'local_tasks';
  @override
  VerificationContext validateIntegrity(Insertable<LocalTask> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    } else if (isInserting) {
      context.missing(_idMeta);
    }
    if (data.containsKey('title')) {
      context.handle(
          _titleMeta, title.isAcceptableOrUnknown(data['title']!, _titleMeta));
    } else if (isInserting) {
      context.missing(_titleMeta);
    }
    if (data.containsKey('category')) {
      context.handle(_categoryMeta,
          category.isAcceptableOrUnknown(data['category']!, _categoryMeta));
    } else if (isInserting) {
      context.missing(_categoryMeta);
    }
    if (data.containsKey('priority')) {
      context.handle(_priorityMeta,
          priority.isAcceptableOrUnknown(data['priority']!, _priorityMeta));
    } else if (isInserting) {
      context.missing(_priorityMeta);
    }
    if (data.containsKey('status')) {
      context.handle(_statusMeta,
          status.isAcceptableOrUnknown(data['status']!, _statusMeta));
    } else if (isInserting) {
      context.missing(_statusMeta);
    }
    if (data.containsKey('deadline')) {
      context.handle(_deadlineMeta,
          deadline.isAcceptableOrUnknown(data['deadline']!, _deadlineMeta));
    }
    if (data.containsKey('created_at')) {
      context.handle(_createdAtMeta,
          createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta));
    } else if (isInserting) {
      context.missing(_createdAtMeta);
    }
    if (data.containsKey('updated_at')) {
      context.handle(_updatedAtMeta,
          updatedAt.isAcceptableOrUnknown(data['updated_at']!, _updatedAtMeta));
    } else if (isInserting) {
      context.missing(_updatedAtMeta);
    }
    if (data.containsKey('sync_pending')) {
      context.handle(
          _syncPendingMeta,
          syncPending.isAcceptableOrUnknown(
              data['sync_pending']!, _syncPendingMeta));
    }
    if (data.containsKey('local_action')) {
      context.handle(
          _localActionMeta,
          localAction.isAcceptableOrUnknown(
              data['local_action']!, _localActionMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => const {};
  @override
  LocalTask map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return LocalTask(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      title: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}title'])!,
      category: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}category'])!,
      priority: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}priority'])!,
      status: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}status'])!,
      deadline: attachedDatabase.typeMapping
          .read(DriftSqlType.dateTime, data['${effectivePrefix}deadline']),
      createdAt: attachedDatabase.typeMapping
          .read(DriftSqlType.dateTime, data['${effectivePrefix}created_at'])!,
      updatedAt: attachedDatabase.typeMapping
          .read(DriftSqlType.dateTime, data['${effectivePrefix}updated_at'])!,
      syncPending: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}sync_pending'])!,
      localAction: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}local_action']),
    );
  }

  @override
  $LocalTasksTable createAlias(String alias) {
    return $LocalTasksTable(attachedDatabase, alias);
  }
}

class LocalTask extends DataClass implements Insertable<LocalTask> {
  final String id;
  final String title;
  final String category;
  final String priority;
  final String status;
  final DateTime? deadline;
  final DateTime createdAt;
  final DateTime updatedAt;
  final bool syncPending;
  final String? localAction;
  const LocalTask(
      {required this.id,
      required this.title,
      required this.category,
      required this.priority,
      required this.status,
      this.deadline,
      required this.createdAt,
      required this.updatedAt,
      required this.syncPending,
      this.localAction});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<String>(id);
    map['title'] = Variable<String>(title);
    map['category'] = Variable<String>(category);
    map['priority'] = Variable<String>(priority);
    map['status'] = Variable<String>(status);
    if (!nullToAbsent || deadline != null) {
      map['deadline'] = Variable<DateTime>(deadline);
    }
    map['created_at'] = Variable<DateTime>(createdAt);
    map['updated_at'] = Variable<DateTime>(updatedAt);
    map['sync_pending'] = Variable<bool>(syncPending);
    if (!nullToAbsent || localAction != null) {
      map['local_action'] = Variable<String>(localAction);
    }
    return map;
  }

  LocalTasksCompanion toCompanion(bool nullToAbsent) {
    return LocalTasksCompanion(
      id: Value(id),
      title: Value(title),
      category: Value(category),
      priority: Value(priority),
      status: Value(status),
      deadline: deadline == null && nullToAbsent
          ? const Value.absent()
          : Value(deadline),
      createdAt: Value(createdAt),
      updatedAt: Value(updatedAt),
      syncPending: Value(syncPending),
      localAction: localAction == null && nullToAbsent
          ? const Value.absent()
          : Value(localAction),
    );
  }

  factory LocalTask.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return LocalTask(
      id: serializer.fromJson<String>(json['id']),
      title: serializer.fromJson<String>(json['title']),
      category: serializer.fromJson<String>(json['category']),
      priority: serializer.fromJson<String>(json['priority']),
      status: serializer.fromJson<String>(json['status']),
      deadline: serializer.fromJson<DateTime?>(json['deadline']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
      updatedAt: serializer.fromJson<DateTime>(json['updatedAt']),
      syncPending: serializer.fromJson<bool>(json['syncPending']),
      localAction: serializer.fromJson<String?>(json['localAction']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<String>(id),
      'title': serializer.toJson<String>(title),
      'category': serializer.toJson<String>(category),
      'priority': serializer.toJson<String>(priority),
      'status': serializer.toJson<String>(status),
      'deadline': serializer.toJson<DateTime?>(deadline),
      'createdAt': serializer.toJson<DateTime>(createdAt),
      'updatedAt': serializer.toJson<DateTime>(updatedAt),
      'syncPending': serializer.toJson<bool>(syncPending),
      'localAction': serializer.toJson<String?>(localAction),
    };
  }

  LocalTask copyWith(
          {String? id,
          String? title,
          String? category,
          String? priority,
          String? status,
          Value<DateTime?> deadline = const Value.absent(),
          DateTime? createdAt,
          DateTime? updatedAt,
          bool? syncPending,
          Value<String?> localAction = const Value.absent()}) =>
      LocalTask(
        id: id ?? this.id,
        title: title ?? this.title,
        category: category ?? this.category,
        priority: priority ?? this.priority,
        status: status ?? this.status,
        deadline: deadline.present ? deadline.value : this.deadline,
        createdAt: createdAt ?? this.createdAt,
        updatedAt: updatedAt ?? this.updatedAt,
        syncPending: syncPending ?? this.syncPending,
        localAction: localAction.present ? localAction.value : this.localAction,
      );
  LocalTask copyWithCompanion(LocalTasksCompanion data) {
    return LocalTask(
      id: data.id.present ? data.id.value : this.id,
      title: data.title.present ? data.title.value : this.title,
      category: data.category.present ? data.category.value : this.category,
      priority: data.priority.present ? data.priority.value : this.priority,
      status: data.status.present ? data.status.value : this.status,
      deadline: data.deadline.present ? data.deadline.value : this.deadline,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
      updatedAt: data.updatedAt.present ? data.updatedAt.value : this.updatedAt,
      syncPending:
          data.syncPending.present ? data.syncPending.value : this.syncPending,
      localAction:
          data.localAction.present ? data.localAction.value : this.localAction,
    );
  }

  @override
  String toString() {
    return (StringBuffer('LocalTask(')
          ..write('id: $id, ')
          ..write('title: $title, ')
          ..write('category: $category, ')
          ..write('priority: $priority, ')
          ..write('status: $status, ')
          ..write('deadline: $deadline, ')
          ..write('createdAt: $createdAt, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('syncPending: $syncPending, ')
          ..write('localAction: $localAction')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, title, category, priority, status,
      deadline, createdAt, updatedAt, syncPending, localAction);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is LocalTask &&
          other.id == this.id &&
          other.title == this.title &&
          other.category == this.category &&
          other.priority == this.priority &&
          other.status == this.status &&
          other.deadline == this.deadline &&
          other.createdAt == this.createdAt &&
          other.updatedAt == this.updatedAt &&
          other.syncPending == this.syncPending &&
          other.localAction == this.localAction);
}

class LocalTasksCompanion extends UpdateCompanion<LocalTask> {
  final Value<String> id;
  final Value<String> title;
  final Value<String> category;
  final Value<String> priority;
  final Value<String> status;
  final Value<DateTime?> deadline;
  final Value<DateTime> createdAt;
  final Value<DateTime> updatedAt;
  final Value<bool> syncPending;
  final Value<String?> localAction;
  final Value<int> rowid;
  const LocalTasksCompanion({
    this.id = const Value.absent(),
    this.title = const Value.absent(),
    this.category = const Value.absent(),
    this.priority = const Value.absent(),
    this.status = const Value.absent(),
    this.deadline = const Value.absent(),
    this.createdAt = const Value.absent(),
    this.updatedAt = const Value.absent(),
    this.syncPending = const Value.absent(),
    this.localAction = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  LocalTasksCompanion.insert({
    required String id,
    required String title,
    required String category,
    required String priority,
    required String status,
    this.deadline = const Value.absent(),
    required DateTime createdAt,
    required DateTime updatedAt,
    this.syncPending = const Value.absent(),
    this.localAction = const Value.absent(),
    this.rowid = const Value.absent(),
  })  : id = Value(id),
        title = Value(title),
        category = Value(category),
        priority = Value(priority),
        status = Value(status),
        createdAt = Value(createdAt),
        updatedAt = Value(updatedAt);
  static Insertable<LocalTask> custom({
    Expression<String>? id,
    Expression<String>? title,
    Expression<String>? category,
    Expression<String>? priority,
    Expression<String>? status,
    Expression<DateTime>? deadline,
    Expression<DateTime>? createdAt,
    Expression<DateTime>? updatedAt,
    Expression<bool>? syncPending,
    Expression<String>? localAction,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (title != null) 'title': title,
      if (category != null) 'category': category,
      if (priority != null) 'priority': priority,
      if (status != null) 'status': status,
      if (deadline != null) 'deadline': deadline,
      if (createdAt != null) 'created_at': createdAt,
      if (updatedAt != null) 'updated_at': updatedAt,
      if (syncPending != null) 'sync_pending': syncPending,
      if (localAction != null) 'local_action': localAction,
      if (rowid != null) 'rowid': rowid,
    });
  }

  LocalTasksCompanion copyWith(
      {Value<String>? id,
      Value<String>? title,
      Value<String>? category,
      Value<String>? priority,
      Value<String>? status,
      Value<DateTime?>? deadline,
      Value<DateTime>? createdAt,
      Value<DateTime>? updatedAt,
      Value<bool>? syncPending,
      Value<String?>? localAction,
      Value<int>? rowid}) {
    return LocalTasksCompanion(
      id: id ?? this.id,
      title: title ?? this.title,
      category: category ?? this.category,
      priority: priority ?? this.priority,
      status: status ?? this.status,
      deadline: deadline ?? this.deadline,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      syncPending: syncPending ?? this.syncPending,
      localAction: localAction ?? this.localAction,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<String>(id.value);
    }
    if (title.present) {
      map['title'] = Variable<String>(title.value);
    }
    if (category.present) {
      map['category'] = Variable<String>(category.value);
    }
    if (priority.present) {
      map['priority'] = Variable<String>(priority.value);
    }
    if (status.present) {
      map['status'] = Variable<String>(status.value);
    }
    if (deadline.present) {
      map['deadline'] = Variable<DateTime>(deadline.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    if (updatedAt.present) {
      map['updated_at'] = Variable<DateTime>(updatedAt.value);
    }
    if (syncPending.present) {
      map['sync_pending'] = Variable<bool>(syncPending.value);
    }
    if (localAction.present) {
      map['local_action'] = Variable<String>(localAction.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('LocalTasksCompanion(')
          ..write('id: $id, ')
          ..write('title: $title, ')
          ..write('category: $category, ')
          ..write('priority: $priority, ')
          ..write('status: $status, ')
          ..write('deadline: $deadline, ')
          ..write('createdAt: $createdAt, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('syncPending: $syncPending, ')
          ..write('localAction: $localAction, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $SyncQueueTable extends SyncQueue
    with TableInfo<$SyncQueueTable, SyncQueueData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $SyncQueueTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
      'id', aliasedName, false,
      hasAutoIncrement: true,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('PRIMARY KEY AUTOINCREMENT'));
  static const VerificationMeta _endpointMeta =
      const VerificationMeta('endpoint');
  @override
  late final GeneratedColumn<String> endpoint = GeneratedColumn<String>(
      'endpoint', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _methodMeta = const VerificationMeta('method');
  @override
  late final GeneratedColumn<String> method = GeneratedColumn<String>(
      'method', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _bodyMeta = const VerificationMeta('body');
  @override
  late final GeneratedColumn<String> body = GeneratedColumn<String>(
      'body', aliasedName, true,
      type: DriftSqlType.string, requiredDuringInsert: false);
  static const VerificationMeta _createdAtMeta =
      const VerificationMeta('createdAt');
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
      'created_at', aliasedName, false,
      type: DriftSqlType.dateTime, requiredDuringInsert: true);
  static const VerificationMeta _retryCountMeta =
      const VerificationMeta('retryCount');
  @override
  late final GeneratedColumn<int> retryCount = GeneratedColumn<int>(
      'retry_count', aliasedName, false,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultValue: const Constant(0));
  @override
  List<GeneratedColumn> get $columns =>
      [id, endpoint, method, body, createdAt, retryCount];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'sync_queue';
  @override
  VerificationContext validateIntegrity(Insertable<SyncQueueData> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('endpoint')) {
      context.handle(_endpointMeta,
          endpoint.isAcceptableOrUnknown(data['endpoint']!, _endpointMeta));
    } else if (isInserting) {
      context.missing(_endpointMeta);
    }
    if (data.containsKey('method')) {
      context.handle(_methodMeta,
          method.isAcceptableOrUnknown(data['method']!, _methodMeta));
    } else if (isInserting) {
      context.missing(_methodMeta);
    }
    if (data.containsKey('body')) {
      context.handle(
          _bodyMeta, body.isAcceptableOrUnknown(data['body']!, _bodyMeta));
    }
    if (data.containsKey('created_at')) {
      context.handle(_createdAtMeta,
          createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta));
    } else if (isInserting) {
      context.missing(_createdAtMeta);
    }
    if (data.containsKey('retry_count')) {
      context.handle(
          _retryCountMeta,
          retryCount.isAcceptableOrUnknown(
              data['retry_count']!, _retryCountMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  SyncQueueData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return SyncQueueData(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}id'])!,
      endpoint: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}endpoint'])!,
      method: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}method'])!,
      body: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}body']),
      createdAt: attachedDatabase.typeMapping
          .read(DriftSqlType.dateTime, data['${effectivePrefix}created_at'])!,
      retryCount: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}retry_count'])!,
    );
  }

  @override
  $SyncQueueTable createAlias(String alias) {
    return $SyncQueueTable(attachedDatabase, alias);
  }
}

class SyncQueueData extends DataClass implements Insertable<SyncQueueData> {
  final int id;
  final String endpoint;
  final String method;
  final String? body;
  final DateTime createdAt;
  final int retryCount;
  const SyncQueueData(
      {required this.id,
      required this.endpoint,
      required this.method,
      this.body,
      required this.createdAt,
      required this.retryCount});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['endpoint'] = Variable<String>(endpoint);
    map['method'] = Variable<String>(method);
    if (!nullToAbsent || body != null) {
      map['body'] = Variable<String>(body);
    }
    map['created_at'] = Variable<DateTime>(createdAt);
    map['retry_count'] = Variable<int>(retryCount);
    return map;
  }

  SyncQueueCompanion toCompanion(bool nullToAbsent) {
    return SyncQueueCompanion(
      id: Value(id),
      endpoint: Value(endpoint),
      method: Value(method),
      body: body == null && nullToAbsent ? const Value.absent() : Value(body),
      createdAt: Value(createdAt),
      retryCount: Value(retryCount),
    );
  }

  factory SyncQueueData.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return SyncQueueData(
      id: serializer.fromJson<int>(json['id']),
      endpoint: serializer.fromJson<String>(json['endpoint']),
      method: serializer.fromJson<String>(json['method']),
      body: serializer.fromJson<String?>(json['body']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
      retryCount: serializer.fromJson<int>(json['retryCount']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'endpoint': serializer.toJson<String>(endpoint),
      'method': serializer.toJson<String>(method),
      'body': serializer.toJson<String?>(body),
      'createdAt': serializer.toJson<DateTime>(createdAt),
      'retryCount': serializer.toJson<int>(retryCount),
    };
  }

  SyncQueueData copyWith(
          {int? id,
          String? endpoint,
          String? method,
          Value<String?> body = const Value.absent(),
          DateTime? createdAt,
          int? retryCount}) =>
      SyncQueueData(
        id: id ?? this.id,
        endpoint: endpoint ?? this.endpoint,
        method: method ?? this.method,
        body: body.present ? body.value : this.body,
        createdAt: createdAt ?? this.createdAt,
        retryCount: retryCount ?? this.retryCount,
      );
  SyncQueueData copyWithCompanion(SyncQueueCompanion data) {
    return SyncQueueData(
      id: data.id.present ? data.id.value : this.id,
      endpoint: data.endpoint.present ? data.endpoint.value : this.endpoint,
      method: data.method.present ? data.method.value : this.method,
      body: data.body.present ? data.body.value : this.body,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
      retryCount:
          data.retryCount.present ? data.retryCount.value : this.retryCount,
    );
  }

  @override
  String toString() {
    return (StringBuffer('SyncQueueData(')
          ..write('id: $id, ')
          ..write('endpoint: $endpoint, ')
          ..write('method: $method, ')
          ..write('body: $body, ')
          ..write('createdAt: $createdAt, ')
          ..write('retryCount: $retryCount')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode =>
      Object.hash(id, endpoint, method, body, createdAt, retryCount);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is SyncQueueData &&
          other.id == this.id &&
          other.endpoint == this.endpoint &&
          other.method == this.method &&
          other.body == this.body &&
          other.createdAt == this.createdAt &&
          other.retryCount == this.retryCount);
}

class SyncQueueCompanion extends UpdateCompanion<SyncQueueData> {
  final Value<int> id;
  final Value<String> endpoint;
  final Value<String> method;
  final Value<String?> body;
  final Value<DateTime> createdAt;
  final Value<int> retryCount;
  const SyncQueueCompanion({
    this.id = const Value.absent(),
    this.endpoint = const Value.absent(),
    this.method = const Value.absent(),
    this.body = const Value.absent(),
    this.createdAt = const Value.absent(),
    this.retryCount = const Value.absent(),
  });
  SyncQueueCompanion.insert({
    this.id = const Value.absent(),
    required String endpoint,
    required String method,
    this.body = const Value.absent(),
    required DateTime createdAt,
    this.retryCount = const Value.absent(),
  })  : endpoint = Value(endpoint),
        method = Value(method),
        createdAt = Value(createdAt);
  static Insertable<SyncQueueData> custom({
    Expression<int>? id,
    Expression<String>? endpoint,
    Expression<String>? method,
    Expression<String>? body,
    Expression<DateTime>? createdAt,
    Expression<int>? retryCount,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (endpoint != null) 'endpoint': endpoint,
      if (method != null) 'method': method,
      if (body != null) 'body': body,
      if (createdAt != null) 'created_at': createdAt,
      if (retryCount != null) 'retry_count': retryCount,
    });
  }

  SyncQueueCompanion copyWith(
      {Value<int>? id,
      Value<String>? endpoint,
      Value<String>? method,
      Value<String?>? body,
      Value<DateTime>? createdAt,
      Value<int>? retryCount}) {
    return SyncQueueCompanion(
      id: id ?? this.id,
      endpoint: endpoint ?? this.endpoint,
      method: method ?? this.method,
      body: body ?? this.body,
      createdAt: createdAt ?? this.createdAt,
      retryCount: retryCount ?? this.retryCount,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (endpoint.present) {
      map['endpoint'] = Variable<String>(endpoint.value);
    }
    if (method.present) {
      map['method'] = Variable<String>(method.value);
    }
    if (body.present) {
      map['body'] = Variable<String>(body.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    if (retryCount.present) {
      map['retry_count'] = Variable<int>(retryCount.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('SyncQueueCompanion(')
          ..write('id: $id, ')
          ..write('endpoint: $endpoint, ')
          ..write('method: $method, ')
          ..write('body: $body, ')
          ..write('createdAt: $createdAt, ')
          ..write('retryCount: $retryCount')
          ..write(')'))
        .toString();
  }
}

class $FocusSchedulesTable extends FocusSchedules
    with TableInfo<$FocusSchedulesTable, FocusSchedule> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $FocusSchedulesTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
      'id', aliasedName, false,
      hasAutoIncrement: true,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('PRIMARY KEY AUTOINCREMENT'));
  static const VerificationMeta _nameMeta = const VerificationMeta('name');
  @override
  late final GeneratedColumn<String> name = GeneratedColumn<String>(
      'name', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _daysOfWeekMeta =
      const VerificationMeta('daysOfWeek');
  @override
  late final GeneratedColumn<String> daysOfWeek = GeneratedColumn<String>(
      'days_of_week', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _startHourMeta =
      const VerificationMeta('startHour');
  @override
  late final GeneratedColumn<int> startHour = GeneratedColumn<int>(
      'start_hour', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _startMinuteMeta =
      const VerificationMeta('startMinute');
  @override
  late final GeneratedColumn<int> startMinute = GeneratedColumn<int>(
      'start_minute', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _endHourMeta =
      const VerificationMeta('endHour');
  @override
  late final GeneratedColumn<int> endHour = GeneratedColumn<int>(
      'end_hour', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _endMinuteMeta =
      const VerificationMeta('endMinute');
  @override
  late final GeneratedColumn<int> endMinute = GeneratedColumn<int>(
      'end_minute', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _isActiveMeta =
      const VerificationMeta('isActive');
  @override
  late final GeneratedColumn<bool> isActive = GeneratedColumn<bool>(
      'is_active', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('CHECK ("is_active" IN (0, 1))'),
      defaultValue: const Constant(true));
  @override
  List<GeneratedColumn> get $columns => [
        id,
        name,
        daysOfWeek,
        startHour,
        startMinute,
        endHour,
        endMinute,
        isActive
      ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'focus_schedules';
  @override
  VerificationContext validateIntegrity(Insertable<FocusSchedule> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('name')) {
      context.handle(
          _nameMeta, name.isAcceptableOrUnknown(data['name']!, _nameMeta));
    } else if (isInserting) {
      context.missing(_nameMeta);
    }
    if (data.containsKey('days_of_week')) {
      context.handle(
          _daysOfWeekMeta,
          daysOfWeek.isAcceptableOrUnknown(
              data['days_of_week']!, _daysOfWeekMeta));
    } else if (isInserting) {
      context.missing(_daysOfWeekMeta);
    }
    if (data.containsKey('start_hour')) {
      context.handle(_startHourMeta,
          startHour.isAcceptableOrUnknown(data['start_hour']!, _startHourMeta));
    } else if (isInserting) {
      context.missing(_startHourMeta);
    }
    if (data.containsKey('start_minute')) {
      context.handle(
          _startMinuteMeta,
          startMinute.isAcceptableOrUnknown(
              data['start_minute']!, _startMinuteMeta));
    } else if (isInserting) {
      context.missing(_startMinuteMeta);
    }
    if (data.containsKey('end_hour')) {
      context.handle(_endHourMeta,
          endHour.isAcceptableOrUnknown(data['end_hour']!, _endHourMeta));
    } else if (isInserting) {
      context.missing(_endHourMeta);
    }
    if (data.containsKey('end_minute')) {
      context.handle(_endMinuteMeta,
          endMinute.isAcceptableOrUnknown(data['end_minute']!, _endMinuteMeta));
    } else if (isInserting) {
      context.missing(_endMinuteMeta);
    }
    if (data.containsKey('is_active')) {
      context.handle(_isActiveMeta,
          isActive.isAcceptableOrUnknown(data['is_active']!, _isActiveMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  FocusSchedule map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return FocusSchedule(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}id'])!,
      name: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}name'])!,
      daysOfWeek: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}days_of_week'])!,
      startHour: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}start_hour'])!,
      startMinute: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}start_minute'])!,
      endHour: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}end_hour'])!,
      endMinute: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}end_minute'])!,
      isActive: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}is_active'])!,
    );
  }

  @override
  $FocusSchedulesTable createAlias(String alias) {
    return $FocusSchedulesTable(attachedDatabase, alias);
  }
}

class FocusSchedule extends DataClass implements Insertable<FocusSchedule> {
  final int id;
  final String name;
  final String daysOfWeek;
  final int startHour;
  final int startMinute;
  final int endHour;
  final int endMinute;
  final bool isActive;
  const FocusSchedule(
      {required this.id,
      required this.name,
      required this.daysOfWeek,
      required this.startHour,
      required this.startMinute,
      required this.endHour,
      required this.endMinute,
      required this.isActive});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['name'] = Variable<String>(name);
    map['days_of_week'] = Variable<String>(daysOfWeek);
    map['start_hour'] = Variable<int>(startHour);
    map['start_minute'] = Variable<int>(startMinute);
    map['end_hour'] = Variable<int>(endHour);
    map['end_minute'] = Variable<int>(endMinute);
    map['is_active'] = Variable<bool>(isActive);
    return map;
  }

  FocusSchedulesCompanion toCompanion(bool nullToAbsent) {
    return FocusSchedulesCompanion(
      id: Value(id),
      name: Value(name),
      daysOfWeek: Value(daysOfWeek),
      startHour: Value(startHour),
      startMinute: Value(startMinute),
      endHour: Value(endHour),
      endMinute: Value(endMinute),
      isActive: Value(isActive),
    );
  }

  factory FocusSchedule.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return FocusSchedule(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String>(json['name']),
      daysOfWeek: serializer.fromJson<String>(json['daysOfWeek']),
      startHour: serializer.fromJson<int>(json['startHour']),
      startMinute: serializer.fromJson<int>(json['startMinute']),
      endHour: serializer.fromJson<int>(json['endHour']),
      endMinute: serializer.fromJson<int>(json['endMinute']),
      isActive: serializer.fromJson<bool>(json['isActive']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String>(name),
      'daysOfWeek': serializer.toJson<String>(daysOfWeek),
      'startHour': serializer.toJson<int>(startHour),
      'startMinute': serializer.toJson<int>(startMinute),
      'endHour': serializer.toJson<int>(endHour),
      'endMinute': serializer.toJson<int>(endMinute),
      'isActive': serializer.toJson<bool>(isActive),
    };
  }

  FocusSchedule copyWith(
          {int? id,
          String? name,
          String? daysOfWeek,
          int? startHour,
          int? startMinute,
          int? endHour,
          int? endMinute,
          bool? isActive}) =>
      FocusSchedule(
        id: id ?? this.id,
        name: name ?? this.name,
        daysOfWeek: daysOfWeek ?? this.daysOfWeek,
        startHour: startHour ?? this.startHour,
        startMinute: startMinute ?? this.startMinute,
        endHour: endHour ?? this.endHour,
        endMinute: endMinute ?? this.endMinute,
        isActive: isActive ?? this.isActive,
      );
  FocusSchedule copyWithCompanion(FocusSchedulesCompanion data) {
    return FocusSchedule(
      id: data.id.present ? data.id.value : this.id,
      name: data.name.present ? data.name.value : this.name,
      daysOfWeek:
          data.daysOfWeek.present ? data.daysOfWeek.value : this.daysOfWeek,
      startHour: data.startHour.present ? data.startHour.value : this.startHour,
      startMinute:
          data.startMinute.present ? data.startMinute.value : this.startMinute,
      endHour: data.endHour.present ? data.endHour.value : this.endHour,
      endMinute: data.endMinute.present ? data.endMinute.value : this.endMinute,
      isActive: data.isActive.present ? data.isActive.value : this.isActive,
    );
  }

  @override
  String toString() {
    return (StringBuffer('FocusSchedule(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('daysOfWeek: $daysOfWeek, ')
          ..write('startHour: $startHour, ')
          ..write('startMinute: $startMinute, ')
          ..write('endHour: $endHour, ')
          ..write('endMinute: $endMinute, ')
          ..write('isActive: $isActive')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, name, daysOfWeek, startHour, startMinute,
      endHour, endMinute, isActive);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is FocusSchedule &&
          other.id == this.id &&
          other.name == this.name &&
          other.daysOfWeek == this.daysOfWeek &&
          other.startHour == this.startHour &&
          other.startMinute == this.startMinute &&
          other.endHour == this.endHour &&
          other.endMinute == this.endMinute &&
          other.isActive == this.isActive);
}

class FocusSchedulesCompanion extends UpdateCompanion<FocusSchedule> {
  final Value<int> id;
  final Value<String> name;
  final Value<String> daysOfWeek;
  final Value<int> startHour;
  final Value<int> startMinute;
  final Value<int> endHour;
  final Value<int> endMinute;
  final Value<bool> isActive;
  const FocusSchedulesCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.daysOfWeek = const Value.absent(),
    this.startHour = const Value.absent(),
    this.startMinute = const Value.absent(),
    this.endHour = const Value.absent(),
    this.endMinute = const Value.absent(),
    this.isActive = const Value.absent(),
  });
  FocusSchedulesCompanion.insert({
    this.id = const Value.absent(),
    required String name,
    required String daysOfWeek,
    required int startHour,
    required int startMinute,
    required int endHour,
    required int endMinute,
    this.isActive = const Value.absent(),
  })  : name = Value(name),
        daysOfWeek = Value(daysOfWeek),
        startHour = Value(startHour),
        startMinute = Value(startMinute),
        endHour = Value(endHour),
        endMinute = Value(endMinute);
  static Insertable<FocusSchedule> custom({
    Expression<int>? id,
    Expression<String>? name,
    Expression<String>? daysOfWeek,
    Expression<int>? startHour,
    Expression<int>? startMinute,
    Expression<int>? endHour,
    Expression<int>? endMinute,
    Expression<bool>? isActive,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (name != null) 'name': name,
      if (daysOfWeek != null) 'days_of_week': daysOfWeek,
      if (startHour != null) 'start_hour': startHour,
      if (startMinute != null) 'start_minute': startMinute,
      if (endHour != null) 'end_hour': endHour,
      if (endMinute != null) 'end_minute': endMinute,
      if (isActive != null) 'is_active': isActive,
    });
  }

  FocusSchedulesCompanion copyWith(
      {Value<int>? id,
      Value<String>? name,
      Value<String>? daysOfWeek,
      Value<int>? startHour,
      Value<int>? startMinute,
      Value<int>? endHour,
      Value<int>? endMinute,
      Value<bool>? isActive}) {
    return FocusSchedulesCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
      daysOfWeek: daysOfWeek ?? this.daysOfWeek,
      startHour: startHour ?? this.startHour,
      startMinute: startMinute ?? this.startMinute,
      endHour: endHour ?? this.endHour,
      endMinute: endMinute ?? this.endMinute,
      isActive: isActive ?? this.isActive,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (name.present) {
      map['name'] = Variable<String>(name.value);
    }
    if (daysOfWeek.present) {
      map['days_of_week'] = Variable<String>(daysOfWeek.value);
    }
    if (startHour.present) {
      map['start_hour'] = Variable<int>(startHour.value);
    }
    if (startMinute.present) {
      map['start_minute'] = Variable<int>(startMinute.value);
    }
    if (endHour.present) {
      map['end_hour'] = Variable<int>(endHour.value);
    }
    if (endMinute.present) {
      map['end_minute'] = Variable<int>(endMinute.value);
    }
    if (isActive.present) {
      map['is_active'] = Variable<bool>(isActive.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('FocusSchedulesCompanion(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('daysOfWeek: $daysOfWeek, ')
          ..write('startHour: $startHour, ')
          ..write('startMinute: $startMinute, ')
          ..write('endHour: $endHour, ')
          ..write('endMinute: $endMinute, ')
          ..write('isActive: $isActive')
          ..write(')'))
        .toString();
  }
}

abstract class _$AppDatabase extends GeneratedDatabase {
  _$AppDatabase(QueryExecutor e) : super(e);
  $AppDatabaseManager get managers => $AppDatabaseManager(this);
  late final $LocalTasksTable localTasks = $LocalTasksTable(this);
  late final $SyncQueueTable syncQueue = $SyncQueueTable(this);
  late final $FocusSchedulesTable focusSchedules = $FocusSchedulesTable(this);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities =>
      [localTasks, syncQueue, focusSchedules];
}

typedef $$LocalTasksTableCreateCompanionBuilder = LocalTasksCompanion Function({
  required String id,
  required String title,
  required String category,
  required String priority,
  required String status,
  Value<DateTime?> deadline,
  required DateTime createdAt,
  required DateTime updatedAt,
  Value<bool> syncPending,
  Value<String?> localAction,
  Value<int> rowid,
});
typedef $$LocalTasksTableUpdateCompanionBuilder = LocalTasksCompanion Function({
  Value<String> id,
  Value<String> title,
  Value<String> category,
  Value<String> priority,
  Value<String> status,
  Value<DateTime?> deadline,
  Value<DateTime> createdAt,
  Value<DateTime> updatedAt,
  Value<bool> syncPending,
  Value<String?> localAction,
  Value<int> rowid,
});

class $$LocalTasksTableFilterComposer
    extends Composer<_$AppDatabase, $LocalTasksTable> {
  $$LocalTasksTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get title => $composableBuilder(
      column: $table.title, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get category => $composableBuilder(
      column: $table.category, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get priority => $composableBuilder(
      column: $table.priority, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get status => $composableBuilder(
      column: $table.status, builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get deadline => $composableBuilder(
      column: $table.deadline, builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
      column: $table.createdAt, builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get updatedAt => $composableBuilder(
      column: $table.updatedAt, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get syncPending => $composableBuilder(
      column: $table.syncPending, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get localAction => $composableBuilder(
      column: $table.localAction, builder: (column) => ColumnFilters(column));
}

class $$LocalTasksTableOrderingComposer
    extends Composer<_$AppDatabase, $LocalTasksTable> {
  $$LocalTasksTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get title => $composableBuilder(
      column: $table.title, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get category => $composableBuilder(
      column: $table.category, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get priority => $composableBuilder(
      column: $table.priority, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get status => $composableBuilder(
      column: $table.status, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get deadline => $composableBuilder(
      column: $table.deadline, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
      column: $table.createdAt, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get updatedAt => $composableBuilder(
      column: $table.updatedAt, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get syncPending => $composableBuilder(
      column: $table.syncPending, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get localAction => $composableBuilder(
      column: $table.localAction, builder: (column) => ColumnOrderings(column));
}

class $$LocalTasksTableAnnotationComposer
    extends Composer<_$AppDatabase, $LocalTasksTable> {
  $$LocalTasksTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get title =>
      $composableBuilder(column: $table.title, builder: (column) => column);

  GeneratedColumn<String> get category =>
      $composableBuilder(column: $table.category, builder: (column) => column);

  GeneratedColumn<String> get priority =>
      $composableBuilder(column: $table.priority, builder: (column) => column);

  GeneratedColumn<String> get status =>
      $composableBuilder(column: $table.status, builder: (column) => column);

  GeneratedColumn<DateTime> get deadline =>
      $composableBuilder(column: $table.deadline, builder: (column) => column);

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);

  GeneratedColumn<DateTime> get updatedAt =>
      $composableBuilder(column: $table.updatedAt, builder: (column) => column);

  GeneratedColumn<bool> get syncPending => $composableBuilder(
      column: $table.syncPending, builder: (column) => column);

  GeneratedColumn<String> get localAction => $composableBuilder(
      column: $table.localAction, builder: (column) => column);
}

class $$LocalTasksTableTableManager extends RootTableManager<
    _$AppDatabase,
    $LocalTasksTable,
    LocalTask,
    $$LocalTasksTableFilterComposer,
    $$LocalTasksTableOrderingComposer,
    $$LocalTasksTableAnnotationComposer,
    $$LocalTasksTableCreateCompanionBuilder,
    $$LocalTasksTableUpdateCompanionBuilder,
    (LocalTask, BaseReferences<_$AppDatabase, $LocalTasksTable, LocalTask>),
    LocalTask,
    PrefetchHooks Function()> {
  $$LocalTasksTableTableManager(_$AppDatabase db, $LocalTasksTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$LocalTasksTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$LocalTasksTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$LocalTasksTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<String> id = const Value.absent(),
            Value<String> title = const Value.absent(),
            Value<String> category = const Value.absent(),
            Value<String> priority = const Value.absent(),
            Value<String> status = const Value.absent(),
            Value<DateTime?> deadline = const Value.absent(),
            Value<DateTime> createdAt = const Value.absent(),
            Value<DateTime> updatedAt = const Value.absent(),
            Value<bool> syncPending = const Value.absent(),
            Value<String?> localAction = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalTasksCompanion(
            id: id,
            title: title,
            category: category,
            priority: priority,
            status: status,
            deadline: deadline,
            createdAt: createdAt,
            updatedAt: updatedAt,
            syncPending: syncPending,
            localAction: localAction,
            rowid: rowid,
          ),
          createCompanionCallback: ({
            required String id,
            required String title,
            required String category,
            required String priority,
            required String status,
            Value<DateTime?> deadline = const Value.absent(),
            required DateTime createdAt,
            required DateTime updatedAt,
            Value<bool> syncPending = const Value.absent(),
            Value<String?> localAction = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalTasksCompanion.insert(
            id: id,
            title: title,
            category: category,
            priority: priority,
            status: status,
            deadline: deadline,
            createdAt: createdAt,
            updatedAt: updatedAt,
            syncPending: syncPending,
            localAction: localAction,
            rowid: rowid,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$LocalTasksTableProcessedTableManager = ProcessedTableManager<
    _$AppDatabase,
    $LocalTasksTable,
    LocalTask,
    $$LocalTasksTableFilterComposer,
    $$LocalTasksTableOrderingComposer,
    $$LocalTasksTableAnnotationComposer,
    $$LocalTasksTableCreateCompanionBuilder,
    $$LocalTasksTableUpdateCompanionBuilder,
    (LocalTask, BaseReferences<_$AppDatabase, $LocalTasksTable, LocalTask>),
    LocalTask,
    PrefetchHooks Function()>;
typedef $$SyncQueueTableCreateCompanionBuilder = SyncQueueCompanion Function({
  Value<int> id,
  required String endpoint,
  required String method,
  Value<String?> body,
  required DateTime createdAt,
  Value<int> retryCount,
});
typedef $$SyncQueueTableUpdateCompanionBuilder = SyncQueueCompanion Function({
  Value<int> id,
  Value<String> endpoint,
  Value<String> method,
  Value<String?> body,
  Value<DateTime> createdAt,
  Value<int> retryCount,
});

class $$SyncQueueTableFilterComposer
    extends Composer<_$AppDatabase, $SyncQueueTable> {
  $$SyncQueueTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get endpoint => $composableBuilder(
      column: $table.endpoint, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get method => $composableBuilder(
      column: $table.method, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get body => $composableBuilder(
      column: $table.body, builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
      column: $table.createdAt, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get retryCount => $composableBuilder(
      column: $table.retryCount, builder: (column) => ColumnFilters(column));
}

class $$SyncQueueTableOrderingComposer
    extends Composer<_$AppDatabase, $SyncQueueTable> {
  $$SyncQueueTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get endpoint => $composableBuilder(
      column: $table.endpoint, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get method => $composableBuilder(
      column: $table.method, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get body => $composableBuilder(
      column: $table.body, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
      column: $table.createdAt, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get retryCount => $composableBuilder(
      column: $table.retryCount, builder: (column) => ColumnOrderings(column));
}

class $$SyncQueueTableAnnotationComposer
    extends Composer<_$AppDatabase, $SyncQueueTable> {
  $$SyncQueueTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get endpoint =>
      $composableBuilder(column: $table.endpoint, builder: (column) => column);

  GeneratedColumn<String> get method =>
      $composableBuilder(column: $table.method, builder: (column) => column);

  GeneratedColumn<String> get body =>
      $composableBuilder(column: $table.body, builder: (column) => column);

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);

  GeneratedColumn<int> get retryCount => $composableBuilder(
      column: $table.retryCount, builder: (column) => column);
}

class $$SyncQueueTableTableManager extends RootTableManager<
    _$AppDatabase,
    $SyncQueueTable,
    SyncQueueData,
    $$SyncQueueTableFilterComposer,
    $$SyncQueueTableOrderingComposer,
    $$SyncQueueTableAnnotationComposer,
    $$SyncQueueTableCreateCompanionBuilder,
    $$SyncQueueTableUpdateCompanionBuilder,
    (
      SyncQueueData,
      BaseReferences<_$AppDatabase, $SyncQueueTable, SyncQueueData>
    ),
    SyncQueueData,
    PrefetchHooks Function()> {
  $$SyncQueueTableTableManager(_$AppDatabase db, $SyncQueueTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$SyncQueueTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$SyncQueueTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$SyncQueueTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<int> id = const Value.absent(),
            Value<String> endpoint = const Value.absent(),
            Value<String> method = const Value.absent(),
            Value<String?> body = const Value.absent(),
            Value<DateTime> createdAt = const Value.absent(),
            Value<int> retryCount = const Value.absent(),
          }) =>
              SyncQueueCompanion(
            id: id,
            endpoint: endpoint,
            method: method,
            body: body,
            createdAt: createdAt,
            retryCount: retryCount,
          ),
          createCompanionCallback: ({
            Value<int> id = const Value.absent(),
            required String endpoint,
            required String method,
            Value<String?> body = const Value.absent(),
            required DateTime createdAt,
            Value<int> retryCount = const Value.absent(),
          }) =>
              SyncQueueCompanion.insert(
            id: id,
            endpoint: endpoint,
            method: method,
            body: body,
            createdAt: createdAt,
            retryCount: retryCount,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$SyncQueueTableProcessedTableManager = ProcessedTableManager<
    _$AppDatabase,
    $SyncQueueTable,
    SyncQueueData,
    $$SyncQueueTableFilterComposer,
    $$SyncQueueTableOrderingComposer,
    $$SyncQueueTableAnnotationComposer,
    $$SyncQueueTableCreateCompanionBuilder,
    $$SyncQueueTableUpdateCompanionBuilder,
    (
      SyncQueueData,
      BaseReferences<_$AppDatabase, $SyncQueueTable, SyncQueueData>
    ),
    SyncQueueData,
    PrefetchHooks Function()>;
typedef $$FocusSchedulesTableCreateCompanionBuilder = FocusSchedulesCompanion
    Function({
  Value<int> id,
  required String name,
  required String daysOfWeek,
  required int startHour,
  required int startMinute,
  required int endHour,
  required int endMinute,
  Value<bool> isActive,
});
typedef $$FocusSchedulesTableUpdateCompanionBuilder = FocusSchedulesCompanion
    Function({
  Value<int> id,
  Value<String> name,
  Value<String> daysOfWeek,
  Value<int> startHour,
  Value<int> startMinute,
  Value<int> endHour,
  Value<int> endMinute,
  Value<bool> isActive,
});

class $$FocusSchedulesTableFilterComposer
    extends Composer<_$AppDatabase, $FocusSchedulesTable> {
  $$FocusSchedulesTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get name => $composableBuilder(
      column: $table.name, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get daysOfWeek => $composableBuilder(
      column: $table.daysOfWeek, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get startHour => $composableBuilder(
      column: $table.startHour, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get startMinute => $composableBuilder(
      column: $table.startMinute, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get endHour => $composableBuilder(
      column: $table.endHour, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get endMinute => $composableBuilder(
      column: $table.endMinute, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get isActive => $composableBuilder(
      column: $table.isActive, builder: (column) => ColumnFilters(column));
}

class $$FocusSchedulesTableOrderingComposer
    extends Composer<_$AppDatabase, $FocusSchedulesTable> {
  $$FocusSchedulesTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get name => $composableBuilder(
      column: $table.name, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get daysOfWeek => $composableBuilder(
      column: $table.daysOfWeek, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get startHour => $composableBuilder(
      column: $table.startHour, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get startMinute => $composableBuilder(
      column: $table.startMinute, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get endHour => $composableBuilder(
      column: $table.endHour, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get endMinute => $composableBuilder(
      column: $table.endMinute, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get isActive => $composableBuilder(
      column: $table.isActive, builder: (column) => ColumnOrderings(column));
}

class $$FocusSchedulesTableAnnotationComposer
    extends Composer<_$AppDatabase, $FocusSchedulesTable> {
  $$FocusSchedulesTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get name =>
      $composableBuilder(column: $table.name, builder: (column) => column);

  GeneratedColumn<String> get daysOfWeek => $composableBuilder(
      column: $table.daysOfWeek, builder: (column) => column);

  GeneratedColumn<int> get startHour =>
      $composableBuilder(column: $table.startHour, builder: (column) => column);

  GeneratedColumn<int> get startMinute => $composableBuilder(
      column: $table.startMinute, builder: (column) => column);

  GeneratedColumn<int> get endHour =>
      $composableBuilder(column: $table.endHour, builder: (column) => column);

  GeneratedColumn<int> get endMinute =>
      $composableBuilder(column: $table.endMinute, builder: (column) => column);

  GeneratedColumn<bool> get isActive =>
      $composableBuilder(column: $table.isActive, builder: (column) => column);
}

class $$FocusSchedulesTableTableManager extends RootTableManager<
    _$AppDatabase,
    $FocusSchedulesTable,
    FocusSchedule,
    $$FocusSchedulesTableFilterComposer,
    $$FocusSchedulesTableOrderingComposer,
    $$FocusSchedulesTableAnnotationComposer,
    $$FocusSchedulesTableCreateCompanionBuilder,
    $$FocusSchedulesTableUpdateCompanionBuilder,
    (
      FocusSchedule,
      BaseReferences<_$AppDatabase, $FocusSchedulesTable, FocusSchedule>
    ),
    FocusSchedule,
    PrefetchHooks Function()> {
  $$FocusSchedulesTableTableManager(
      _$AppDatabase db, $FocusSchedulesTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$FocusSchedulesTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$FocusSchedulesTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$FocusSchedulesTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<int> id = const Value.absent(),
            Value<String> name = const Value.absent(),
            Value<String> daysOfWeek = const Value.absent(),
            Value<int> startHour = const Value.absent(),
            Value<int> startMinute = const Value.absent(),
            Value<int> endHour = const Value.absent(),
            Value<int> endMinute = const Value.absent(),
            Value<bool> isActive = const Value.absent(),
          }) =>
              FocusSchedulesCompanion(
            id: id,
            name: name,
            daysOfWeek: daysOfWeek,
            startHour: startHour,
            startMinute: startMinute,
            endHour: endHour,
            endMinute: endMinute,
            isActive: isActive,
          ),
          createCompanionCallback: ({
            Value<int> id = const Value.absent(),
            required String name,
            required String daysOfWeek,
            required int startHour,
            required int startMinute,
            required int endHour,
            required int endMinute,
            Value<bool> isActive = const Value.absent(),
          }) =>
              FocusSchedulesCompanion.insert(
            id: id,
            name: name,
            daysOfWeek: daysOfWeek,
            startHour: startHour,
            startMinute: startMinute,
            endHour: endHour,
            endMinute: endMinute,
            isActive: isActive,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$FocusSchedulesTableProcessedTableManager = ProcessedTableManager<
    _$AppDatabase,
    $FocusSchedulesTable,
    FocusSchedule,
    $$FocusSchedulesTableFilterComposer,
    $$FocusSchedulesTableOrderingComposer,
    $$FocusSchedulesTableAnnotationComposer,
    $$FocusSchedulesTableCreateCompanionBuilder,
    $$FocusSchedulesTableUpdateCompanionBuilder,
    (
      FocusSchedule,
      BaseReferences<_$AppDatabase, $FocusSchedulesTable, FocusSchedule>
    ),
    FocusSchedule,
    PrefetchHooks Function()>;

class $AppDatabaseManager {
  final _$AppDatabase _db;
  $AppDatabaseManager(this._db);
  $$LocalTasksTableTableManager get localTasks =>
      $$LocalTasksTableTableManager(_db, _db.localTasks);
  $$SyncQueueTableTableManager get syncQueue =>
      $$SyncQueueTableTableManager(_db, _db.syncQueue);
  $$FocusSchedulesTableTableManager get focusSchedules =>
      $$FocusSchedulesTableTableManager(_db, _db.focusSchedules);
}
