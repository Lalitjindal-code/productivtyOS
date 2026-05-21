// Notification handler — updated to use new feature architecture
import 'package:flutter/material.dart';

class NotificationHandler {
  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  /// Called when a push notification is received.
  /// Routes to the appropriate screen based on notification type.
  static void onMessageReceived(Map<String, dynamic> message) {
    if (message['type'] == 'FOCUS_LOCK') {
      // Navigate to focus screen via the go_router global key
      navigatorKey.currentState?.pushNamed('/focus');
    }
  }
}
