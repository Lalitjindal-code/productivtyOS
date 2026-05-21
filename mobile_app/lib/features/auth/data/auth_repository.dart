import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/api_constants.dart';
import '../../../core/constants/app_constants.dart';

class AuthRepository {
  final Dio _dio;
  final FlutterSecureStorage _storage;

  AuthRepository({Dio? dio, FlutterSecureStorage? storage})
      : _dio = dio ?? Dio(BaseOptions(baseUrl: ApiConstants.baseUrl)),
        _storage = storage ?? const FlutterSecureStorage();

  // ── Login ──────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _dio.post(ApiConstants.login, data: {
      'email': email,
      'password': password,
    });
    final token = response.data['token'] as String;
    final user  = response.data['user'] as Map<String, dynamic>;

    await _storage.write(key: AppConstants.keyJwtToken, value: token);
    await _storage.write(key: AppConstants.keyUserId,   value: user['_id']?.toString());
    await _storage.write(key: AppConstants.keyUserName, value: user['name']?.toString());

    return response.data;
  }

  // ── Register ───────────────────────────────────────────────────────
  Future<Map<String, dynamic>> register(String name, String email, String password) async {
    final response = await _dio.post(ApiConstants.register, data: {
      'name': name,
      'email': email,
      'password': password,
    });
    final token = response.data['token'] as String;
    final user  = response.data['user'] as Map<String, dynamic>;

    await _storage.write(key: AppConstants.keyJwtToken, value: token);
    await _storage.write(key: AppConstants.keyUserId,   value: user['_id']?.toString());
    await _storage.write(key: AppConstants.keyUserName, value: user['name']?.toString());

    return response.data;
  }

  // ── Logout ─────────────────────────────────────────────────────────
  Future<void> logout() async {
    await _storage.deleteAll();
  }

  // ── Helpers ────────────────────────────────────────────────────────
  Future<String?> getToken()  => _storage.read(key: AppConstants.keyJwtToken);
  Future<String?> getUserId() => _storage.read(key: AppConstants.keyUserId);

  Future<bool> isAuthenticated() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }
}

// ── Riverpod Providers ────────────────────────────────────────────────
final authRepositoryProvider = Provider<AuthRepository>(
  (ref) => AuthRepository(),
);

final authStateProvider = FutureProvider<bool>((ref) async {
  return ref.watch(authRepositoryProvider).isAuthenticated();
});
