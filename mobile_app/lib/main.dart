import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app.dart';
import 'core/theme/app_theme.dart';
import 'features/focus/services/focus_shield_service.dart';
import 'features/notifications/notification_service.dart';
import 'core/database/database_provider.dart';
import 'core/network/sync_service.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

void main() async {
  // Ensure Flutter is initialized
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Services
  await FocusShieldService.initialize();
  await NotificationService.initialize();
  
  final container = ProviderContainer();
  final syncService = SyncService(container.read(databaseProvider));

  // Listen for connectivity changes
  Connectivity().onConnectivityChanged.listen((results) {
    if (results.contains(ConnectivityResult.mobile) || 
        results.contains(ConnectivityResult.wifi)) {
      syncService.processSyncQueue();
    }
  });

  runApp(
    UncontrolledProviderScope(
      container: container,
      child: const ProductivityOS(),
    ),
  );
}

class ProductivityOS extends ConsumerWidget {
  const ProductivityOS({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      title: 'ProductivityOS',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      routerConfig: router,
    );
  }
}
