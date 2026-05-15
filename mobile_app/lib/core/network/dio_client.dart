import 'package:dio/dio.dart';
import '../constants/api_constants.dart';

class DioClient {
  static Dio getInstance() {
    final dio = Dio(BaseOptions(
      baseUrl: ApiConstants.baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Content-Type': 'application/json'},
    ));

    dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));

    return dio;
  }
}

class AuthInterceptor extends Interceptor {
  // In a real app, this would fetch the token from SecureStorage
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    // For MVP/Phase 2, the server expects 'user_mvp_1' if no token
    // If we had a token: options.headers['Authorization'] = 'Bearer $token';
    super.onRequest(options, handler);
  }
}
