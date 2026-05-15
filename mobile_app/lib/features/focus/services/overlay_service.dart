import 'package:system_alert_window/system_alert_window.dart';
import 'package:flutter/material.dart';

class OverlayService {
  static Future<void> showFocusOverlay(String taskTitle) async {
    await SystemAlertWindow.showSystemWindow(
      height: 230,
      gravity: SystemWindowGravity.TOP,
      notificationTitle: "FOCUS MODE ACTIVE",
      notificationBody: "Mission: $taskTitle",
      prefMode: SystemWindowPrefMode.OVERLAY,
    );
  }

  static Future<void> closeOverlay() async {
    await SystemAlertWindow.closeSystemWindow(prefMode: SystemWindowPrefMode.OVERLAY);
  }

  static Future<bool> checkPermission() async {
    bool? isGranted = await SystemAlertWindow.checkPermissions();
    return isGranted ?? false;
  }

  static Future<void> requestPermission() async {
    await SystemAlertWindow.requestPermissions();
  }
}
