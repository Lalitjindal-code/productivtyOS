import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service_android/flutter_background_service_android.dart';
import 'app_detector_service.dart';
import 'overlay_service.dart';

class FocusShieldService {
  static Future<void> initialize() async {
    final service = FlutterBackgroundService();

    await service.configure(
      androidConfiguration: AndroidConfiguration(
        onStart: onStart,
        autoStart: false,
        isForegroundMode: true,
        notificationChannelId: 'focus_shield',
        initialNotificationTitle: 'Focus Shield Active',
        initialNotificationContent: 'Monitoring distractions...',
        foregroundServiceType: ForegroundServiceType.dataSync,
      ),
      iosConfiguration: IosConfiguration(
        autoStart: false,
        onForeground: onStart,
        onBackground: onIosBackground,
      ),
    );
  }

  static Future<void> start() async {
    final service = FlutterBackgroundService();
    await service.startService();
  }

  static Future<void> stop() async {
    final service = FlutterBackgroundService();
    service.invoke("stopService");
  }
}

@pragma('vm:entry-point')
void onStart(ServiceInstance service) async {
  DartPluginRegistrant.ensureInitialized();

  if (service is AndroidServiceInstance) {
    service.on('setAsForeground').listen((event) {
      service.setAsForegroundService();
    });

    service.on('setAsBackground').listen((event) {
      service.setAsBackgroundService();
    });
  }

  service.on('stopService').listen((event) {
    service.stopSelf();
  });

  // Blocklist for demo (in real app, this comes from DB)
  final blockedApps = [
    'com.instagram.android',
    'com.google.android.youtube',
    'com.facebook.katana',
    'com.twitter.android',
    'com.android.chrome',
  ];

  Timer.periodic(const Duration(seconds: 1), (timer) async {
    if (service is AndroidServiceInstance) {
      if (await service.isForegroundService()) {
        final foregroundApp = await AppDetectorService.getForegroundApp();
        
        if (foregroundApp != null && blockedApps.contains(foregroundApp)) {
          // Trigger Overlay
          await OverlayService.showFocusOverlay("Complete Phase 3 Shield");
        }
      }
    }

    // Update notification content
    if (service is AndroidServiceInstance) {
      service.setForegroundNotificationInfo(
        title: "Focus Shield Running",
        content: "Stay focused on your mission.",
      );
    }
  });
}

@pragma('vm:entry-point')
bool onIosBackground(ServiceInstance service) {
  WidgetsFlutterBinding.ensureInitialized();
  return true;
}
