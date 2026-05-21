import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../../core/theme/app_colors.dart';

/// Animated shimmer loading placeholder.
/// Drop-in replacement for any content that's loading.
class LoadingSkeleton extends StatelessWidget {
  final double width;
  final double height;
  final double borderRadius;

  const LoadingSkeleton({
    super.key,
    this.width = double.infinity,
    this.height = 16,
    this.borderRadius = 8,
  });

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: AppColors.neutral800,
      highlightColor: AppColors.neutral700,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: AppColors.neutral800,
          borderRadius: BorderRadius.circular(borderRadius),
        ),
      ),
    );
  }
}

/// A column of skeleton rows — useful for card placeholders.
class SkeletonCard extends StatelessWidget {
  final int lines;
  const SkeletonCard({super.key, this.lines = 3});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.bgSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: List.generate(lines, (i) => Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: LoadingSkeleton(
            height: 14,
            width: i == lines - 1 ? 120 : double.infinity,
          ),
        )),
      ),
    );
  }
}
