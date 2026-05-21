import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';
import 'package:speech_to_text/speech_to_text.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/app_card.dart';
import '../../../shared/widgets/loading_skeleton.dart';
import '../../../core/network/dio_client.dart';
import '../../../core/constants/api_constants.dart';

// ── Model ─────────────────────────────────────────────────────────────
class JournalEntry {
  final String id;
  final DateTime date;
  final int moodScore;
  final String achieved;
  final String struggled;
  final String intention;
  final String freeText;
  final List<String> tags;

  const JournalEntry({
    required this.id,
    required this.date,
    required this.moodScore,
    required this.achieved,
    required this.struggled,
    required this.intention,
    required this.freeText,
    required this.tags,
  });

  factory JournalEntry.fromJson(Map<String, dynamic> json) => JournalEntry(
    id: json['_id']?.toString() ?? '',
    date: DateTime.tryParse(json['date']?.toString() ?? '') ?? DateTime.now(),
    moodScore: (json['mood']?['score'] as num?)?.toInt() ?? 3,
    achieved: json['achieved']?.toString() ?? '',
    struggled: json['struggled']?.toString() ?? '',
    intention: json['intention']?.toString() ?? '',
    freeText: json['freeText']?.toString() ?? '',
    tags: (json['tags'] as List?)?.map((t) => t.toString()).toList() ?? [],
  );

  String get moodEmoji => ['', '😩', '😕', '😐', '🙂', '🔥'][moodScore.clamp(1, 5)];
}

// ── Provider ──────────────────────────────────────────────────────────
final journalProvider = FutureProvider<List<JournalEntry>>((ref) async {
  final dio = DioClient.getInstance();
  final res = await dio.get(ApiConstants.journal);
  final raw = res.data;
  final list = raw is List ? raw : (raw['entries'] as List? ?? []);
  return list.map((e) => JournalEntry.fromJson(e as Map<String, dynamic>)).toList();
});

// ── Screen ────────────────────────────────────────────────────────────
class JournalScreen extends ConsumerWidget {
  const JournalScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final entriesAsync = ref.watch(journalProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('JOURNAL', style: AppTypography.displaySm),
      ),
      body: RefreshIndicator(
        color: AppColors.primary400,
        backgroundColor: AppColors.bgSurface,
        onRefresh: () async => ref.invalidate(journalProvider),
        child: entriesAsync.when(
          data: (entries) {
            if (entries.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.book_outlined, size: 64, color: AppColors.textMuted),
                    const SizedBox(height: 16),
                    Text('No entries yet.', style: AppTypography.bodyLg.copyWith(color: AppColors.textSecondary)),
                    Text('Tap + to write your first reflection.', style: AppTypography.bodySm),
                  ],
                ),
              );
            }
            return ListView.builder(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 80),
              itemCount: entries.length,
              itemBuilder: (ctx, i) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _EntryCard(entry: entries[i])
                    .animate()
                    .fadeIn(delay: (i * 40).ms)
                    .slideY(begin: 0.05),
              ),
            );
          },
          loading: () => ListView(
            padding: AppSpacing.screenPadding,
            children: List.generate(4, (_) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: SkeletonCard(lines: 4),
            )),
          ),
          error: (e, _) => Center(child: Text('Error: $e', style: AppTypography.bodySm.copyWith(color: AppColors.danger))),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.accent400,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.edit_outlined),
        label: Text('Reflect', style: AppTypography.bodyMd.copyWith(color: Colors.white, fontWeight: FontWeight.w700)),
        onPressed: () => _showEntryForm(context, ref),
      ),
    );
  }

  void _showEntryForm(BuildContext context, WidgetRef ref) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.bgSurface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => _EntryForm(onSaved: () => ref.invalidate(journalProvider)),
    );
  }
}

// ── Entry Card ────────────────────────────────────────────────────────
class _EntryCard extends StatelessWidget {
  final JournalEntry entry;
  const _EntryCard({required this.entry});

  @override
  Widget build(BuildContext context) {
    return AppCard(
      glowColor: AppColors.accent400,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(entry.moodEmoji, style: const TextStyle(fontSize: 24)),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      DateFormat('EEEE, MMM d').format(entry.date),
                      style: AppTypography.bodyMd.copyWith(fontWeight: FontWeight.w700),
                    ),
                    Text(DateFormat('yyyy').format(entry.date), style: AppTypography.bodySm.copyWith(color: AppColors.textSecondary)),
                  ],
                ),
              ),
            ],
          ),
          if (entry.achieved.isNotEmpty) ...[
            const SizedBox(height: 10),
            _Section('✅ Achievement', entry.achieved, AppColors.success),
          ],
          if (entry.struggled.isNotEmpty) ...[
            const SizedBox(height: 6),
            _Section('⚡ Friction', entry.struggled, AppColors.warning),
          ],
          if (entry.tags.isNotEmpty) ...[
            const SizedBox(height: 10),
            Wrap(
              spacing: 6,
              children: entry.tags.map((tag) => Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.accent400.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: AppColors.accent400.withValues(alpha: 0.2)),
                ),
                child: Text('#$tag', style: AppTypography.labelSm.copyWith(color: AppColors.accent400, fontSize: 10)),
              )).toList(),
            ),
          ],
        ],
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final String label, content;
  final Color color;
  const _Section(this.label, this.content, this.color);

  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: AppTypography.labelSm.copyWith(color: color, fontSize: 10)),
      const SizedBox(height: 2),
      Text(content, style: AppTypography.bodySm.copyWith(color: AppColors.textSecondary), maxLines: 2, overflow: TextOverflow.ellipsis),
    ],
  );
}

// ── Entry Form ────────────────────────────────────────────────────────
class _EntryForm extends ConsumerStatefulWidget {
  final VoidCallback onSaved;
  const _EntryForm({required this.onSaved});

  @override
  ConsumerState<_EntryForm> createState() => _EntryFormState();
}

class _EntryFormState extends ConsumerState<_EntryForm> {
  final _achievedCtrl  = TextEditingController();
  final _struggledCtrl = TextEditingController();
  final _intentionCtrl = TextEditingController();
  final _speech = SpeechToText();

  int _moodScore = 3;
  bool _loading  = false;
  bool _listening = false;

  static const _moodEmojis = ['', '😩', '😕', '😐', '🙂', '🔥'];

  @override
  void dispose() {
    _achievedCtrl.dispose();
    _struggledCtrl.dispose();
    _intentionCtrl.dispose();
    super.dispose();
  }

  Future<void> _startListening(TextEditingController ctrl) async {
    final available = await _speech.initialize();
    if (!available) return;
    setState(() => _listening = true);
    await _speech.listen(onResult: (result) {
      ctrl.text = result.recognizedWords;
    });
    await Future.delayed(const Duration(seconds: 5));
    await _speech.stop();
    if (mounted) setState(() => _listening = false);
  }

  Future<void> _submit() async {
    if (_achievedCtrl.text.trim().isEmpty) return;
    setState(() => _loading = true);
    try {
      final dio = DioClient.getInstance();
      await dio.post(ApiConstants.journal, data: {
        'date': DateTime.now().toIso8601String(),
        'mood': {'score': _moodScore},
        'achieved': _achievedCtrl.text.trim(),
        'struggled': _struggledCtrl.text.trim(),
        'intention': _intentionCtrl.text.trim(),
        'freeText': '',
        'tags': [],
      });
      widget.onSaved();
      if (mounted) Navigator.pop(context);
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.92,
      maxChildSize: 0.98,
      minChildSize: 0.5,
      expand: false,
      builder: (_, ctrl) => SingleChildScrollView(
        controller: ctrl,
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom + 24,
          left: 20, right: 20, top: 16,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Drag handle
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppColors.borderDefault, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 20),
            Text("Today's Reflection", style: AppTypography.displaySm),
            const SizedBox(height: 24),

            // Mood
            Text('How are you feeling?', style: AppTypography.labelMd),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(5, (i) {
                final score = i + 1;
                return GestureDetector(
                  onTap: () => setState(() => _moodScore = score),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 150),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: _moodScore == score ? AppColors.accent400.withValues(alpha: 0.2) : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: _moodScore == score ? AppColors.accent400 : Colors.transparent),
                    ),
                    child: Text(_moodEmojis[score], style: const TextStyle(fontSize: 28)),
                  ),
                );
              }),
            ),
            const SizedBox(height: 24),

            _VoiceField(label: '✅ Biggest achievement today?', hint: 'What move did you make that mattered?', ctrl: _achievedCtrl, listening: _listening, onMic: () => _startListening(_achievedCtrl)),
            const SizedBox(height: 16),
            _VoiceField(label: '⚡ Where was the friction?', hint: 'What slowed you down?', ctrl: _struggledCtrl, listening: _listening, onMic: () => _startListening(_struggledCtrl)),
            const SizedBox(height: 16),
            _VoiceField(label: '🚀 Tomorrow\'s primary intention?', hint: 'One thing that must happen', ctrl: _intentionCtrl, listening: _listening, onMic: () => _startListening(_intentionCtrl)),
            const SizedBox(height: 28),

            SizedBox(
              width: double.infinity, height: 52,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: AppColors.accent400, foregroundColor: Colors.white),
                onPressed: _loading ? null : _submit,
                child: _loading
                    ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                    : const Text('SAVE REFLECTION'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _VoiceField extends StatelessWidget {
  final String label, hint;
  final TextEditingController ctrl;
  final bool listening;
  final VoidCallback onMic;

  const _VoiceField({required this.label, required this.hint, required this.ctrl, required this.listening, required this.onMic});

  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: AppTypography.labelMd),
      const SizedBox(height: 8),
      TextField(
        controller: ctrl,
        maxLines: 2,
        style: AppTypography.bodyMd,
        decoration: InputDecoration(
          hintText: hint,
          suffixIcon: IconButton(
            icon: Icon(listening ? Icons.mic : Icons.mic_none_outlined, color: listening ? AppColors.danger : AppColors.textSecondary),
            onPressed: onMic,
          ),
        ),
      ),
    ],
  );
}
