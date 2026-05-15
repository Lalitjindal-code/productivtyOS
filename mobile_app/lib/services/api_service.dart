import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Use your local IP or deployed backend URL
  static const String baseUrl = 'http://localhost:5002/api'; 

  static Future<Map<String, dynamic>> getProfile() async {
    final response = await http.get(Uri.parse('$baseUrl/user/profile'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load profile');
    }
  }

  static Future<List<dynamic>> getTasks() async {
    final response = await http.get(Uri.parse('$baseUrl/tasks'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load tasks');
    }
  }

  static Future<void> registerDevice(String fcmToken) async {
    await http.post(
      Uri.parse('$baseUrl/user/mobile/push-token'),
      body: json.encode({'fcmToken': fcmToken}),
      headers: {'Content-Type': 'application/json'},
    );
  }
}
