import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'focus_screen.dart';
import 'settings_screen.dart';
import 'package:percent_indicator/percent_indicator.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Map<String, dynamic>? profile;
  List<dynamic> tasks = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      final p = await ApiService.getProfile();
      final t = await ApiService.getTasks();
      setState(() {
        profile = p;
        tasks = t;
        isLoading = false;
      });
    } catch (e) {
      print(e);
      setState(() { isLoading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ProductivityOS', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.settings_outlined, color: Colors.grey),
            onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (c) => AppBlockerSettings())),
          ),
          IconButton(icon: Icon(Icons.refresh), onPressed: fetchData)
        ],
      ),
      body: isLoading 
        ? Center(child: CircularProgressIndicator(color: Color(0xFFFFAD00)))
        : SingleChildScrollView(
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildCharacterCard(),
                SizedBox(height: 20),
                _buildFocusQuickStart(),
                SizedBox(height: 30),
                Text('TODAY\'S TASKS', style: TextStyle(letterSpacing: 2, fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
                SizedBox(height: 15),
                ...tasks.map((task) => _buildTaskItem(task)).toList(),
              ],
            ),
          ),
    );
  }

  Widget _buildCharacterCard() {
    final stats = profile?['rpgStats'] ?? {};
    final level = stats['level'] ?? 1;
    final xp = stats['currentXP'] ?? 0;
    final nextXp = stats['nextLevelXP'] ?? 100;

    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Color(0xFF13131A),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 30,
            backgroundColor: Color(0xFF1A1A24),
            child: Text(profile?['character']?['avatar'] ?? '👤', style: TextStyle(fontSize: 30)),
          ),
          SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(profile?['displayName'] ?? 'Warrior', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Text('Level $level ${profile?['character']?['class'] ?? ''}', style: TextStyle(color: Color(0xFFFFAD00), fontSize: 12)),
                SizedBox(height: 10),
                LinearPercentIndicator(
                  lineHeight: 8.0,
                  percent: (xp / nextXp).clamp(0.0, 1.0),
                  backgroundColor: Colors.white10,
                  progressColor: Color(0xFFFFAD00),
                  padding: EdgeInsets.zero,
                  barRadius: Radius.circular(10),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildFocusQuickStart() {
    return InkWell(
      onTap: () => Navigator.push(context, MaterialPageRoute(builder: (c) => FocusScreen(taskTitle: 'Quick Focus Session'))),
      child: Container(
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Color(0xFFFFAD00).withOpacity(0.1),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Color(0xFFFFAD00).withOpacity(0.3)),
        ),
        child: Row(
          children: [
            Icon(Icons.bolt, color: Color(0xFFFFAD00)),
            SizedBox(width: 15),
            Text('Start Focus Session', style: TextStyle(color: Color(0xFFFFAD00), fontWeight: FontWeight.bold)),
            Spacer(),
            Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFFFFAD00)),
          ],
        ),
      ),
    );
  }

  Widget _buildTaskItem(dynamic task) {
    return Container(
      margin: EdgeInsets.only(bottom: 12),
      padding: EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Color(0xFF13131A),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Row(
        children: [
          Icon(Icons.circle_outlined, color: Colors.white24, size: 20),
          SizedBox(width: 15),
          Text(task['title'] ?? '', style: TextStyle(fontSize: 14)),
          Spacer(),
          _buildPriorityBadge(task['priority']),
        ],
      ),
    );
  }

  Widget _buildPriorityBadge(String? priority) {
    Color color = Colors.grey;
    if (priority == 'high') color = Colors.orange;
    if (priority == 'critical') color = Colors.red;
    
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(5),
      ),
      child: Text(priority?.toUpperCase() ?? 'LOW', style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold)),
    );
  }
}
