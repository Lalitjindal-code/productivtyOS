class TaskModel {
  final String id;
  final String title;
  final String category;
  final String priority;
  final String status;
  final DateTime? deadline;
  final DateTime createdAt;
  final DateTime updatedAt;

  TaskModel({
    required this.id,
    required this.title,
    required this.category,
    required this.priority,
    required this.status,
    this.deadline,
    required this.createdAt,
    required this.updatedAt,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['_id'] ?? json['id'],
      title: json['title'] ?? '',
      category: json['category'] ?? 'personal',
      priority: json['priority'] ?? 'medium',
      status: json['status'] ?? 'pending',
      deadline: json['deadline'] != null ? DateTime.parse(json['deadline']) : null,
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : DateTime.now(),
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'category': category,
      'priority': priority,
      'status': status,
      'deadline': deadline?.toIso8601String(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
