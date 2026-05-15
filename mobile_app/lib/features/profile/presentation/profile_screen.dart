import '../../../shared/widgets/app_card.dart';
import '../../../shared/widgets/xp_bar.dart';
import '../../../shared/widgets/streak_badge.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('OPERATIVE PROFILE', style: AppTypography.displaySm),
        actions: [
          IconButton(icon: const Icon(Icons.sync), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            _buildCharacterHeader(),
            const SizedBox(height: 24),
            const StreakBadge(days: 12),
            const SizedBox(height: 32),
            _buildStatsGrid(),
            const SizedBox(height: 32),
            Text('ACHIEVEMENTS', style: AppTypography.labelLg),
            const SizedBox(height: 16),
            _buildAchievementList(),
          ],
        ),
      ),
    );
  }

  Widget _buildCharacterHeader() {
    return Column(
      children: [
        const CircleAvatar(
          radius: 60,
          backgroundColor: AppColors.bgSurface,
          child: Text('⚔️', style: TextStyle(fontSize: 60)), // Character Class Icon
        ),
        const SizedBox(height: 16),
        Text('COMMANDER LALIT', style: AppTypography.displayMd),
        Text('LEVEL 14 WARRIOR', style: AppTypography.labelLg.copyWith(color: AppColors.primary400)),
        const SizedBox(height: 24),
        const XPBar(currentXP: 75, maxXP: 100),
      ],
    );
  }

  Widget _buildStatsGrid() {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 3,
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      children: [
        _buildStatCard('STR', '18'),
        _buildStatCard('INT', '12'),
        _buildStatCard('WIS', '10'),
        _buildStatCard('DEX', '14'),
        _buildStatCard('CON', '16'),
        _buildStatCard('CHA', '08'),
      ],
    );
  }

  Widget _buildStatCard(String label, String value) {
    return AppCard(
      padding: const EdgeInsets.all(8),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(label, style: AppTypography.labelMd),
          Text(value, style: AppTypography.monoLg.copyWith(color: AppColors.primary400)),
        ],
      ),
    );
  }

  Widget _buildAchievementList() {
    return Column(
      children: [
        _buildAchievementTile('Early Bird', 'Complete a task before 7 AM', true),
        _buildAchievementTile('Gym Rat', 'Log 5 workouts in a week', true),
        _buildAchievementTile('Deep Worker', 'Focus for 4 hours straight', false),
      ],
    );
  }

  Widget _buildAchievementTile(String title, String desc, bool isUnlocked) {
    return Opacity(
      opacity: isUnlocked ? 1.0 : 0.4,
      child: Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: AppCard(
          child: Row(
            children: [
              Icon(isUnlocked ? Icons.stars : Icons.stars_outlined, 
                color: isUnlocked ? AppColors.accent400 : AppColors.textMuted),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: AppTypography.bodyLg.copyWith(fontWeight: FontWeight.w600)),
                    Text(desc, style: AppTypography.bodySm),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
