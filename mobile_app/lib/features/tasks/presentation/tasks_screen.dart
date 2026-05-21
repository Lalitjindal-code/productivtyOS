import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_card.dart';
import '../../../shared/widgets/loading_skeleton.dart';
import '../../../shared/widgets/priority_badge.dart';
import '../data/task_repository.dart';

class TasksScreen extends ConsumerStatefulWidget {
  const TasksScreen({super.key});

  @override
  ConsumerState<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends ConsumerState<TasksScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabs;
  final _filters = ['all', 'today', 'completed'];
  final _labels  = ['All', 'Today', 'Done'];
  int _tabIdx = 0;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: _filters.length, vsync: this)
      ..addListener(() { if (!_tabs.indexIsChanging) setState(() => _tabIdx = _tabs.index); });
  }

  @override
  void dispose() { _tabs.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final filter = _filters[_tabIdx];
    final tasksAsync = ref.watch(tasksProvider(filter));

    return Scaffold(
      appBar: AppBar(
        title: Text('MISSION LOG', style: AppTypography.displaySm),
        bottom: TabBar(
          controller: _tabs,
          labelColor: AppColors.primary400,
          unselectedLabelColor: AppColors.textSecondary,
          indicatorColor: AppColors.primary400,
          indicatorWeight: 2,
          tabs: _labels.map((l) => Tab(text: l)).toList(),
        ),
      ),
      body: RefreshIndicator(
        color: AppColors.primary400,
        backgroundColor: AppColors.bgSurface,
        onRefresh: () async => ref.invalidate(tasksProvider(filter)),
        child: tasksAsync.when(
          data: (tasks) {
            if (tasks.isEmpty) {
              return _EmptyTasks(filter: filter);
            }
            return ListView.builder(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 80),
              itemCount: tasks.length,
              itemBuilder: (ctx, i) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: _TaskCard(
                  task: tasks[i],
                  onComplete: () async {
                    await ref.read(taskRepositoryProvider).completeTask(tasks[i].id);
                    ref.invalidate(tasksProvider(filter));
                  },
                  onDelete: () async {
                    await ref.read(taskRepositoryProvider).deleteTask(tasks[i].id);
                    ref.invalidate(tasksProvider(filter));
                  },
                ).animate().fadeIn(delay: (i * 40).ms).slideX(begin: 0.05),
              ),
            );
          },
          loading: () => ListView(
            padding: AppSpacing.screenPadding,
            children: List.generate(5, (_) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: SkeletonCard(lines: 3),
            )),
          ),
          error: (e, _) => Center(
            child: Text('Failed to load tasks.\n$e', style: AppTypography.bodySm.copyWith(color: AppColors.danger), textAlign: TextAlign.center),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.primary400,
        foregroundColor: AppColors.bgBase,
        icon: const Icon(Icons.add_rounded),
        label: Text('New Task', style: AppTypography.bodyMd.copyWith(fontWeight: FontWeight.w700, color: AppColors.bgBase)),
        onPressed: () => _showAddSheet(context, filter),
      ),
    );
  }

  void _showAddSheet(BuildContext context, String filter) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.bgSurface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => _AddTaskSheet(onCreated: () => ref.invalidate(tasksProvider(filter))),
    );
  }
}

// ── Task Card ─────────────────────────────────────────────────────────
class _TaskCard extends StatelessWidget {
  final Task task;
  final VoidCallback onComplete;
  final VoidCallback onDelete;
  const _TaskCard({required this.task, required this.onComplete, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    return Slidable(
      key: ValueKey(task.id),
      startActionPane: ActionPane(
        motion: const DrawerMotion(),
        extentRatio: 0.25,
        children: [
          SlidableAction(
            onPressed: (_) => onComplete(),
            backgroundColor: AppColors.success,
            foregroundColor: Colors.white,
            icon: Icons.check_rounded,
            label: 'Done',
            borderRadius: const BorderRadius.horizontal(left: Radius.circular(16)),
          ),
        ],
      ),
      endActionPane: ActionPane(
        motion: const DrawerMotion(),
        extentRatio: 0.25,
        children: [
          SlidableAction(
            onPressed: (_) => onDelete(),
            backgroundColor: AppColors.danger,
            foregroundColor: Colors.white,
            icon: Icons.delete_outline_rounded,
            label: 'Delete',
            borderRadius: const BorderRadius.horizontal(right: Radius.circular(16)),
          ),
        ],
      ),
      child: AppCard(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(
              task.isCompleted ? Icons.check_circle_rounded : Icons.circle_outlined,
              color: task.isCompleted ? AppColors.success : AppColors.textMuted,
              size: 22,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    task.title,
                    style: AppTypography.bodyMd.copyWith(
                      decoration: task.isCompleted ? TextDecoration.lineThrough : null,
                      color: task.isCompleted ? AppColors.textSecondary : AppColors.textPrimary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Wrap(
                    spacing: 8,
                    runSpacing: 4,
                    children: [
                      _Chip(task.category, AppColors.textMuted),
                      if (task.deadline != null)
                        _Chip('Due ${DateFormat('MMM d').format(task.deadline!)}', AppColors.warning),
                      if (task.estimatedDuration != null)
                        _Chip('${task.estimatedDuration}m', AppColors.plasma400),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            PriorityBadge(priority: task.priority),
          ],
        ),
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  final String label;
  final Color color;
  const _Chip(this.label, this.color);

  @override
  Widget build(BuildContext context) => Text(
    label,
    style: AppTypography.labelSm.copyWith(color: color, fontSize: 10),
  );
}

// ── Empty State ───────────────────────────────────────────────────────
class _EmptyTasks extends StatelessWidget {
  final String filter;
  const _EmptyTasks({required this.filter});

  @override
  Widget build(BuildContext context) {
    final msg = filter == 'completed' ? 'No completed tasks yet.' : 'Sector clear. No active directives.';
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.task_alt, size: 64, color: AppColors.textMuted),
          const SizedBox(height: 16),
          Text(msg, style: AppTypography.bodyMd.copyWith(color: AppColors.textSecondary), textAlign: TextAlign.center),
        ],
      ),
    );
  }
}

// ── Add Task Bottom Sheet ─────────────────────────────────────────────
class _AddTaskSheet extends ConsumerStatefulWidget {
  final VoidCallback onCreated;
  const _AddTaskSheet({required this.onCreated});

  @override
  ConsumerState<_AddTaskSheet> createState() => _AddTaskSheetState();
}

class _AddTaskSheetState extends ConsumerState<_AddTaskSheet> {
  final _titleCtrl    = TextEditingController();
  String _priority    = 'medium';
  String _category    = 'personal';
  bool _loading       = false;

  final _priorities = ['high', 'medium', 'low'];
  final _categories = ['work', 'study', 'gym', 'personal', 'health', 'creative', 'finance'];

  @override
  void dispose() { _titleCtrl.dispose(); super.dispose(); }

  Future<void> _submit() async {
    if (_titleCtrl.text.trim().isEmpty) return;
    setState(() => _loading = true);
    try {
      await ref.read(taskRepositoryProvider).createTask(
        title: _titleCtrl.text.trim(),
        priority: _priority,
        category: _category,
      );
      widget.onCreated();
      if (mounted) Navigator.pop(context);
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
        left: 20, right: 20, top: 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('New Directive', style: AppTypography.displaySm),
          const SizedBox(height: 20),

          TextField(
            controller: _titleCtrl,
            autofocus: true,
            style: AppTypography.bodyLg,
            decoration: const InputDecoration(hintText: 'What must be done?'),
          ),
          const SizedBox(height: 16),

          // Priority
          Text('Priority', style: AppTypography.labelMd),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            children: _priorities.map((p) => ChoiceChip(
              label: Text(p.toUpperCase(), style: AppTypography.labelSm),
              selected: _priority == p,
              onSelected: (_) => setState(() => _priority = p),
              selectedColor: AppColors.primary400.withValues(alpha: 0.2),
              backgroundColor: AppColors.bgElevated,
            )).toList(),
          ),
          const SizedBox(height: 12),

          // Category
          Text('Category', style: AppTypography.labelMd),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 4,
            children: _categories.map((c) => ChoiceChip(
              label: Text(c, style: AppTypography.labelSm),
              selected: _category == c,
              onSelected: (_) => setState(() => _category = c),
              selectedColor: AppColors.primary400.withValues(alpha: 0.2),
              backgroundColor: AppColors.bgElevated,
            )).toList(),
          ),
          const SizedBox(height: 24),

          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton(
              onPressed: _loading ? null : _submit,
              child: _loading
                  ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.bgBase))
                  : const Text('CREATE DIRECTIVE'),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}
