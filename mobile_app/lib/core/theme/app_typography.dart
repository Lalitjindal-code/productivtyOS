import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTypography {
  // === DISPLAY — Rajdhani (same as web) ===
  static TextStyle display2xl = GoogleFonts.rajdhani(
    fontSize: 48, fontWeight: FontWeight.w700,
    color: AppColors.textPrimary, letterSpacing: 2,
  );
  static TextStyle displayXl = GoogleFonts.rajdhani(
    fontSize: 36, fontWeight: FontWeight.w700,
    color: AppColors.textPrimary, letterSpacing: 1.5,
  );
  static TextStyle displayLg = GoogleFonts.rajdhani(
    fontSize: 28, fontWeight: FontWeight.w700,
    color: AppColors.textPrimary, letterSpacing: 1,
  );
  static TextStyle displayMd = GoogleFonts.rajdhani(
    fontSize: 22, fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );
  static TextStyle displaySm = GoogleFonts.rajdhani(
    fontSize: 18, fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );

  // === BODY — Outfit ===
  static TextStyle bodyXl = GoogleFonts.outfit(
    fontSize: 18, fontWeight: FontWeight.w400,
    color: AppColors.textPrimary, height: 1.5,
  );
  static TextStyle bodyLg = GoogleFonts.outfit(
    fontSize: 16, fontWeight: FontWeight.w400,
    color: AppColors.textPrimary, height: 1.5,
  );
  static TextStyle bodyMd = GoogleFonts.outfit(
    fontSize: 14, fontWeight: FontWeight.w400,
    color: AppColors.textPrimary, height: 1.5,
  );
  static TextStyle bodySm = GoogleFonts.outfit(
    fontSize: 12, fontWeight: FontWeight.w400,
    color: AppColors.textSecondary, height: 1.4,
  );
  static TextStyle bodyXs = GoogleFonts.outfit(
    fontSize: 11, fontWeight: FontWeight.w400,
    color: AppColors.textMuted,
  );

  // Labels — uppercase tracking
  static TextStyle labelLg = GoogleFonts.outfit(
    fontSize: 12, fontWeight: FontWeight.w600,
    color: AppColors.textSecondary,
    letterSpacing: 1.5,
  );
  static TextStyle labelMd = GoogleFonts.outfit(
    fontSize: 10, fontWeight: FontWeight.w600,
    color: AppColors.textMuted,
    letterSpacing: 1.5,
  );

  // === MONO — JetBrains Mono ===
  static TextStyle monoXl = GoogleFonts.jetBrainsMono(
    fontSize: 32, fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    fontFeatures: [const FontFeature.tabularFigures()],
  );
  static TextStyle monoLg = GoogleFonts.jetBrainsMono(
    fontSize: 24, fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    fontFeatures: [const FontFeature.tabularFigures()],
  );
  static TextStyle monoMd = GoogleFonts.jetBrainsMono(
    fontSize: 16, fontWeight: FontWeight.w500,
    color: AppColors.textPrimary,
    fontFeatures: [const FontFeature.tabularFigures()],
  );
  static TextStyle monoSm = GoogleFonts.jetBrainsMono(
    fontSize: 12, fontWeight: FontWeight.w400,
    color: AppColors.textSecondary,
    fontFeatures: [const FontFeature.tabularFigures()],
  );
}
