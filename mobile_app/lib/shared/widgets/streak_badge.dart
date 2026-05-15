import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';

class StreakBadge extends StatelessWidget {
  final int days;
  final bool showLabel;

  const StreakBadge({
    super.key,
    required this.days,
    this.showLabel = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.primary400.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.primary400.withOpacity(0.3)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.local_fire_department, color: AppColors.primary400, size: 18),
          const SizedBox(width: 4),
          Text(
            '$days${showLabel ? ' DAY STREAK' : ''}',
            style: AppTypography.monoSm.copyWith(
              color: AppColors.primary400,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
