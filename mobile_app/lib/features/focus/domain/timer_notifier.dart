import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import '../../../core/constants/app_constants.dart';
import '../../../core/constants/api_constants.dart';
import '../../../core/network/dio_client.dart';

// ── Timer State ────────────────────────────────────────────────────────
enum TimerPhase { work, shortBreak, longBreak }

class TimerState {
  final TimerPhase phase;
  final int totalSeconds;
  final int remainingSeconds;
  final bool isRunning;
  final int cycleCount;

  const TimerState({
    required this.phase,
    required this.totalSeconds,
    required this.remainingSeconds,
    required this.isRunning,
    required this.cycleCount,
  });

  double get progress => remainingSeconds / totalSeconds;
  bool get isComplete => remainingSeconds <= 0;

  TimerState copyWith({
    TimerPhase? phase,
    int? totalSeconds,
    int? remainingSeconds,
    bool? isRunning,
    int? cycleCount,
  }) => TimerState(
    phase: phase ?? this.phase,
    totalSeconds: totalSeconds ?? this.totalSeconds,
    remainingSeconds: remainingSeconds ?? this.remainingSeconds,
    isRunning: isRunning ?? this.isRunning,
    cycleCount: cycleCount ?? this.cycleCount,
  );
}

class TimerNotifier extends Notifier<TimerState> {
  static const _workSecs       = AppConstants.pomodoroWorkMinutes * 60;
  static const _shortBreakSecs = AppConstants.pomodoroShortBreakMinutes * 60;
  static const _longBreakSecs  = AppConstants.pomodoroLongBreakMinutes * 60;
  static const _longBreakEvery = AppConstants.pomodoroLongBreakInterval;

  @override
  TimerState build() {
    return const TimerState(
      phase: TimerPhase.work,
      totalSeconds: _workSecs,
      remainingSeconds: _workSecs,
      isRunning: false,
      cycleCount: 0,
    );
  }

  void tick() {
    if (!state.isRunning) return;
    if (state.remainingSeconds <= 1) {
      _onPhaseComplete();
    } else {
      state = state.copyWith(remainingSeconds: state.remainingSeconds - 1);
    }
  }

  void start() => state = state.copyWith(isRunning: true);
  void pause() => state = state.copyWith(isRunning: false);

  void reset() => state = state.copyWith(
    remainingSeconds: state.totalSeconds,
    isRunning: false,
  );

  void skip() => _advancePhase();

  void _onPhaseComplete() {
    if (state.phase == TimerPhase.work) {
      // Log session to server
      _logSession();
    }
    _advancePhase();
  }

  void _advancePhase() {
    final newCycles = state.phase == TimerPhase.work ? state.cycleCount + 1 : state.cycleCount;
    final TimerPhase nextPhase;
    final int nextSecs;

    if (state.phase == TimerPhase.work) {
      if (newCycles % _longBreakEvery == 0) {
        nextPhase = TimerPhase.longBreak;
        nextSecs  = _longBreakSecs;
      } else {
        nextPhase = TimerPhase.shortBreak;
        nextSecs  = _shortBreakSecs;
      }
    } else {
      nextPhase = TimerPhase.work;
      nextSecs  = _workSecs;
    }

    state = TimerState(
      phase: nextPhase,
      totalSeconds: nextSecs,
      remainingSeconds: nextSecs,
      isRunning: false,
      cycleCount: newCycles,
    );
  }

  Future<void> _logSession() async {
    try {
      final dio = DioClient.getInstance();
      await dio.post(ApiConstants.pomodoroSessions, data: {
        'duration': AppConstants.pomodoroWorkMinutes,
        'type': 'work',
        'completedAt': DateTime.now().toIso8601String(),
      });
    } catch (_) {
      // Fail silently — timer shouldn't crash if server is down
    }
  }
}

final timerProvider = NotifierProvider<TimerNotifier, TimerState>(() {
  return TimerNotifier();
});
