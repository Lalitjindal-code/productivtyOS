import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_spacing.dart';

class AppCard extends StatelessWidget {
  final Widget child;
  final Color? glowColor;
  final VoidCallback? onTap;
  final EdgeInsets? padding;
  final bool isSelected;

  const AppCard({
    super.key,
    required this.child,
    this.glowColor,
    this.onTap,
    this.padding,
    this.isSelected = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap != null ? () {
        HapticFeedback.selectionClick();
        onTap!();
      } : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: padding ?? AppSpacing.cardPadding,
        decoration: BoxDecoration(
          color: AppColors.bgSurface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.borderPrimary : AppColors.borderDefault,
            width: 1,
          ),
          boxShadow: glowColor != null ? [
            BoxShadow(color: glowColor!.withOpacity(0.15), blurRadius: 20, spreadRadius: 0),
          ] : null,
        ),
        child: Stack(
          children: [
            // Top highlight line
            Positioned(
              top: 0, left: 16, right: 16,
              child: Container(
                height: 1,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.transparent, Color(0x1AFFFFFF), Colors.transparent],
                  ),
                ),
              ),
            ),
            child,
          ],
        ),
      ),
    );
  }
}
