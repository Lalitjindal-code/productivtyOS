import 'package:flutter/material.dart';
import 'dart:async';

class FocusScreen extends StatefulWidget {
  final String taskTitle;
  FocusScreen({required this.taskTitle});

  @override
  _FocusScreenState createState() => _FocusScreenState();
}

class _FocusScreenState extends State<FocusScreen> {
  int _seconds = 25 * 60;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {
        if (_seconds > 0) _seconds--;
        else _timer?.cancel();
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String _formatTime(int totalSeconds) {
    int minutes = totalSeconds ~/ 60;
    int seconds = totalSeconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => false, // Prevent dismissing
      child: Scaffold(
        body: Container(
          width: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Color(0xFF0D0D12), Color(0xFF1A1A24)],
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('FOCUS SESSION', style: TextStyle(letterSpacing: 4, color: Colors.white24, fontWeight: FontWeight.bold)),
              SizedBox(height: 10),
              Text(widget.taskTitle, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
              SizedBox(height: 60),
              
              // Animated Timer Ring (Simplified)
              Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    width: 250,
                    height: 250,
                    child: CircularProgressIndicator(
                      value: _seconds / (25 * 60),
                      strokeWidth: 8,
                      backgroundColor: Colors.white10,
                      color: Color(0xFFFFAD00),
                    ),
                  ),
                  Text(_formatTime(_seconds), style: TextStyle(fontSize: 60, fontWeight: FontWeight.bold, fontFamily: 'monospace')),
                ],
              ),
              
              SizedBox(height: 60),
              Text('Distractions are blocked', style: TextStyle(color: Colors.redAccent.withOpacity(0.7))),
              SizedBox(height: 40),
              
              OutlinedButton(
                onPressed: () => Navigator.pop(context),
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: Colors.white10),
                  padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                ),
                child: Text('GIVE UP (EARLY EXIT)', style: TextStyle(color: Colors.white54, fontSize: 12)),
              )
            ],
          ),
        ),
      ),
    );
  }
}
