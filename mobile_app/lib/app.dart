import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'features/auth/presentation/login_screen.dart';
import 'features/auth/presentation/register_screen.dart';
import 'features/auth/data/auth_repository.dart';
import 'features/home/presentation/home_screen.dart';
import 'features/tasks/presentation/tasks_screen.dart';
import 'features/focus/presentation/focus_screen.dart';
import 'features/goals/presentation/goals_screen.dart';
import 'features/profile/presentation/profile_screen.dart';
import 'features/journal/presentation/journal_screen.dart';
import 'core/theme/app_colors.dart';
import 'core/theme/app_typography.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final isLoggedIn = authState.value ?? false;
      final isAuthRoute = state.uri.path.startsWith('/auth');

      if (!isLoggedIn && !isAuthRoute) return '/auth/login';
      if (isLoggedIn && isAuthRoute) return '/';
      return null;
    },
    routes: [
      GoRoute(path: '/auth/login',    builder: (_, __) => const LoginScreen()),
      GoRoute(path: '/auth/register', builder: (_, __) => const RegisterScreen()),
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(path: '/',        builder: (_, __) => const HomeScreen()),
          GoRoute(path: '/tasks',   builder: (_, __) => const TasksScreen()),
          GoRoute(path: '/focus',   builder: (_, __) => const FocusScreen()),
          GoRoute(path: '/goals',   builder: (_, __) => const GoalsScreen()),
          GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
          GoRoute(path: '/journal', builder: (_, __) => const JournalScreen()),
        ],
      ),
    ],
  );
});

// ── Main Shell with Material 3 NavigationBar ──────────────────────────
class MainShell extends StatelessWidget {
  final Widget child;
  const MainShell({super.key, required this.child});

  static const _navItems = [
    _NavItem(path: '/',       icon: Icons.home_outlined,        activeIcon: Icons.home_rounded,            label: 'Home'),
    _NavItem(path: '/tasks',  icon: Icons.task_alt_outlined,    activeIcon: Icons.task_alt,                label: 'Tasks'),
    _NavItem(path: '/focus',  icon: Icons.timer_outlined,       activeIcon: Icons.timer_rounded,           label: 'Focus'),
    _NavItem(path: '/goals',  icon: Icons.flag_outlined,        activeIcon: Icons.flag_rounded,            label: 'Goals'),
    _NavItem(path: '/profile',icon: Icons.person_outline_rounded,activeIcon: Icons.person_rounded,         label: 'Profile'),
  ];

  @override
  Widget build(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    final currentIdx = _navItems.indexWhere((item) =>
      item.path == '/' ? location == '/' : location.startsWith(item.path)
    ).clamp(0, _navItems.length - 1);

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppColors.bgSurface,
          border: Border(top: BorderSide(color: AppColors.borderSubtle, width: 1)),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: List.generate(_navItems.length, (i) {
                final item = _navItems[i];
                final selected = i == currentIdx;
                return GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: () => context.go(item.path),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: selected
                        ? BoxDecoration(
                            color: AppColors.primary400.withValues(alpha: 0.12),
                            borderRadius: BorderRadius.circular(12),
                          )
                        : null,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          selected ? item.activeIcon : item.icon,
                          color: selected ? AppColors.primary400 : AppColors.textMuted,
                          size: 22,
                        ),
                        const SizedBox(height: 3),
                        Text(
                          item.label,
                          style: AppTypography.labelSm.copyWith(
                            color: selected ? AppColors.primary400 : AppColors.textMuted,
                            fontSize: 10,
                            fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }),
            ),
          ),
        ),
      ),
    );
  }
}

class _NavItem {
  final String path, label;
  final IconData icon, activeIcon;
  const _NavItem({required this.path, required this.icon, required this.activeIcon, required this.label});
}
