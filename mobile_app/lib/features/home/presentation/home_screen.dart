import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ProductivityOS', style: AppTypography.displaySm),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.settings_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.screenPadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildWelcomeHeader(),
            const SizedBox(height: AppSpacing.xl2),
            _buildStatsGrid(),
            const SizedBox(height: AppSpacing.xl3),
            Text('TODAY\'S MISSION', style: AppTypography.labelLg),
            const SizedBox(height: AppSpacing.lg),
            _buildTaskPlaceholder(),
          ],
        ),
      ),
    );
  }

  Widget _buildWelcomeHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Welcome back,', style: AppTypography.bodyMd.copyWith(color: AppColors.textSecondary)),
        Text('Commander', style: AppTypography.displayMd),
      ],
    );
  }

  Widget _buildStatsGrid() {
    return Row(
      children: [
        Expanded(
          child: AppCard(
            glowColor: AppColors.primary400,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('STREAK', style: AppTypography.labelMd),
                const SizedBox(height: 4),
                Row(
                  children: [
                    const Icon(Icons.local_fire_department, color: AppColors.primary400, size: 20),
                    const SizedBox(width: 4),
                    Text('12 Days', style: AppTypography.monoMd),
                  ],
                ),
              ],
            ),
          ).animate().fadeIn(duration: 400.ms).slideX(begin: -0.2),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: AppCard(
            glowColor: AppColors.plasma400,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('FOCUS', style: AppTypography.labelMd),
                const SizedBox(height: 4),
                Row(
                  children: [
                    const Icon(Icons.timer_outlined, color: AppColors.plasma400, size: 20),
                    const SizedBox(width: 4),
                    Text('4.5h Today', style: AppTypography.monoMd),
                  ],
                ),
              ],
            ),
          ).animate().fadeIn(duration: 400.ms, delay: 100.ms).slideX(begin: 0.2),
        ),
      ],
    );
  }

  Widget _buildTaskPlaceholder() {
    return AppCard(
      child: Row(
        children: [
          Container(
            width: 4,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.primary400,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Complete Phase 1 Upgrade', style: AppTypography.bodyLg.copyWith(fontWeight: FontWeight.w600)),
                Text('Mobile App Foundation', style: AppTypography.bodySm),
              ],
            ),
          ),
          const Icon(Icons.chevron_right, color: AppColors.textMuted),
        ],
      ),
    );
  }
}
