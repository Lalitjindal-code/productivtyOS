import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_card.dart';
import '../../../shared/widgets/app_button.dart';
import '../services/focus_shield_service.dart';
import '../services/app_detector_service.dart';
import '../services/overlay_service.dart';

final focusShieldActiveProvider = StateProvider<bool>((ref) => false);

class FocusScreen extends ConsumerWidget {
  const FocusScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isActive = ref.watch(focusShieldActiveProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('FOCUS SHIELD', style: AppTypography.displaySm),
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.screenPadding,
        child: Column(
          children: [
            _buildShieldStatus(isActive),
            const SizedBox(height: AppSpacing.xl3),
            _buildStatsRow(),
            const SizedBox(height: AppSpacing.xl3),
            _buildControls(context, ref, isActive),
          ],
        ),
      ),
    );
  }

  Widget _buildShieldStatus(bool isActive) {
    return Column(
      children: [
        Icon(
          isActive ? Icons.shield : Icons.shield_outlined,
          size: 80,
          color: isActive ? AppColors.primary400 : AppColors.textMuted,
        ),
        const SizedBox(height: 16),
        Text(
          isActive ? 'SHIELD ACTIVE' : 'SHIELD DEACTIVATED',
          style: AppTypography.displayMd.copyWith(
            color: isActive ? AppColors.primary400 : AppColors.textMuted,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          isActive 
            ? 'Distractions are currently being blocked.' 
            : 'Your focus is vulnerable to distractions.',
          textAlign: TextAlign.center,
          style: AppTypography.bodyMd.copyWith(color: AppColors.textSecondary),
        ),
      ],
    );
  }

  Widget _buildStatsRow() {
    return Row(
      children: [
        Expanded(
          child: AppCard(
            child: Column(
              children: [
                Text('BLOCKED', style: AppTypography.labelMd),
                Text('12', style: AppTypography.monoLg.copyWith(color: AppColors.danger)),
                Text('Distractions', style: AppTypography.bodySm),
              ],
            ),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: AppCard(
            child: Column(
              children: [
                Text('TIME SAVED', style: AppTypography.labelMd),
                Text('45m', style: AppTypography.monoLg.copyWith(color: AppColors.success)),
                Text('Focus earned', style: AppTypography.bodySm),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildControls(BuildContext context, WidgetRef ref, bool isActive) {
    return Column(
      children: [
        AppButton(
          label: isActive ? 'DEACTIVATE SHIELD' : 'ACTIVATE SHIELD',
          variant: isActive ? AppButtonVariant.danger : AppButtonVariant.primary,
          isFullWidth: true,
          onPressed: () => _toggleShield(ref, !isActive),
        ),
        const SizedBox(height: 16),
        AppButton(
          label: 'MANAGE BLOCKED APPS',
          variant: AppButtonVariant.secondary,
          isFullWidth: true,
          onPressed: () {},
        ),
      ],
    );
  }

  Future<void> _toggleShield(WidgetRef ref, bool targetState) async {
    if (targetState) {
      // Check permissions
      bool usageGranted = await AppDetectorService.checkPermission();
      bool overlayGranted = await OverlayService.checkPermission();

      if (!usageGranted || !overlayGranted) {
        if (!usageGranted) await AppDetectorService.requestPermission();
        if (!overlayGranted) await OverlayService.requestPermission();
        return;
      }

      await FocusShieldService.start();
    } else {
      await FocusShieldService.stop();
    }

    ref.read(focusShieldActiveProvider.notifier).state = targetState;
  }
}
