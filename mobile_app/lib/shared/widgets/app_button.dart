import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';

enum AppButtonVariant { primary, secondary, ghost, danger, icon }

class AppButton extends StatelessWidget {
  final String? label;
  final VoidCallback? onPressed;
  final AppButtonVariant variant;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final bool isLoading;
  final bool isFullWidth;
  final double? height;

  const AppButton({
    super.key,
    this.label,
    this.onPressed,
    this.variant = AppButtonVariant.primary,
    this.prefixIcon,
    this.suffixIcon,
    this.isLoading = false,
    this.isFullWidth = false,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: isLoading ? null : () {
        HapticFeedback.lightImpact();
        onPressed?.call();
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        height: height ?? 48,
        width: isFullWidth ? double.infinity : null,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        decoration: _getDecoration(),
        child: _buildContent(),
      ),
    );
  }

  BoxDecoration _getDecoration() {
    return switch (variant) {
      AppButtonVariant.primary => BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppColors.primary400, Color(0xFFFF6B00)],
          begin: Alignment.centerLeft, end: Alignment.centerRight,
        ),
        borderRadius: BorderRadius.circular(10),
        boxShadow: onPressed != null ? [
          const BoxShadow(color: AppColors.primaryGlow, blurRadius: 16, spreadRadius: 0),
        ] : null,
      ),
      AppButtonVariant.secondary => BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.borderPrimary, width: 1),
      ),
      AppButtonVariant.danger => BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFEF4444), Color(0xFFDC2626)],
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      AppButtonVariant.ghost => BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(10),
      ),
      AppButtonVariant.icon => BoxDecoration(
        color: AppColors.bgElevated,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.borderSubtle),
      ),
    };
  }

  Widget _buildContent() {
    if (isLoading) {
      return const Center(
        child: SizedBox(
          width: 20, height: 20,
          child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.textPrimary),
        ),
      );
    }
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: isFullWidth ? MainAxisSize.max : MainAxisSize.min,
      children: [
        if (prefixIcon != null) ...[prefixIcon!, const SizedBox(width: 8)],
        if (label != null) Text(
          label!,
          style: AppTypography.bodyLg.copyWith(
            fontWeight: FontWeight.w600,
            color: variant == AppButtonVariant.primary
                ? const Color(0xFF0D0D12)
                : AppColors.textPrimary,
          ),
        ),
        if (suffixIcon != null) ...[const SizedBox(width: 8), suffixIcon!],
      ],
    );
  }
}
