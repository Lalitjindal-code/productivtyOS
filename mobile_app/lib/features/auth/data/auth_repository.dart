import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AuthRepository {
  final _storage = const FlutterSecureStorage();
  static const String _userIdKey = 'user_id';

  Future<void> login(String userId) async {
    await _storage.write(key: _userIdKey, value: userId);
  }

  Future<void> logout() async {
    await _storage.delete(key: _userIdKey);
  }

  Future<String?> getUserId() async {
    return await _storage.read(key: _userIdKey);
  }

  Future<bool> isAuthenticated() async {
    final userId = await getUserId();
    return userId != null;
  }
}

final authRepositoryProvider = Provider<AuthRepository>((ref) => AuthRepository());

final authStateProvider = FutureProvider<bool>((ref) async {
  return await ref.watch(authRepositoryProvider).isAuthenticated();
});
