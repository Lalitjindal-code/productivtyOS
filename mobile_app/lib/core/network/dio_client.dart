import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../constants/api_constants.dart';
import '../constants/app_constants.dart';

class DioClient {
  static final _storage = const FlutterSecureStorage();

  static Dio getInstance() {
    final dio = Dio(BaseOptions(
      baseUrl: ApiConstants.baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Content-Type': 'application/json'},
    ));

    // Auth interceptor — attaches JWT token from secure storage
    dio.interceptors.add(_AuthInterceptor(_storage));

    // Logging (debug only)
    dio.interceptors.add(LogInterceptor(
      requestBody: false,
      responseBody: false,
      error: true,
    ));

    return dio;
  }
}

/// Reads JWT from SecureStorage and injects it into every request header.
class _AuthInterceptor extends Interceptor {
  final FlutterSecureStorage _storage;
  _AuthInterceptor(this._storage);

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await _storage.read(key: AppConstants.keyJwtToken);
    if (token != null && token.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 401) {
      // Token expired — clear stored credentials
      _storage.delete(key: AppConstants.keyJwtToken);
      _storage.delete(key: AppConstants.keyUserId);
    }
    handler.next(err);
  }
}

/// Singleton provider so all repos share the same Dio instance.
final dioProvider = Dio Function() _dioInstance = DioClient.getInstance;
