import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_card.dart';
import '../../../shared/widgets/loading_skeleton.dart';
import '../../../core/network/dio_client.dart';
import '../../../core/constants/api_constants.dart';

// ── Models ────────────────────────────────────────────────────────────
class GoalMilestone {
  final String id;
  final String title;
  final bool completed;

  const GoalMilestone({required this.id, required this.title, required this.completed});

  factory GoalMilestone.fromJson(Map<String, dynamic> json) => GoalMilestone(
    id: json['_id']?.toString() ?? '',
    title: json['title']?.toString() ?? '',
    completed: json['completed'] as bool? ?? false,
  );
}

class Goal {
  final String id;
  final String title;
  final String why;
  final String category;
  final String status;
  final List<GoalMilestone> milestones;

  const Goal({
    required this.id,
    required this.title,
    required this.why,
    required this.category,
    required this.status,
    required this.milestones,
  });

  int get totalMilestones => milestones.length;
  int get completedMilestones => milestones.where((m) => m.completed).length;
  double get progress => totalMilestones == 0 ? 0 : completedMilestones / totalMilestones;
  int get progressPercent => (progress * 100).round();
  bool get isCompleted => status == 'completed';

  factory Goal.fromJson(Map<String, dynamic> json) => Goal(
    id: json['_id']?.toString() ?? '',
    title: json['title']?.toString() ?? '',
    why: json['why']?.toString() ?? '',
    category: json['category']?.toString() ?? 'personal',
    status: json['status']?.toString() ?? 'active',
    milestones: (json['milestones'] as List?)?.map((m) => GoalMilestone.fromJson(m as Map<String, dynamic>)).toList() ?? [],
  );
}

// ── Provider ──────────────────────────────────────────────────────────
final goalsProvider = FutureProvider<List<Goal>>((ref) async {
  final dio = DioClient.getInstance();
  final res = await dio.get(ApiConstants.goals);
  final raw = res.data;
  final list = raw is List ? raw : (raw['goals'] as List? ?? []);
  return list.map((g) => Goal.fromJson(g as Map<String, dynamic>)).toList();
});

// ── Screen ────────────────────────────────────────────────────────────
class GoalsScreen extends ConsumerWidget {
  const GoalsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final goalsAsync = ref.watch(goalsProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('OBJECTIVES', style: AppTypography.displaySm),
      ),
      body: RefreshIndicator(
        color: AppColors.primary400,
        backgroundColor: AppColors.bgSurface,
        onRefresh: () async => ref.invalidate(goalsProvider),
        child: goalsAsync.when(
          data: (goals) {
            if (goals.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.flag_outlined, size: 64, color: AppColors.textMuted),
                    const SizedBox(height: 16),
                    Text('No objectives set.', style: AppTypography.bodyLg.copyWith(color: AppColors.textSecondary)),
                    Text('Define your mission, Commander.', style: AppTypography.bodySm),
                  ],
                ),
              );
            }
            return ListView.builder(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 80),
              itemCount: goals.length,
              itemBuilder: (ctx, i) => Padding(
                padding: const EdgeInsets.only(bottom: 14),
                child: _GoalCard(goal: goals[i], ref: ref)
                    .animate()
                    .fadeIn(delay: (i * 50).ms)
                    .slideY(begin: 0.05),
              ),
            );
          },
          loading: () => ListView(
            padding: AppSpacing.screenPadding,
            children: List.generate(3, (_) => Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: SkeletonCard(lines: 5),
            )),
          ),
          error: (e, _) => Center(child: Text('Error: $e', style: AppTypography.bodySm.copyWith(color: AppColors.danger))),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.primary400,
        foregroundColor: AppColors.bgBase,
        icon: const Icon(Icons.add_rounded),
        label: Text('New Goal', style: AppTypography.bodyMd.copyWith(color: AppColors.bgBase, fontWeight: FontWeight.w700)),
        onPressed: () => _showAddGoal(context, ref),
      ),
    );
  }

  void _showAddGoal(BuildContext context, WidgetRef ref) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.bgSurface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) => _AddGoalSheet(onCreated: () => ref.invalidate(goalsProvider)),
    );
  }
}

// ── Goal Card ─────────────────────────────────────────────────────────
class _GoalCard extends StatelessWidget {
  final Goal goal;
  final WidgetRef ref;
  const _GoalCard({required this.goal, required this.ref});

  @override
  Widget build(BuildContext context) {
    // Boss HP bar — HP decreases as milestones completed
    final bossHp = 1.0 - goal.progress; // Boss loses HP as you progress

    return AppCard(
      glowColor: goal.isCompleted ? AppColors.success : AppColors.primary400,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.primaryGlow,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.flag_rounded, color: AppColors.primary400, size: 18),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(goal.title, style: AppTypography.bodyLg.copyWith(fontWeight: FontWeight.w700)),
                    Text(goal.category.toUpperCase(), style: AppTypography.labelSm.copyWith(color: AppColors.textMuted, fontSize: 9)),
                  ],
                ),
              ),
              Text('${goal.progressPercent}%', style: AppTypography.monoMd.copyWith(color: AppColors.primary400, fontWeight: FontWeight.w700)),
            ],
          ),

          if (goal.why.isNotEmpty) ...[
            const SizedBox(height: 10),
            Text('"${goal.why}"', style: AppTypography.bodySm.copyWith(color: AppColors.textSecondary, fontStyle: FontStyle.italic)),
          ],

          // Boss HP Bar (if not completed)
          if (!goal.isCompleted && goal.totalMilestones > 0) ...[
            const SizedBox(height: 14),
            Row(
              children: [
                const Text('👾', style: TextStyle(fontSize: 16)),
                const SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('BOSS HP', style: AppTypography.labelSm.copyWith(color: AppColors.textMuted, fontSize: 9)),
                          Text('${goal.totalMilestones - goal.completedMilestones}/${goal.totalMilestones}', style: AppTypography.monoSm.copyWith(color: AppColors.danger, fontSize: 10)),
                        ],
                      ),
                      const SizedBox(height: 4),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: bossHp,
                          backgroundColor: AppColors.danger.withValues(alpha: 0.15),
                          valueColor: const AlwaysStoppedAnimation<Color>(AppColors.danger),
                          minHeight: 6,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],

          // Milestones
          if (goal.milestones.isNotEmpty) ...[
            const SizedBox(height: 12),
            const Divider(color: AppColors.borderSubtle, height: 1),
            const SizedBox(height: 10),
            ...goal.milestones.take(4).map((m) => Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Row(
                children: [
                  Icon(
                    m.completed ? Icons.check_circle_rounded : Icons.radio_button_unchecked,
                    color: m.completed ? AppColors.success : AppColors.textMuted,
                    size: 16,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      m.title,
                      style: AppTypography.bodySm.copyWith(
                        color: m.completed ? AppColors.textSecondary : AppColors.textPrimary,
                        decoration: m.completed ? TextDecoration.lineThrough : null,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            )),
            if (goal.milestones.length > 4)
              Text('+${goal.milestones.length - 4} more', style: AppTypography.bodySm.copyWith(color: AppColors.textMuted)),
          ],
        ],
      ),
    );
  }
}

// ── Add Goal Sheet ────────────────────────────────────────────────────
class _AddGoalSheet extends ConsumerStatefulWidget {
  final VoidCallback onCreated;
  const _AddGoalSheet({required this.onCreated});

  @override
  ConsumerState<_AddGoalSheet> createState() => _AddGoalSheetState();
}

class _AddGoalSheetState extends ConsumerState<_AddGoalSheet> {
  final _titleCtrl = TextEditingController();
  final _whyCtrl   = TextEditingController();
  String _category = 'personal';
  bool _loading = false;

  @override
  void dispose() { _titleCtrl.dispose(); _whyCtrl.dispose(); super.dispose(); }

  Future<void> _submit() async {
    if (_titleCtrl.text.trim().isEmpty) return;
    setState(() => _loading = true);
    try {
      final dio = DioClient.getInstance();
      await dio.post(ApiConstants.goals, data: {
        'title': _titleCtrl.text.trim(),
        'why': _whyCtrl.text.trim(),
        'category': _category,
        'timeline': {'start': DateTime.now().toIso8601String(), 'end': DateTime.now().add(const Duration(days: 90)).toIso8601String()},
        'milestones': [],
      });
      widget.onCreated();
      if (mounted) Navigator.pop(context);
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom, left: 20, right: 20, top: 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('New Objective', style: AppTypography.displaySm),
          const SizedBox(height: 20),
          TextField(controller: _titleCtrl, autofocus: true, style: AppTypography.bodyLg, decoration: const InputDecoration(hintText: 'What do you want to achieve?')),
          const SizedBox(height: 12),
          TextField(controller: _whyCtrl, style: AppTypography.bodyMd, decoration: const InputDecoration(hintText: 'Why does this matter? (your "why")')),
          const SizedBox(height: 20),
          SizedBox(width: double.infinity, height: 48,
            child: ElevatedButton(
              onPressed: _loading ? null : _submit,
              child: _loading ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.bgBase)) : const Text('CREATE OBJECTIVE'),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}
