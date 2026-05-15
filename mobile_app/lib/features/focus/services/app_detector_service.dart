import 'package:usage_stats/usage_stats.dart';
import 'dart:io';

class AppDetectorService {
  static Future<String?> getForegroundApp() async {
    if (!Platform.isAndroid) return null;

    DateTime endDate = DateTime.now();
    DateTime startDate = endDate.subtract(const Duration(seconds: 10));

    List<UsageInfo> usageStats = await UsageStats.queryUsageStats(startDate, endDate);
    
    if (usageStats.isEmpty) return null;

    // Find the app with the latest lastTimeUsed
    UsageInfo latestApp = usageStats.first;
    for (var info in usageStats) {
      if (int.parse(info.lastTimeUsed!) > int.parse(latestApp.lastTimeUsed!)) {
        latestApp = info;
      }
    }

    return latestApp.packageName;
  }

  static Future<bool> checkPermission() async {
    bool? isGranted = await UsageStats.checkUsagePermission();
    return isGranted ?? false;
  }

  static Future<void> requestPermission() async {
    UsageStats.grantUsagePermission();
  }
}
