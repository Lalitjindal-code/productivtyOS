import 'package:flutter/material.dart';

class AppColors {
  // === BACKGROUNDS ===
  static const bgVoid      = Color(0xFF070709);
  static const bgBase      = Color(0xFF0D0D12);
  static const bgSurface   = Color(0xFF13131A);
  static const bgElevated  = Color(0xFF1A1A24);
  static const bgOverlay   = Color(0xFF22222F);

  // === PRIMARY — Electric Amber ===
  static const primary50   = Color(0xFFFFF8E7);
  static const primary100  = Color(0xFFFFEFC4);
  static const primary200  = Color(0xFFFFD97A);
  static const primary300  = Color(0xFFFFC340);
  static const primary400  = Color(0xFFFFAD00);  // Main
  static const primary500  = Color(0xFFE69900);
  static const primary600  = Color(0xFFCC8800);
  static const primaryGlow = Color(0x33FFAD00);

  // === PLASMA CYAN — AI features ===
  static const plasma300   = Color(0xFF00E8FF);
  static const plasma400   = Color(0xFF00C8E0);  // Main
  static const plasma500   = Color(0xFF00A8C0);
  static const plasmaGlow  = Color(0x2900C8E0);

  // === VOID PURPLE — RPG ===
  static const accent300   = Color(0xFFC084FC);
  static const accent400   = Color(0xFFA855F7);  // Main
  static const accent500   = Color(0xFF9333EA);
  static const accentGlow  = Color(0x33A855F7);

  // === SEMANTIC ===
  static const success     = Color(0xFF22C55E);
  static const successGlow = Color(0x2922C55E);
  static const danger      = Color(0xFFEF4444);
  static const dangerGlow  = Color(0x29EF4444);
  static const warning     = Color(0xFFF59E0B);
  static const warningGlow = Color(0x29F59E0B);

  // === NEUTRALS ===
  static const neutral50   = Color(0xFFF8F8FA);
  static const neutral100  = Color(0xFFE8E8F0);
  static const neutral200  = Color(0xFFC8C8D8);
  static const neutral300  = Color(0xFFA0A0B8);
  static const neutral400  = Color(0xFF7878A0);
  static const neutral500  = Color(0xFF555570);
  static const neutral600  = Color(0xFF383850);
  static const neutral700  = Color(0xFF252535);
  static const neutral800  = Color(0xFF181826);

  // === TEXT ===
  static const textPrimary   = Color(0xFFF0F0F8);
  static const textSecondary = Color(0xFF9090B0);
  static const textMuted     = Color(0xFF505068);

  // === BORDERS ===
  static const borderSubtle  = Color(0x0FFFFFFF);
  static const borderDefault = Color(0x1AFFFFFF);
  static const borderStrong  = Color(0x2DFFFFFF);
  static const borderPrimary = Color(0x4DFFAD00);

  // === CATEGORY COLORS ===
  static const Map<String, Color> categoryColors = {
    'work':     Color(0xFFFFAD00),
    'study':    Color(0xFF00C8E0),
    'gym':      Color(0xFF22C55E),
    'personal': Color(0xFFA855F7),
    'creative': Color(0xFFF472B6),
    'finance':  Color(0xFF34D399),
    'health':   Color(0xFFFB923C),
  };
}
