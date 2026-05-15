import 'package:flutter/material.dart';

class AppBlockerSettings extends StatefulWidget {
  @override
  _AppBlockerSettingsState createState() => _AppBlockerSettingsState();
}

class _AppBlockerSettingsState extends State<AppBlockerSettings> {
  final List<Map<String, dynamic>> _apps = [
    {'name': 'Instagram', 'pkg': 'com.instagram.android', 'blocked': true},
    {'name': 'YouTube', 'pkg': 'com.google.android.youtube', 'blocked': true},
    {'name': 'TikTok', 'pkg': 'com.zhiliaoapp.musically', 'blocked': false},
    {'name': 'Twitter/X', 'pkg': 'com.twitter.android', 'blocked': true},
    {'name': 'WhatsApp', 'pkg': 'com.whatsapp', 'blocked': false},
    {'name': 'Netflix', 'pkg': 'com.netflix.mediaclient', 'blocked': true},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('App Blocker Settings'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: ListView(
        padding: EdgeInsets.all(20),
        children: [
          _buildInfoCard(),
          SizedBox(height: 30),
          Text('SELECT APPS TO BLOCK', style: TextStyle(letterSpacing: 2, fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold)),
          SizedBox(height: 15),
          ..._apps.map((app) => _buildAppTile(app)).toList(),
          
          SizedBox(height: 30),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFFFFAD00),
              foregroundColor: Colors.black,
              minimumSize: Size(double.infinity, 50),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
            ),
            child: Text('SAVE CONFIGURATION', style: TextStyle(fontWeight: FontWeight.bold)),
          )
        ],
      ),
    );
  }

  Widget _buildInfoCard() {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.blueAccent.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.blueAccent.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          Icon(Icons.info_outline, color: Colors.blueAccent),
          SizedBox(width: 15),
          Expanded(
            child: Text(
              'Blocked apps will be automatically closed during focus sessions.',
              style: TextStyle(fontSize: 13, color: Colors.blueAccent),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppTile(Map<String, dynamic> app) {
    return Container(
      margin: EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Color(0xFF13131A),
        borderRadius: BorderRadius.circular(15),
      ),
      child: CheckboxListTile(
        title: Text(app['name'], style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
        subtitle: Text(app['pkg'], style: TextStyle(fontSize: 11, color: Colors.grey)),
        value: app['blocked'],
        activeColor: Color(0xFFFFAD00),
        onChanged: (val) {
          setState(() { app['blocked'] = val; });
        },
        secondary: CircleAvatar(
          backgroundColor: Color(0xFF1A1A24),
          child: Icon(Icons.apps, size: 20, color: Colors.white24),
        ),
      ),
    );
  }
}
