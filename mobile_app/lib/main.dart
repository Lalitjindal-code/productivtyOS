import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'services/notification_service.dart';

void main() {
  runApp(ProductivityOS());
}

class ProductivityOS extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ProductivityOS',
      navigatorKey: NotificationHandler.navigatorKey,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Color(0xFFFFAD00), // Electric Amber
        scaffoldBackgroundColor: Color(0xFF0D0D12),
        fontFamily: 'Outfit',
        textTheme: TextTheme(
          headlineMedium: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          bodyMedium: TextStyle(color: Color(0xFFA0A0B8)),
        ),
      ),
      home: HomeScreen(),
    );
  }
}
