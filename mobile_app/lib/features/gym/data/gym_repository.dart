import 'package:dio/dio.dart';
import '../../../core/network/dio_client.dart';
import '../../../core/constants/api_constants.dart';

class GymRepository {
  final Dio _dio;

  GymRepository() : _dio = DioClient.getInstance();

  Future<List<dynamic>> getWorkouts() async {
    try {
      final response = await _dio.get(ApiConstants.gymWorkouts);
      return response.data;
    } catch (e) {
      return [];
    }
  }

  Future<void> logWorkout(Map<String, dynamic> workoutData) async {
    await _dio.post(ApiConstants.gymWorkouts, data: workoutData);
  }
}
