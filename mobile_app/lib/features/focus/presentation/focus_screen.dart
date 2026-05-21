import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../domain/timer_notifier.dart';

class FocusScreen extends ConsumerStatefulWidget {
  const FocusScreen({super.key});

  @override
  ConsumerState<FocusScreen> createState() => _FocusScreenState();
}

class _FocusScreenState extends ConsumerState<FocusScreen> {
  Timer? _ticker;

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }

  void _startTicker() {
    _ticker?.cancel();
    _ticker = Timer.periodic(const Duration(seconds: 1), (_) {
      ref.read(timerProvider.notifier).tick();
    });
  }

  void _stopTicker() {
    _ticker?.cancel();
    _ticker = null;
  }

  @override
  Widget build(BuildContext context) {
    final timer = ref.watch(timerProvider);

    // Sync ticker with running state
    if (timer.isRunning && (_ticker == null || !_ticker!.isActive)) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _startTicker());
    } else if (!timer.isRunning) {
      _stopTicker();
    }

    final phaseColor = _phaseColor(timer.phase);
    final phaseLabel = _phaseLabel(timer.phase);
    final mins = (timer.remainingSeconds ~/ 60).toString().padLeft(2, '0');
    final secs = (timer.remainingSeconds % 60).toString().padLeft(2, '0');

    return Scaffold(
      backgroundColor: AppColors.bgBase,
      appBar: AppBar(
        title: Text('FOCUS MODE', style: AppTypography.displaySm),
        centerTitle: true,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Phase indicator
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            decoration: BoxDecoration(
              color: phaseColor.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: phaseColor.withValues(alpha: 0.3)),
            ),
            child: Text(phaseLabel, style: AppTypography.labelLg.copyWith(color: phaseColor)),
          ).animate().fadeIn(),
          const SizedBox(height: 48),

          // Circular Timer
          SizedBox(
            width: 280, height: 280,
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Background ring
                SizedBox.expand(
                  child: CircularProgressIndicator(
                    value: 1.0,
                    strokeWidth: 8,
                    color: phaseColor.withValues(alpha: 0.1),
                  ),
                ),
                // Progress ring
                SizedBox.expand(
                  child: CircularProgressIndicator(
                    value: timer.progress,
                    strokeWidth: 8,
                    strokeCap: StrokeCap.round,
                    color: phaseColor,
                  ),
                ),
                // Time display
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      '$mins:$secs',
                      style: AppTypography.displayLg.copyWith(
                        fontSize: 56,
                        color: AppColors.textPrimary,
                        fontFeatures: [const FontFeature.tabularFigures()],
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Session ${timer.cycleCount + 1}',
                      style: AppTypography.labelMd.copyWith(color: AppColors.textSecondary),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 48),

          // Controls
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Skip
              _CircleBtn(
                icon: Icons.skip_next_rounded,
                color: AppColors.textSecondary,
                onTap: () {
                  _stopTicker();
                  ref.read(timerProvider.notifier).skip();
                },
              ),
              const SizedBox(width: 24),

              // Play / Pause
              GestureDetector(
                onTap: () {
                  if (timer.isRunning) {
                    ref.read(timerProvider.notifier).pause();
                  } else {
                    ref.read(timerProvider.notifier).start();
                  }
                },
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  width: 80, height: 80,
                  decoration: BoxDecoration(
                    color: phaseColor,
                    shape: BoxShape.circle,
                    boxShadow: [BoxShadow(color: phaseColor.withValues(alpha: 0.4), blurRadius: 24, spreadRadius: 4)],
                  ),
                  child: Icon(
                    timer.isRunning ? Icons.pause_rounded : Icons.play_arrow_rounded,
                    color: AppColors.bgBase,
                    size: 40,
                  ),
                ),
              ).animate(target: timer.isRunning ? 1 : 0).scale(end: const Offset(1.05, 1.05)),
              const SizedBox(width: 24),

              // Reset
              _CircleBtn(
                icon: Icons.refresh_rounded,
                color: AppColors.textSecondary,
                onTap: () {
                  _stopTicker();
                  ref.read(timerProvider.notifier).reset();
                },
              ),
            ],
          ),
          const SizedBox(height: 48),

          // Session counter dots
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(4, (i) {
              final completed = i < timer.cycleCount % 4;
              return Container(
                width: 10, height: 10,
                margin: const EdgeInsets.symmetric(horizontal: 4),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: completed ? phaseColor : AppColors.neutral700,
                ),
              );
            }),
          ),
        ],
      ),
    );
  }

  Color _phaseColor(TimerPhase phase) => switch (phase) {
    TimerPhase.work       => AppColors.primary400,
    TimerPhase.shortBreak => AppColors.success,
    TimerPhase.longBreak  => AppColors.plasma400,
  };

  String _phaseLabel(TimerPhase phase) => switch (phase) {
    TimerPhase.work       => '🔥  DEEP WORK',
    TimerPhase.shortBreak => '☕  SHORT BREAK',
    TimerPhase.longBreak  => '🌊  LONG BREAK',
  };
}

class _CircleBtn extends StatelessWidget {
  final IconData icon;
  final Color color;
  final VoidCallback onTap;
  const _CircleBtn({required this.icon, required this.color, required this.onTap});

  @override
  Widget build(BuildContext context) => GestureDetector(
    onTap: onTap,
    child: Container(
      width: 52, height: 52,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        shape: BoxShape.circle,
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Icon(icon, color: color, size: 24),
    ),
  );
}
