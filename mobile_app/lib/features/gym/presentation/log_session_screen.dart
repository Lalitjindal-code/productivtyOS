import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_button.dart';

class LogSessionScreen extends StatefulWidget {
  const LogSessionScreen({super.key});

  @override
  State<LogSessionScreen> createState() => _LogSessionScreenState();
}

class _LogSessionScreenState extends State<LogSessionScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgVoid, // Extra dark for contrast
      appBar: AppBar(
        title: Text('LOGGING SESSION', style: AppTypography.displaySm),
        backgroundColor: AppColors.bgVoid,
      ),
      body: Column(
        children: [
          _buildActiveExercise(),
          const Divider(),
          Expanded(child: _buildSetsList()),
          _buildQuickControls(),
        ],
      ),
    );
  }

  Widget _buildActiveExercise() {
    return Container(
      padding: AppSpacing.screenPadding,
      color: AppColors.bgSurface,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('ACTIVE EXERCISE', style: AppTypography.labelMd),
          Text('BARBELL DEADLIFT', style: AppTypography.displayLg.copyWith(color: AppColors.primary400)),
        ],
      ),
    );
  }

  Widget _buildSetsList() {
    return ListView.builder(
      itemCount: 3,
      padding: const EdgeInsets.all(16),
      itemBuilder: (context, index) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        decoration: BoxDecoration(
          color: AppColors.bgElevated,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.borderStrong),
        ),
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: AppColors.primary400,
              radius: 12,
              child: Text('${index + 1}', style: const TextStyle(fontSize: 12, color: Colors.black)),
            ),
            const SizedBox(width: 24),
            Text('140 kg', style: AppTypography.monoLg),
            const Spacer(),
            Text('5 reps', style: AppTypography.monoLg.copyWith(color: AppColors.textSecondary)),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickControls() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: AppColors.bgSurface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: AppButton(
                  label: 'ADD SET',
                  variant: AppButtonVariant.primary,
                  height: 72, // Extra large for sweaty hands
                  onPressed: () {},
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: AppButton(
                  label: 'REST',
                  variant: AppButtonVariant.secondary,
                  height: 72,
                  onPressed: () {},
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          AppButton(
            label: 'FINISH EXERCISE',
            variant: AppButtonVariant.ghost,
            isFullWidth: true,
            onPressed: () => Navigator.pop(context),
          ),
        ],
      ),
    );
  }
}
