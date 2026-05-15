# ProductivityOS Mobile — Design System
## Flutter Implementation | Version 1.0

---

# PART 1: DESIGN PHILOSOPHY

## Mobile-Specific Principles

Web design system se inherit karta hai lekin mobile ke liye adapt kiya:

1. Thumb-friendly — All primary actions reachable with one thumb
2. Glanceable — Key info visible in 2 seconds
3. High contrast — Readable in sunlight (gym, outdoor)
4. Haptic-first — Every important action has haptic feedback
5. One-handed — Bottom navigation, FAB bottom-right
6. Gym mode — Extra large targets, no small text during workout

Touch target minimum: 44x44px (Apple HIG + Material spec)
Bottom navigation: 56px height
FAB: 56px diameter, positioned bottom-right

---

# PART 2: COLOR SYSTEM (Flutter)

```dart
// lib/core/theme/app_colors.dart

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
```

---

# PART 3: TYPOGRAPHY (Flutter)

```dart
// lib/core/theme/app_typography.dart

// Google Fonts packages needed:
// flutter pub add google_fonts

import 'package:google_fonts/google_fonts.dart';

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
    fontFeatures: [FontFeature.tabularFigures()],
  );
  static TextStyle monoLg = GoogleFonts.jetBrainsMono(
    fontSize: 24, fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    fontFeatures: [FontFeature.tabularFigures()],
  );
  static TextStyle monoMd = GoogleFonts.jetBrainsMono(
    fontSize: 16, fontWeight: FontWeight.w500,
    color: AppColors.textPrimary,
    fontFeatures: [FontFeature.tabularFigures()],
  );
  static TextStyle monoSm = GoogleFonts.jetBrainsMono(
    fontSize: 12, fontWeight: FontWeight.w400,
    color: AppColors.textSecondary,
    fontFeatures: [FontFeature.tabularFigures()],
  );
}
```

---

# PART 4: SPACING SYSTEM

```dart
// lib/core/theme/app_spacing.dart

class AppSpacing {
  static const double px   = 1.0;
  static const double xs   = 4.0;
  static const double sm   = 8.0;
  static const double md   = 12.0;
  static const double lg   = 16.0;
  static const double xl   = 20.0;
  static const double xl2  = 24.0;
  static const double xl3  = 32.0;
  static const double xl4  = 40.0;
  static const double xl5  = 48.0;
  static const double xl6  = 64.0;

  // Screen padding
  static const EdgeInsets screenPadding = EdgeInsets.symmetric(horizontal: 16, vertical: 16);
  static const EdgeInsets cardPadding   = EdgeInsets.all(16);
  static const EdgeInsets cardPaddingLg = EdgeInsets.all(20);

  // Safe areas (handled via SafeArea widget)
  static const double bottomNavHeight = 72.0;  // Nav bar + safe area
  static const double headerHeight    = 56.0;
  static const double fabSize         = 56.0;
}
```

---

# PART 5: THEME SETUP

```dart
// lib/core/theme/app_theme.dart

class AppTheme {
  static ThemeData get darkTheme => ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.bgBase,
    primaryColor: AppColors.primary400,
    colorScheme: const ColorScheme.dark(
      primary:    AppColors.primary400,
      secondary:  AppColors.plasma400,
      tertiary:   AppColors.accent400,
      surface:    AppColors.bgSurface,
      error:      AppColors.danger,
      onPrimary:  Color(0xFF0D0D12),
      onSurface:  AppColors.textPrimary,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.bgBase,
      elevation: 0,
      scrolledUnderElevation: 0,
      surfaceTintColor: Colors.transparent,
      iconTheme: IconThemeData(color: AppColors.textPrimary),
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: AppColors.bgSurface,
      selectedItemColor: AppColors.primary400,
      unselectedItemColor: AppColors.neutral500,
      type: BottomNavigationBarType.fixed,
      elevation: 0,
    ),
    cardTheme: CardThemeData(
      color: AppColors.bgSurface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: AppColors.borderDefault, width: 1),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.bgElevated,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: AppColors.borderDefault),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: AppColors.borderSubtle),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: AppColors.primary400, width: 1.5),
      ),
      labelStyle: AppTypography.labelLg,
      hintStyle: AppTypography.bodyMd.copyWith(color: AppColors.textMuted),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary400,
        foregroundColor: const Color(0xFF0D0D12),
        minimumSize: const Size(double.infinity, 48),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: AppTypography.bodyLg.copyWith(fontWeight: FontWeight.w600),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: AppColors.primary400,
        textStyle: AppTypography.bodyMd.copyWith(fontWeight: FontWeight.w600),
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColors.borderSubtle,
      thickness: 1,
      space: 0,
    ),
    iconTheme: const IconThemeData(color: AppColors.textSecondary, size: 20),
  );
}
```

---

# PART 6: COMPONENT LIBRARY (Flutter Widgets)

## 6.1 AppButton

```dart
// lib/shared/widgets/app_button.dart

enum AppButtonVariant { primary, secondary, ghost, danger, icon }

class AppButton extends StatelessWidget {
  final String? label;
  final VoidCallback? onPressed;
  final AppButtonVariant variant;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final bool isLoading;
  final bool isFullWidth;
  final double? height;

  const AppButton({
    super.key,
    this.label,
    this.onPressed,
    this.variant = AppButtonVariant.primary,
    this.prefixIcon,
    this.suffixIcon,
    this.isLoading = false,
    this.isFullWidth = false,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: isLoading ? null : () {
        HapticFeedback.lightImpact();
        onPressed?.call();
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        height: height ?? 48,
        width: isFullWidth ? double.infinity : null,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        decoration: _getDecoration(),
        child: _buildContent(),
      ),
    );
  }

  BoxDecoration _getDecoration() {
    return switch (variant) {
      AppButtonVariant.primary => BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppColors.primary400, Color(0xFFFF6B00)],
          begin: Alignment.centerLeft, end: Alignment.centerRight,
        ),
        borderRadius: BorderRadius.circular(10),
        boxShadow: onPressed != null ? [
          const BoxShadow(color: AppColors.primaryGlow, blurRadius: 16, spreadRadius: 0),
        ] : null,
      ),
      AppButtonVariant.secondary => BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.borderPrimary, width: 1),
      ),
      AppButtonVariant.danger => BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFEF4444), Color(0xFFDC2626)],
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      AppButtonVariant.ghost => BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(10),
      ),
      AppButtonVariant.icon => BoxDecoration(
        color: AppColors.bgElevated,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.borderSubtle),
      ),
    };
  }

  Widget _buildContent() {
    if (isLoading) {
      return const Center(
        child: SizedBox(
          width: 20, height: 20,
          child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.textPrimary),
        ),
      );
    }
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: isFullWidth ? MainAxisSize.max : MainAxisSize.min,
      children: [
        if (prefixIcon != null) ...[prefixIcon!, const SizedBox(width: 8)],
        if (label != null) Text(
          label!,
          style: AppTypography.bodyLg.copyWith(
            fontWeight: FontWeight.w600,
            color: variant == AppButtonVariant.primary
                ? const Color(0xFF0D0D12)
                : AppColors.textPrimary,
          ),
        ),
        if (suffixIcon != null) ...[const SizedBox(width: 8), suffixIcon!],
      ],
    );
  }
}
```

## 6.2 AppCard

```dart
// lib/shared/widgets/app_card.dart

class AppCard extends StatelessWidget {
  final Widget child;
  final Color? glowColor;
  final VoidCallback? onTap;
  final EdgeInsets? padding;
  final bool isSelected;

  const AppCard({
    super.key,
    required this.child,
    this.glowColor,
    this.onTap,
    this.padding,
    this.isSelected = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap != null ? () {
        HapticFeedback.selectionClick();
        onTap!();
      } : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: padding ?? AppSpacing.cardPadding,
        decoration: BoxDecoration(
          color: AppColors.bgSurface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.borderPrimary : AppColors.borderDefault,
            width: 1,
          ),
          boxShadow: glowColor != null ? [
            BoxShadow(color: glowColor!.withOpacity(0.15), blurRadius: 20, spreadRadius: 0),
          ] : null,
        ),
        child: Column(
          children: [
            // Top highlight line
            Positioned(
              top: 0, left: 16, right: 16,
              child: Container(
                height: 1,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.transparent, Color(0x1AFFFFFF), Colors.transparent],
                  ),
                ),
              ),
            ),
            child,
          ],
        ),
      ),
    );
  }
}
```

## 6.3 TaskCard (Mobile Swipeable)

```dart
// lib/features/tasks/presentation/task_card.dart

class TaskCard extends StatelessWidget {
  final Task task;
  final VoidCallback onComplete;
  final VoidCallback onFail;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: Key(task.id),
      // Swipe right → complete
      background: _buildCompleteBackground(),
      // Swipe left → fail/options
      secondaryBackground: _buildFailBackground(),
      confirmDismiss: (direction) async {
        if (direction == DismissDirection.startToEnd) {
          HapticFeedback.mediumImpact();
          onComplete();
          return false; // Don't actually dismiss — handled by state
        } else {
          HapticFeedback.heavyImpact();
          onFail();
          return false;
        }
      },
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppColors.bgSurface,
            borderRadius: BorderRadius.circular(12),
            border: Border(
              left: BorderSide(
                color: _getPriorityColor(task.priority),
                width: 3,
              ),
              top: const BorderSide(color: AppColors.borderSubtle),
              right: const BorderSide(color: AppColors.borderSubtle),
              bottom: const BorderSide(color: AppColors.borderSubtle),
            ),
          ),
          child: Row(
            children: [
              // Checkbox
              _buildCheckbox(),
              const SizedBox(width: 12),
              // Content
              Expanded(child: _buildContent()),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCompleteBackground() => Container(
    alignment: Alignment.centerLeft,
    padding: const EdgeInsets.only(left: 20),
    decoration: BoxDecoration(
      color: AppColors.success.withOpacity(0.15),
      borderRadius: BorderRadius.circular(12),
    ),
    child: const Row(children: [
      Icon(Icons.check_circle, color: AppColors.success),
      SizedBox(width: 8),
      Text('Complete', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.w600)),
    ]),
  );

  Color _getPriorityColor(String priority) => switch (priority) {
    'critical' => AppColors.danger,
    'high'     => AppColors.warning,
    'medium'   => AppColors.primary400,
    _          => AppColors.neutral600,
  };
}
```

## 6.4 XP Bar Widget

```dart
// lib/shared/widgets/xp_bar.dart

class XPBar extends StatefulWidget {
  final int current;
  final int max;
  final int level;

  @override
  State<XPBar> createState() => _XPBarState();
}

class _XPBarState extends State<XPBar> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _progressAnim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 1200));
    _progressAnim = Tween<double>(begin: 0, end: widget.current / widget.max)
        .animate(CurvedAnimation(parent: _controller, curve: Curves.elasticOut));
    _controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('LVL ${widget.level}', style: AppTypography.monoSm.copyWith(color: AppColors.primary400)),
            Text('${widget.current.toString().replaceAllMapped(
              RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]},')} XP',
              style: AppTypography.monoSm,
            ),
          ],
        ),
        const SizedBox(height: 6),
        Container(
          height: 6,
          decoration: BoxDecoration(
            color: AppColors.bgElevated,
            borderRadius: BorderRadius.circular(999),
          ),
          child: AnimatedBuilder(
            animation: _progressAnim,
            builder: (context, _) => FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: _progressAnim.value.clamp(0.0, 1.0),
              child: Container(
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppColors.primary600, AppColors.primary400, Color(0xFFFFD97A)],
                  ),
                  borderRadius: BorderRadius.circular(999),
                  boxShadow: [BoxShadow(color: AppColors.primaryGlow, blurRadius: 8)],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
```

## 6.5 Overlay Screen (Focus Shield)

```dart
// lib/features/focus/presentation/overlay_screen.dart

// This renders on top of ALL other apps
class OverlayScreen extends StatelessWidget {
  final Task currentTask;
  final VoidCallback onAcknowledge;
  final VoidCallback onEmergencyOverride;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          color: Color(0xF00D0D12),  // 94% opacity near-black
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Top warning indicator
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.danger.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: AppColors.danger.withOpacity(0.4)),
                  ),
                  child: Row(children: [
                    const Icon(Icons.shield, color: AppColors.danger, size: 16),
                    const SizedBox(width: 8),
                    Text('FOCUS SHIELD ACTIVE', style: AppTypography.labelMd.copyWith(color: AppColors.danger)),
                  ]),
                ),

                const SizedBox(height: 48),

                // Task display
                Text('YOUR MISSION', style: AppTypography.labelLg.copyWith(color: AppColors.textMuted)),
                const SizedBox(height: 12),
                Text(
                  currentTask.title,
                  style: AppTypography.displayLg.copyWith(color: AppColors.textPrimary),
                  textAlign: TextAlign.center,
                ),

                if (currentTask.description?.isNotEmpty == true) ...[
                  const SizedBox(height: 12),
                  Text(
                    currentTask.description!,
                    style: AppTypography.bodyMd.copyWith(color: AppColors.textSecondary),
                    textAlign: TextAlign.center,
                  ),
                ],

                const SizedBox(height: 64),

                // Primary action
                AppButton(
                  label: "I'M WORKING ON IT",
                  isFullWidth: true,
                  onPressed: onAcknowledge,
                ),

                const SizedBox(height: 16),

                // Emergency override (subtle, hard to tap accidentally)
                TextButton(
                  onPressed: onEmergencyOverride,
                  child: Text(
                    'Emergency Override',
                    style: AppTypography.bodySm.copyWith(color: AppColors.textMuted),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

---

# PART 7: NAVIGATION (GoRouter)

```dart
// lib/app.dart

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final isLoggedIn = authState.isAuthenticated;
      final isAuthRoute = state.uri.path.startsWith('/auth');

      if (!isLoggedIn && !isAuthRoute) return '/auth/login';
      if (isLoggedIn && isAuthRoute) return '/';
      return null;
    },
    routes: [
      // Auth routes
      GoRoute(path: '/auth/login', builder: (_, __) => const LoginScreen()),

      // Main shell with bottom nav
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(path: '/', builder: (_, __) => const HomeScreen()),
          GoRoute(path: '/tasks', builder: (_, __) => const TasksScreen()),
          GoRoute(path: '/focus', builder: (_, __) => const FocusScreen()),
          GoRoute(path: '/gym', builder: (_, __) => const GymScreen()),
          GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
        ],
      ),

      // Deep link routes (from notifications)
      GoRoute(path: '/tasks/:id', builder: (context, state) =>
          TaskDetailScreen(taskId: state.pathParameters['id']!)),
      GoRoute(path: '/achievements', builder: (_, __) => const AchievementsScreen()),
      GoRoute(path: '/journal/new', builder: (_, __) => const QuickJournalScreen()),
    ],
  );
});
```

---

# PART 8: ANIMATIONS

```dart
// lib/core/theme/app_animations.dart

class AppAnimations {
  // Duration constants
  static const Duration micro    = Duration(milliseconds: 100);
  static const Duration fast     = Duration(milliseconds: 150);
  static const Duration normal   = Duration(milliseconds: 250);
  static const Duration medium   = Duration(milliseconds: 400);
  static const Duration slow     = Duration(milliseconds: 600);
  static const Duration dramatic = Duration(milliseconds: 1000);

  // Curves
  static const Curve standard   = Curves.easeInOut;
  static const Curve enter      = Curves.easeOut;
  static const Curve exit       = Curves.easeIn;
  static const Curve spring     = Curves.elasticOut;
  static const Curve bounce     = Curves.bounceOut;

  // Page transitions
  static CustomTransitionPage<T> slideUp<T>({required Widget child, required LocalKey key}) {
    return CustomTransitionPage<T>(
      key: key,
      child: child,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return SlideTransition(
          position: Tween<Offset>(begin: const Offset(0, 0.05), end: Offset.zero)
              .animate(CurvedAnimation(parent: animation, curve: Curves.easeOut)),
          child: FadeTransition(opacity: animation, child: child),
        );
      },
    );
  }
}

// Achievement animation widget using flutter_animate
class AchievementUnlockAnimation extends StatelessWidget {
  final Achievement achievement;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      glowColor: AppColors.accent400,
      child: Row(children: [
        Text(achievement.emoji, style: const TextStyle(fontSize: 32))
            .animate()
            .scale(begin: const Offset(0, 0), end: const Offset(1, 1),
                   curve: Curves.elasticOut, duration: 600.ms)
            .rotate(begin: -0.2, end: 0),
        const SizedBox(width: 12),
        Expanded(child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Achievement Unlocked!', style: AppTypography.labelLg.copyWith(color: AppColors.accent300))
                .animate().fadeIn(delay: 200.ms).slideX(begin: 0.2),
            Text(achievement.name, style: AppTypography.displaySm)
                .animate().fadeIn(delay: 300.ms).slideX(begin: 0.2),
          ],
        )),
      ]),
    ).animate()
      .slideY(begin: -2, end: 0, curve: Curves.elasticOut, duration: 700.ms)
      .fadeIn(duration: 200.ms);
  }
}
```

---

# PART 9: HAPTICS MAP

```dart
// lib/core/utils/haptics_map.dart
// Every important action has corresponding haptic

class AppHaptics {
  static Future<void> taskComplete()    async => HapticFeedback.mediumImpact();
  static Future<void> taskFail()        async => HapticFeedback.heavyImpact();
  static Future<void> levelUp()         async {
    // Double pulse for level up
    await HapticFeedback.heavyImpact();
    await Future.delayed(const Duration(milliseconds: 100));
    await HapticFeedback.heavyImpact();
  }
  static Future<void> achievement()     async => HapticFeedback.mediumImpact();
  static Future<void> buttonTap()       async => HapticFeedback.lightImpact();
  static Future<void> selection()       async => HapticFeedback.selectionClick();
  static Future<void> error()           async => HapticFeedback.vibrate();
  static Future<void> pomodoroEnd()     async {
    for (int i = 0; i < 3; i++) {
      await HapticFeedback.mediumImpact();
      await Future.delayed(const Duration(milliseconds: 150));
    }
  }
  static Future<void> focusShieldOn()   async => HapticFeedback.heavyImpact();
  static Future<void> newPR()           async {
    await HapticFeedback.heavyImpact();
    await Future.delayed(const Duration(milliseconds: 80));
    await HapticFeedback.mediumImpact();
  }
}
```

---

# PART 10: RESPONSIVE LAYOUT

```dart
// Mobile-first — no sidebar needed
// All layouts vertical with bottom nav

class ScreenLayout extends StatelessWidget {
  final Widget child;
  final String title;
  final List<Widget>? actions;
  final Widget? fab;
  final bool showBackButton;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgBase,
      appBar: AppBar(
        title: Text(title, style: AppTypography.displaySm),
        actions: actions,
        leading: showBackButton
            ? IconButton(icon: const Icon(Icons.arrow_back_ios_new, size: 18), onPressed: () => context.pop())
            : null,
      ),
      body: child,
      floatingActionButton: fab,
    );
  }
}
```

---

*Mobile Design System End — ProductivityOS v1.0*
