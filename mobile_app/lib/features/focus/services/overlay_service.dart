import 'package:system_alert_window/system_alert_window.dart';
import 'package:flutter/material.dart';

class OverlayService {
  static Future<void> showFocusOverlay(String taskTitle) async {
    await SystemAlertWindow.showSystemWindow(
      height: 800, // Full screen height approx
      header: SystemWindowHeader(
        title: SystemWindowText(text: "FOCUS MODE ACTIVE", fontSize: 14, textColor: Colors.red),
        padding: SystemWindowPadding.setSymmetricPadding(12, 12),
        decoration: SystemWindowDecoration(startColor: Colors.black, endColor: Colors.black12),
      ),
      body: SystemWindowBody(
        rows: [
          EachRow(
            columns: [
              EachColumn(
                text: SystemWindowText(
                  text: "YOUR MISSION", 
                  fontSize: 12, 
                  textColor: Colors.grey,
                  fontWeight: FontWeight.BOLD,
                ),
              ),
            ],
            padding: SystemWindowPadding.setSymmetricPadding(12, 12),
          ),
          EachRow(
            columns: [
              EachColumn(
                text: SystemWindowText(
                  text: taskTitle, 
                  fontSize: 24, 
                  textColor: Colors.white,
                  fontWeight: FontWeight.BOLD,
                ),
              ),
            ],
            padding: SystemWindowPadding.setSymmetricPadding(12, 12),
          ),
        ],
      ),
      footer: SystemWindowFooter(
        buttons: [
          EachButton(
            text: SystemWindowText(text: "I'M WORKING ON IT", fontSize: 14, textColor: Colors.black),
            tag: "working",
            padding: SystemWindowPadding.setSymmetricPadding(12, 12),
            decoration: SystemWindowDecoration(startColor: Colors.amber, endColor: Colors.orange),
          ),
        ],
        padding: SystemWindowPadding.setSymmetricPadding(12, 12),
      ),
      prefMode: SystemWindowPrefMode.OVERLAY,
    );
  }

  static Future<void> closeOverlay() async {
    await SystemAlertWindow.closeSystemWindow(prefMode: SystemWindowPrefMode.OVERLAY);
  }

  static Future<bool> checkPermission() async {
    bool? isGranted = await SystemAlertWindow.checkRuntimePermission();
    return isGranted ?? false;
  }

  static Future<void> requestPermission() async {
    await SystemAlertWindow.requestRuntimePermission();
  }
}
