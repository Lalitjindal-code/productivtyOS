import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';

/// Color-coded priority chip: high / medium / low
class PriorityBadge extends StatelessWidget {
  final String priority;

  const PriorityBadge({super.key, required this.priority});

  @override
  Widget build(BuildContext context) {
    final cfg = _config[priority.toLowerCase()] ?? _config['medium']!;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: cfg.bg,
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: cfg.border),
      ),
      child: Text(
        priority.toUpperCase(),
        style: AppTypography.labelSm.copyWith(color: cfg.text, fontSize: 9),
      ),
    );
  }
}

class _PriorityCfg {
  final Color bg, border, text;
  const _PriorityCfg({required this.bg, required this.border, required this.text});
}

const _config = <String, _PriorityCfg>{
  'high': _PriorityCfg(
    bg: Color(0x29EF4444), border: Color(0x4DEF4444), text: AppColors.danger,
  ),
  'medium': _PriorityCfg(
    bg: Color(0x29F59E0B), border: Color(0x4DF59E0B), text: AppColors.warning,
  ),
  'low': _PriorityCfg(
    bg: Color(0x2922C55E), border: Color(0x4D22C55E), text: AppColors.success,
  ),
};
