import 'package:speech_to_text/speech_to_text.dart';

class VoiceService {
  final SpeechToText _speech = SpeechToText();

  Future<bool> initialize() async {
    return await _speech.initialize();
  }

  Future<void> startListening(Function(String) onResult) async {
    if (await _speech.initialize()) {
      _speech.listen(onResult: (result) {
        onResult(result.recognizedWords);
      });
    }
  }

  Future<void> stopListening() async {
    await _speech.stop();
  }
}
