import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'features/home/presentation/home_screen.dart';
// Note: Other screens will be imported as they are refactored
// For now, using placeholders or existing screens

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(
            path: '/',
            builder: (context, state) => const HomeScreen(),
          ),
          GoRoute(
            path: '/tasks',
            builder: (context, state) => const Scaffold(body: Center(child: Text('Tasks Screen'))),
          ),
          GoRoute(
            path: '/focus',
            builder: (context, state) => const Scaffold(body: Center(child: Text('Focus Screen'))),
          ),
          GoRoute(
            path: '/gym',
            builder: (context, state) => const Scaffold(body: Center(child: Text('Gym Screen'))),
          ),
          GoRoute(
            path: '/profile',
            builder: (context, state) => const Scaffold(body: Center(child: Text('Profile Screen'))),
          ),
        ],
      ),
    ],
  );
});

class MainShell extends StatelessWidget {
  final Widget child;

  const MainShell({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    
    int getCurrentIndex() {
      if (location == '/') return 0;
      if (location.startsWith('/tasks')) return 1;
      if (location.startsWith('/focus')) return 2;
      if (location.startsWith('/gym')) return 3;
      if (location.startsWith('/profile')) return 4;
      return 0;
    }

    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: getCurrentIndex(),
        onTap: (index) {
          switch (index) {
            case 0: context.go('/'); break;
            case 1: context.go('/tasks'); break;
            case 2: context.go('/focus'); break;
            case 3: context.go('/gym'); break;
            case 4: context.go('/profile'); break;
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_filled), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.task_alt), label: 'Tasks'),
          BottomNavigationBarItem(icon: Icon(Icons.shield), label: 'Focus'),
          BottomNavigationBarItem(icon: Icon(Icons.fitness_center), label: 'Gym'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
