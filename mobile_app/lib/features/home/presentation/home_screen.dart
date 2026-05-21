import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_card.dart';
import '../../../shared/widgets/xp_bar.dart';
import '../../../shared/widgets/loading_skeleton.dart';
import '../../../shared/widgets/priority_badge.dart';
import '../data/home_repository.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final statsAsync = ref.watch(dashboardStatsProvider);
    final tasksAsync = ref.watch(todayTasksProvider);

    return Scaffold(
      body: RefreshIndicator(
        color: AppColors.primary400,
        backgroundColor: AppColors.bgSurface,
        onRefresh: () async {
          ref.invalidate(dashboardStatsProvider);
          ref.invalidate(todayTasksProvider);
        },
        child: CustomScrollView(
          slivers: [
            // ── Character Banner ────────────────────────────────────────
            SliverToBoxAdapter(
              child: statsAsync.when(
                data: (stats) => _CharacterBanner(stats: stats),
                loading: () => _CharacterBannerSkeleton(),
                error: (_, __) => _CharacterBannerSkeleton(),
              ),
            ),

            // ── Quick Actions ───────────────────────────────────────────
            SliverToBoxAdapter(
              child: _QuickActionsRow().animate().fadeIn(delay: 200.ms),
            ),

            // ── Today's Stats ───────────────────────────────────────────
            SliverToBoxAdapter(
              child: statsAsync.when(
                data: (stats) => _TodayStatsRow(stats: stats).animate().fadeIn(delay: 300.ms),
                loading: () => Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(children: [
                    Expanded(child: SkeletonCard()),
                    const SizedBox(width: 12),
                    Expanded(child: SkeletonCard()),
                    const SizedBox(width: 12),
                    Expanded(child: SkeletonCard()),
                  ]),
                ),
                error: (_, __) => const SizedBox.shrink(),
              ),
            ),

            // ── Today's Mission ─────────────────────────────────────────
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 28, 16, 12),
                child: Row(
                  children: [
                    Text("TODAY'S MISSION", style: AppTypography.labelLg),
                    const Spacer(),
                    GestureDetector(
                      onTap: () => context.go('/tasks'),
                      child: Text('See All', style: AppTypography.bodySm.copyWith(color: AppColors.primary400)),
                    ),
                  ],
                ),
              ),
            ),

            tasksAsync.when(
              data: (tasks) {
                if (tasks.isEmpty) {
                  return SliverToBoxAdapter(
                    child: Padding(
                      padding: AppSpacing.screenPadding,
                      child: AppCard(
                        child: Column(
                          children: [
                            const Icon(Icons.check_circle_outline, color: AppColors.success, size: 40),
                            const SizedBox(height: 12),
                            Text('All clear, Commander!', style: AppTypography.bodyLg.copyWith(color: AppColors.success)),
                            Text('No tasks due today.', style: AppTypography.bodySm),
                          ],
                        ),
                      ),
                    ),
                  );
                }
                return SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (ctx, i) => Padding(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 10),
                      child: _TodayTaskCard(task: tasks[i])
                          .animate()
                          .fadeIn(delay: (i * 60).ms)
                          .slideX(begin: 0.1),
                    ),
                    childCount: tasks.length,
                  ),
                );
              },
              loading: () => SliverToBoxAdapter(
                child: Padding(
                  padding: AppSpacing.screenPadding,
                  child: Column(children: List.generate(3, (_) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: SkeletonCard(),
                  ))),
                ),
              ),
              error: (_, __) => const SliverToBoxAdapter(child: SizedBox.shrink()),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 32)),
          ],
        ),
      ),
    );
  }
}

// ── Character Banner ──────────────────────────────────────────────────
class _CharacterBanner extends StatelessWidget {
  final DashboardStats stats;
  const _CharacterBanner({required this.stats});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 60, 16, 0),
      child: AppCard(
        glowColor: AppColors.primary400,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // Avatar
                Container(
                  width: 52, height: 52,
                  decoration: BoxDecoration(
                    color: AppColors.primaryGlow,
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.primary400.withValues(alpha: 0.5), width: 2),
                  ),
                  child: const Icon(Icons.person, color: AppColors.primary400, size: 28),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Cmdr. ${stats.username}',
                        style: AppTypography.bodyLg.copyWith(fontWeight: FontWeight.w700),
                        overflow: TextOverflow.ellipsis,
                      ),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.primaryGlow,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text('LV ${stats.level}', style: AppTypography.monoSm.copyWith(color: AppColors.primary400)),
                          ),
                          const SizedBox(width: 6),
                          Text(stats.characterClass, style: AppTypography.bodySm.copyWith(color: AppColors.textSecondary)),
                        ],
                      ),
                    ],
                  ),
                ),
                // Streak fire
                Column(
                  children: [
                    const Icon(Icons.local_fire_department, color: AppColors.primary400, size: 24),
                    Text('${stats.streak}', style: AppTypography.monoMd.copyWith(color: AppColors.primary400)),
                    Text('streak', style: AppTypography.labelSm.copyWith(color: AppColors.textMuted, fontSize: 9)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 14),
            // XP Bar
            Row(
              children: [
                Text('XP', style: AppTypography.labelSm.copyWith(color: AppColors.textMuted, fontSize: 9)),
                const Spacer(),
                Text('${stats.xp} / ${stats.xpToNext}', style: AppTypography.monoSm.copyWith(color: AppColors.textSecondary, fontSize: 10)),
              ],
            ),
            const SizedBox(height: 4),
            XPBar(
              currentXP: stats.xp,
              maxXP: stats.xpToNext,
              showText: false,
            ),
          ],
        ),
      ),
    );
  }
}

class _CharacterBannerSkeleton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 60, 16, 0),
      child: SkeletonCard(lines: 4),
    );
  }
}

// ── Quick Actions Row ─────────────────────────────────────────────────
class _QuickActionsRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final actions = [
      _QA(icon: Icons.timer_outlined,         label: 'Focus',   color: AppColors.plasma400,  route: '/focus'),
      _QA(icon: Icons.add_task_rounded,        label: 'Task',    color: AppColors.primary400, route: '/tasks'),
      _QA(icon: Icons.fitness_center_rounded,  label: 'Workout', color: AppColors.success,    route: '/gym'),
      _QA(icon: Icons.book_outlined,           label: 'Journal', color: AppColors.accent400,  route: '/journal'),
    ];

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 0),
      child: Row(
        children: actions.map((a) => Expanded(
          child: GestureDetector(
            onTap: () => context.go(a.route),
            child: Column(
              children: [
                Container(
                  width: 52, height: 52,
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  decoration: BoxDecoration(
                    color: a.color.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: a.color.withValues(alpha: 0.25)),
                  ),
                  child: Icon(a.icon, color: a.color, size: 22),
                ),
                const SizedBox(height: 6),
                Text(a.label, style: AppTypography.labelSm.copyWith(color: AppColors.textSecondary, fontSize: 10)),
              ],
            ),
          ),
        )).toList(),
      ),
    );
  }
}

class _QA {
  final IconData icon;
  final String label, route;
  final Color color;
  const _QA({required this.icon, required this.label, required this.color, required this.route});
}

// ── Today's Stats Row ─────────────────────────────────────────────────
class _TodayStatsRow extends StatelessWidget {
  final DashboardStats stats;
  const _TodayStatsRow({required this.stats});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 0),
      child: Row(
        children: [
          _StatCard(label: 'TASKS', value: '${stats.tasksCompleted}/${stats.tasksTotal}', icon: Icons.task_alt, color: AppColors.success),
          const SizedBox(width: 10),
          _StatCard(label: 'POMODOROS', value: '${stats.pomodorosToday}', icon: Icons.timer, color: AppColors.plasma400),
          const SizedBox(width: 10),
          _StatCard(label: 'STREAK', value: '${stats.streak}d', icon: Icons.local_fire_department, color: AppColors.primary400),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label, value;
  final IconData icon;
  final Color color;
  const _StatCard({required this.label, required this.value, required this.icon, required this.color});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        decoration: BoxDecoration(
          color: AppColors.bgSurface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppColors.borderSubtle),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 16),
            const SizedBox(height: 6),
            Text(value, style: AppTypography.monoMd.copyWith(color: AppColors.textPrimary, fontWeight: FontWeight.w700)),
            Text(label, style: AppTypography.labelSm.copyWith(color: AppColors.textMuted, fontSize: 8)),
          ],
        ),
      ),
    );
  }
}

// ── Today Task Card ───────────────────────────────────────────────────
class _TodayTaskCard extends StatelessWidget {
  final TaskSummary task;
  const _TodayTaskCard({required this.task});

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Row(
        children: [
          Icon(
            task.completed ? Icons.check_circle_rounded : Icons.circle_outlined,
            color: task.completed ? AppColors.success : AppColors.textMuted,
            size: 20,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              task.title,
              style: AppTypography.bodyMd.copyWith(
                decoration: task.completed ? TextDecoration.lineThrough : null,
                color: task.completed ? AppColors.textSecondary : AppColors.textPrimary,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const SizedBox(width: 8),
          PriorityBadge(priority: task.priority),
        ],
      ),
    );
  }
}
