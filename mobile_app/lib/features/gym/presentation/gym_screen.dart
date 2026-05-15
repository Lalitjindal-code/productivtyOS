import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_card.dart';
import '../../../shared/widgets/app_button.dart';

class GymScreen extends StatelessWidget {
  const GymScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('GYM COMMAND', style: AppTypography.displaySm),
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.screenPadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildVolumeChart(),
            const SizedBox(height: AppSpacing.xl2),
            Text('PERSONAL RECORDS', style: AppTypography.labelLg),
            const SizedBox(height: AppSpacing.md),
            _buildPRCard('Deadlift', '180kg', '2 days ago'),
            _buildPRCard('Bench Press', '100kg', '1 week ago'),
            const SizedBox(height: AppSpacing.xl3),
            AppButton(
              label: 'START NEW SESSION',
              variant: AppButtonVariant.primary,
              height: 64,
              isFullWidth: true,
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVolumeChart() {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('WEEKLY VOLUME', style: AppTypography.labelMd),
          const SizedBox(height: 16),
          SizedBox(
            height: 150,
            child: BarChart(
              BarChartData(
                gridData: const FlGridData(show: false),
                titlesData: const FlTitlesData(show: false),
                borderData: FlBorderData(show: false),
                barGroups: [
                  _makeGroupData(0, 5),
                  _makeGroupData(1, 8),
                  _makeGroupData(2, 6),
                  _makeGroupData(3, 12),
                  _makeGroupData(4, 9),
                  _makeGroupData(5, 7),
                  _makeGroupData(6, 11),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  BarChartGroupData _makeGroupData(int x, double y) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          toY: y,
          color: AppColors.success,
          width: 12,
          borderRadius: BorderRadius.circular(4),
        ),
      ],
    );
  }

  Widget _buildPRCard(String exercise, String weight, String date) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: AppCard(
        child: Row(
          children: [
            const Icon(Icons.workspace_premium, color: AppColors.primary400),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(exercise, style: AppTypography.bodyLg.copyWith(fontWeight: FontWeight.w600)),
                  Text(date, style: AppTypography.bodySm),
                ],
              ),
            ),
            Text(weight, style: AppTypography.monoMd.copyWith(color: AppColors.primary400)),
          ],
        ),
      ),
    );
  }
}
