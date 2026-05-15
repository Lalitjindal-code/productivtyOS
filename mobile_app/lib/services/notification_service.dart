import 'package:flutter/material.dart';
import '../screens/focus_screen.dart';

class NotificationHandler {
  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  /**
   * Mock listener for incoming notifications.
   * In a real app, this would be hooked to FirebaseMessaging.onMessage.
   */
  static void onMessageReceived(Map<String, dynamic> message) {
    if (message['type'] == 'FOCUS_LOCK') {
      final taskTitle = message['taskTitle'] ?? 'Zen Focus';
      
      // Navigate to FocusScreen automatically
      navigatorKey.currentState?.push(
        MaterialPageRoute(builder: (context) => FocusScreen(taskTitle: taskTitle))
      );
    }
  }
}
