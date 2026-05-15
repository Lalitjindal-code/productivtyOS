import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../data/auth_repository.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../shared/widgets/app_button.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _userIdController = TextEditingController();
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('INITIATE SESSION', style: AppTypography.displayLg),
            const SizedBox(height: 8),
            Text('Enter your operative ID to continue', 
              style: AppTypography.bodyMd.copyWith(color: AppColors.textSecondary)),
            const SizedBox(height: 48),
            TextField(
              controller: _userIdController,
              decoration: const InputDecoration(
                labelText: 'OPERATIVE ID',
                hintText: 'e.g. user_mvp_1',
              ),
              style: AppTypography.monoMd,
            ),
            const SizedBox(height: 24),
            AppButton(
              label: 'LOGIN',
              isLoading: _isLoading,
              isFullWidth: true,
              onPressed: _handleLogin,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _handleLogin() async {
    if (_userIdController.text.isEmpty) return;

    setState(() => _isLoading = true);
    
    // Simulate API delay
    await Future.delayed(const Duration(seconds: 1));
    
    await ref.read(authRepositoryProvider).login(_userIdController.text);
    
    if (mounted) {
      context.go('/');
    }
  }
}
