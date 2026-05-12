# ProductivityOS — Complete Design System
## Version 1.0 | Senior UI/UX + Design Engineering Reference

---

# PART 1: DESIGN PHILOSOPHY & AESTHETIC DIRECTION

## 1.1 Core Aesthetic: "Dark Forge" — Industrial Futurism meets Living Game

**Concept:** ProductivityOS looks and feels like a living command center — not a sterile SaaS tool. It borrows from:
- **Video game HUDs** — XP bars, boss HP, glowing stats
- **Military command rooms** — data density, precision, trust
- **Cyberpunk terminals** — neon accents on near-black, scan lines, depth
- **Premium watch design** — every detail intentional, nothing decorative-only

**The ONE thing users remember:** "This app feels alive — it breathes, it reacts, it knows me."

**Design Axioms:**
1. Every interaction has a micro-response — nothing feels dead
2. Data is beautiful — numbers glow, bars animate, graphs breathe
3. Hierarchy through light — brightest = most important
4. Space is intentional — not empty, not crowded — precise
5. Motion has meaning — nothing animates without a reason

---

# PART 2: COLOR SYSTEM

## 2.1 Base Palette — CSS Custom Properties

```css
:root {
  /* === BACKGROUNDS === */
  --bg-void:        #070709;   /* Deepest background — pure near-black */
  --bg-base:        #0D0D12;   /* Main app background */
  --bg-surface:     #13131A;   /* Cards, panels */
  --bg-elevated:    #1A1A24;   /* Modals, dropdowns, hover states */
  --bg-overlay:     #22222F;   /* Tooltips, popovers */
  --bg-glass:       rgba(19, 19, 26, 0.72); /* Glassmorphism surfaces */

  /* === PRIMARY — Electric Amber (energy, fire, streak) === */
  --primary-50:     #FFF8E7;
  --primary-100:    #FFEFC4;
  --primary-200:    #FFD97A;
  --primary-300:    #FFC340;
  --primary-400:    #FFAD00;   /* Main primary */
  --primary-500:    #E69900;
  --primary-600:    #CC8800;
  --primary-700:    #995C00;   /* Dark primary for text on light */
  --primary-glow:   rgba(255, 173, 0, 0.20);
  --primary-glow-strong: rgba(255, 173, 0, 0.40);

  /* === SECONDARY — Plasma Cyan (AI, intelligence, memory) === */
  --secondary-50:   #E0FFFE;
  --secondary-100:  #B3FFFC;
  --secondary-200:  #4DFFF8;
  --secondary-300:  #00E8FF;
  --secondary-400:  #00C8E0;   /* Main secondary */
  --secondary-500:  #00A8C0;
  --secondary-600:  #0088A0;
  --secondary-glow: rgba(0, 200, 224, 0.18);
  --secondary-glow-strong: rgba(0, 200, 224, 0.35);

  /* === ACCENT — Void Purple (RPG, achievements, magic) === */
  --accent-300:     #C084FC;
  --accent-400:     #A855F7;   /* Main accent */
  --accent-500:     #9333EA;
  --accent-600:     #7C3AED;
  --accent-glow:    rgba(168, 85, 247, 0.20);

  /* === SEMANTIC COLORS === */
  --success-400:    #22C55E;   /* Task complete, streak, win */
  --success-500:    #16A34A;
  --success-glow:   rgba(34, 197, 94, 0.18);

  --danger-400:     #EF4444;   /* Failed task, low HP, critical */
  --danger-500:     #DC2626;
  --danger-glow:    rgba(239, 68, 68, 0.20);

  --warning-400:    #F59E0B;   /* Overdue, warnings */
  --warning-500:    #D97706;
  --warning-glow:   rgba(245, 158, 11, 0.18);

  --info-400:       #38BDF8;   /* Info states, notes */
  --info-glow:      rgba(56, 189, 248, 0.15);

  /* === NEUTRAL SCALE === */
  --neutral-50:     #F8F8FA;
  --neutral-100:    #E8E8F0;
  --neutral-200:    #C8C8D8;
  --neutral-300:    #A0A0B8;
  --neutral-400:    #7878A0;
  --neutral-500:    #555570;
  --neutral-600:    #383850;
  --neutral-700:    #252535;
  --neutral-800:    #181826;
  --neutral-900:    #0D0D18;

  /* === TEXT === */
  --text-primary:   #F0F0F8;   /* Main body text */
  --text-secondary: #9090B0;   /* Subtitles, labels */
  --text-muted:     #505068;   /* Disabled, placeholder */
  --text-inverted:  #0D0D12;   /* Text on bright backgrounds */

  /* === BORDERS === */
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --border-strong:  rgba(255, 255, 255, 0.18);
  --border-primary: rgba(255, 173, 0, 0.30);
  --border-secondary: rgba(0, 200, 224, 0.25);

  /* === GRADIENTS === */
  --gradient-primary:   linear-gradient(135deg, #FFAD00 0%, #FF6B00 100%);
  --gradient-secondary: linear-gradient(135deg, #00C8E0 0%, #0088A0 100%);
  --gradient-accent:    linear-gradient(135deg, #A855F7 0%, #7C3AED 100%);
  --gradient-success:   linear-gradient(135deg, #22C55E 0%, #15803D 100%);
  --gradient-danger:    linear-gradient(135deg, #EF4444 0%, #991B1B 100%);
  --gradient-surface:   linear-gradient(180deg, #1A1A24 0%, #13131A 100%);
  --gradient-glow-primary: radial-gradient(ellipse at center, rgba(255,173,0,0.15) 0%, transparent 70%);
  --gradient-mesh:      
    radial-gradient(at 20% 50%, rgba(255,173,0,0.05) 0px, transparent 50%),
    radial-gradient(at 80% 20%, rgba(0,200,224,0.05) 0px, transparent 50%),
    radial-gradient(at 50% 80%, rgba(168,85,247,0.04) 0px, transparent 50%);
}
```

## 2.2 Tailwind Config — Color Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        void:    '#070709',
        base:    '#0D0D12',
        surface: '#13131A',
        elevated:'#1A1A24',
        overlay: '#22222F',
        primary: {
          DEFAULT: '#FFAD00',
          50: '#FFF8E7',
          100: '#FFEFC4',
          200: '#FFD97A',
          300: '#FFC340',
          400: '#FFAD00',
          500: '#E69900',
          600: '#CC8800',
          700: '#995C00',
        },
        plasma: {
          DEFAULT: '#00C8E0',
          300: '#00E8FF',
          400: '#00C8E0',
          500: '#00A8C0',
          600: '#0088A0',
        },
        void_purple: {
          DEFAULT: '#A855F7',
          300: '#C084FC',
          400: '#A855F7',
          500: '#9333EA',
          600: '#7C3AED',
        },
      },
      backgroundImage: {
        'gradient-primary':   'linear-gradient(135deg, #FFAD00 0%, #FF6B00 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #00C8E0 0%, #0088A0 100%)',
        'gradient-accent':    'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
        'gradient-mesh':      'radial-gradient(at 20% 50%, rgba(255,173,0,0.05) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(0,200,224,0.05) 0px, transparent 50%)',
        'noise':              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    }
  }
}
```

## 2.3 Light Mode Override

```css
[data-theme="light"] {
  --bg-void:        #F0F0F5;
  --bg-base:        #F8F8FC;
  --bg-surface:     #FFFFFF;
  --bg-elevated:    #F4F4FA;
  --bg-glass:       rgba(255, 255, 255, 0.80);
  --text-primary:   #14141E;
  --text-secondary: #50507A;
  --text-muted:     #9090B0;
  --border-subtle:  rgba(0, 0, 0, 0.06);
  --border-default: rgba(0, 0, 0, 0.10);
  --border-strong:  rgba(0, 0, 0, 0.16);
  --primary-glow:   rgba(255, 173, 0, 0.12);
  --gradient-mesh:  
    radial-gradient(at 20% 50%, rgba(255,173,0,0.08) 0px, transparent 50%),
    radial-gradient(at 80% 20%, rgba(0,200,224,0.06) 0px, transparent 50%);
}
```

## 2.4 Category Color Map

```javascript
// Each task/goal category has its own identity color
const CATEGORY_COLORS = {
  work:     { hue: '#FFAD00', glow: 'rgba(255,173,0,0.2)',   icon: 'Briefcase'  },
  study:    { hue: '#00C8E0', glow: 'rgba(0,200,224,0.2)',   icon: 'BookOpen'   },
  gym:      { hue: '#22C55E', glow: 'rgba(34,197,94,0.2)',   icon: 'Dumbbell'   },
  personal: { hue: '#A855F7', glow: 'rgba(168,85,247,0.2)',  icon: 'Heart'      },
  creative: { hue: '#F472B6', glow: 'rgba(244,114,182,0.2)', icon: 'Palette'    },
  finance:  { hue: '#34D399', glow: 'rgba(52,211,153,0.2)',  icon: 'TrendingUp' },
  health:   { hue: '#FB923C', glow: 'rgba(251,146,60,0.2)',  icon: 'Activity'   },
}
```

---

# PART 3: TYPOGRAPHY SYSTEM

## 3.1 Font Families

```css
/* Import in index.html or global CSS */
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

:root {
  /* DISPLAY — Rajdhani: Angular, military, game-like. For headings, stats, XP */
  --font-display: 'Rajdhani', sans-serif;

  /* BODY — Outfit: Modern, clean, readable. For all UI text */
  --font-body: 'Outfit', sans-serif;

  /* MONO — JetBrains Mono: For code, numbers, data, timers */
  --font-mono: 'JetBrains Mono', monospace;
}
```

**Why these fonts:**
- **Rajdhani** — Has a slight military/tech edge. Capital letters feel like they belong in a game HUD. Not used anywhere else on the web commonly.
- **Outfit** — Geometric, neutral, highly readable at small sizes. Feels modern without being generic.
- **JetBrains Mono** — The best programming font. Numbers are crystal clear. Perfect for Pomodoro timer digits, XP counts, stats.

## 3.2 Type Scale

```css
:root {
  /* Scale uses Major Third ratio (1.25) with custom overrides */

  /* === DISPLAY SIZES (Rajdhani) === */
  --text-display-2xl: 4.5rem;    /* 72px — Hero, life energy big number */
  --text-display-xl:  3.5rem;    /* 56px — Page heroes, RPG level huge */
  --text-display-lg:  2.75rem;   /* 44px — Dashboard welcome */
  --text-display-md:  2.25rem;   /* 36px — Section headers */
  --text-display-sm:  1.875rem;  /* 30px — Card headers, sub-sections */

  /* === BODY SIZES (Outfit) === */
  --text-xl:   1.25rem;    /* 20px — Large body, modal titles */
  --text-lg:   1.125rem;   /* 18px — Body large */
  --text-md:   1rem;       /* 16px — Body default */
  --text-sm:   0.875rem;   /* 14px — Small body, labels */
  --text-xs:   0.75rem;    /* 12px — Captions, badges */
  --text-2xs:  0.625rem;   /* 10px — Micro labels, timestamps */

  /* === MONO SIZES (JetBrains Mono) === */
  --text-mono-xl:  2rem;       /* 32px — Timer digits */
  --text-mono-lg:  1.5rem;     /* 24px — Stats numbers */
  --text-mono-md:  1rem;       /* 16px — Inline code, data */
  --text-mono-sm:  0.75rem;    /* 12px — Timestamps, metadata */

  /* === LINE HEIGHTS === */
  --leading-none:    1;
  --leading-tight:   1.15;
  --leading-snug:    1.3;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;
  --leading-loose:   2;

  /* === LETTER SPACING === */
  --tracking-tightest: -0.04em;
  --tracking-tight:    -0.02em;
  --tracking-normal:    0;
  --tracking-wide:      0.04em;
  --tracking-wider:     0.08em;
  --tracking-widest:    0.16em;  /* For ALL CAPS labels */
  --tracking-ultra:     0.25em;  /* For decorative ALL CAPS */

  /* === FONT WEIGHTS === */
  --weight-light:    300;
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-black:    900;
}
```

## 3.3 Typography Hierarchy — Usage Rules

```
LEVEL 1 — Page Identity (Rajdhani 700, display-lg, tracking-wide, primary color)
  Example: "MISSION CONTROL" — dashboard page title

LEVEL 2 — Section Headers (Rajdhani 600, display-sm, tracking-normal)
  Example: "Today's Objectives", "Active Quests"

LEVEL 3 — Card Titles (Outfit 600, text-lg, tracking-tight)
  Example: Task name, goal title

LEVEL 4 — Body (Outfit 400, text-md, leading-normal)
  Example: Descriptions, journal text, instructions

LEVEL 5 — Labels / Metadata (Outfit 500, text-xs, tracking-widest, uppercase, muted)
  Example: "PRIORITY · HIGH", "DUE DATE", "CATEGORY"

LEVEL 6 — Captions (Outfit 400, text-2xs, text-muted)
  Example: Timestamps, footnotes

STAT DISPLAY (JetBrains Mono 700, mono-xl, primary color, tabular-nums)
  Example: XP count "12,450", timer "24:59", streak "🔥 47"
```

## 3.4 Tailwind Typography Classes

```javascript
// tailwind.config.js — fontFamily extension
fontFamily: {
  display: ['Rajdhani', 'sans-serif'],
  body:    ['Outfit', 'sans-serif'],
  mono:    ['JetBrains Mono', 'monospace'],
}

// Usage in JSX:
// <h1 className="font-display text-4xl font-bold tracking-wide text-primary-400">
// <p className="font-body text-base text-text-primary leading-relaxed">
// <span className="font-mono text-2xl font-bold tabular-nums text-primary-400">
```

---

# PART 4: SPACING SYSTEM

## 4.1 Base Unit & Scale

```css
:root {
  --space-unit: 4px;   /* Base unit — everything is a multiple of 4 */

  --space-0:    0;
  --space-px:   1px;
  --space-0-5:  2px;
  --space-1:    4px;
  --space-1-5:  6px;
  --space-2:    8px;
  --space-2-5:  10px;
  --space-3:    12px;
  --space-4:    16px;
  --space-5:    20px;
  --space-6:    24px;
  --space-7:    28px;
  --space-8:    32px;
  --space-10:   40px;
  --space-12:   48px;
  --space-14:   56px;
  --space-16:   64px;
  --space-20:   80px;
  --space-24:   96px;
  --space-32:   128px;
  --space-40:   160px;
  --space-48:   192px;
}
```

## 4.2 Spacing Usage Rules

```
COMPONENT INTERNAL PADDING:
  Micro (badge, tag):          px-2 py-0.5   (8px / 2px)
  Small (button-sm, chip):     px-3 py-1.5   (12px / 6px)
  Default (button, input):     px-4 py-2.5   (16px / 10px)
  Large (button-lg):           px-6 py-3     (24px / 12px)
  Card body:                   p-5 or p-6    (20-24px)
  Modal body:                  p-6 or p-8    (24-32px)
  Page sections:               py-10 px-6    (40px / 24px)

LAYOUT GAPS:
  Between inline items:        gap-2 (8px)
  Between related items:       gap-3 (12px)
  Between components:          gap-4 or gap-5 (16-20px)
  Between sections:            gap-8 or gap-10 (32-40px)
  Between page sections:       gap-16 (64px)

SIDEBAR:
  Width collapsed:             64px
  Width expanded:              240px
  Item padding:                px-4 py-3

LAYOUT STRUCTURE:
  Sidebar:      240px fixed left
  Header:       64px fixed top
  Content:      calc(100vw - 240px), calc(100vh - 64px)
  Max content:  1280px centered
  Content padding: 32px
```

---

# PART 5: BORDER & RADIUS SYSTEM

## 5.1 Border Radius

```css
:root {
  --radius-none:  0;
  --radius-sm:    4px;    /* Tags, chips, small badges */
  --radius-md:    8px;    /* Buttons, inputs, small cards */
  --radius-lg:    12px;   /* Cards, panels */
  --radius-xl:    16px;   /* Large cards, modals */
  --radius-2xl:   20px;   /* Feature cards */
  --radius-3xl:   24px;   /* Hero cards */
  --radius-full:  9999px; /* Pills, avatars, circular elements */
}
```

```javascript
// tailwind.config.js
borderRadius: {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  '2xl':'20px',
  '3xl':'24px',
}
```

## 5.2 Border Styles

```css
/* Standard card border */
.card-border {
  border: 1px solid var(--border-default);
}

/* Glowing border (active states, selected) */
.border-glow-primary {
  border: 1px solid var(--border-primary);
  box-shadow: 0 0 0 1px var(--primary-glow), inset 0 0 20px var(--primary-glow);
}

/* Gradient border trick */
.border-gradient {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid transparent;
  background-clip: padding-box;
}
.border-gradient::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,173,0,0.3), rgba(0,200,224,0.1));
  z-index: -1;
}
```

---

# PART 6: SHADOW & DEPTH SYSTEM

## 6.1 Shadow Scale

```css
:root {
  /* Standard shadows */
  --shadow-sm:    0 1px 3px rgba(0,0,0,0.4);
  --shadow-md:    0 4px 12px rgba(0,0,0,0.5);
  --shadow-lg:    0 8px 24px rgba(0,0,0,0.6);
  --shadow-xl:    0 16px 48px rgba(0,0,0,0.7);
  --shadow-2xl:   0 24px 64px rgba(0,0,0,0.8);

  /* Colored glow shadows */
  --shadow-primary:   0 0 20px rgba(255,173,0,0.25),   0 4px 12px rgba(0,0,0,0.4);
  --shadow-secondary: 0 0 20px rgba(0,200,224,0.20),   0 4px 12px rgba(0,0,0,0.4);
  --shadow-accent:    0 0 20px rgba(168,85,247,0.22),  0 4px 12px rgba(0,0,0,0.4);
  --shadow-success:   0 0 16px rgba(34,197,94,0.22),   0 4px 8px rgba(0,0,0,0.3);
  --shadow-danger:    0 0 16px rgba(239,68,68,0.25),   0 4px 8px rgba(0,0,0,0.3);

  /* Inner glow */
  --inset-primary:   inset 0 0 30px rgba(255,173,0,0.08);
  --inset-secondary: inset 0 0 30px rgba(0,200,224,0.06);
}
```

## 6.2 Tailwind Shadow Extension

```javascript
boxShadow: {
  'primary':   '0 0 20px rgba(255,173,0,0.25), 0 4px 12px rgba(0,0,0,0.4)',
  'secondary': '0 0 20px rgba(0,200,224,0.20), 0 4px 12px rgba(0,0,0,0.4)',
  'accent':    '0 0 20px rgba(168,85,247,0.22), 0 4px 12px rgba(0,0,0,0.4)',
  'glow-sm':   '0 0 10px rgba(255,173,0,0.30)',
  'glow-md':   '0 0 20px rgba(255,173,0,0.30)',
  'glow-lg':   '0 0 40px rgba(255,173,0,0.25)',
  'inner-glow':'inset 0 0 30px rgba(255,173,0,0.08)',
  'card':      '0 4px 16px rgba(0,0,0,0.5)',
  'modal':     '0 24px 64px rgba(0,0,0,0.8)',
}
```

---

# PART 7: COMPONENT LIBRARY

## 7.1 Buttons

```jsx
// === BUTTON VARIANTS ===

// Primary — Amber gradient, strong glow on hover
const ButtonPrimary = ({ children, ...props }) => (
  <button
    className="
      relative inline-flex items-center gap-2
      px-5 py-2.5 rounded-lg
      font-body font-semibold text-sm text-black
      bg-gradient-to-r from-primary-400 to-amber-500
      shadow-[0_0_0_0_rgba(255,173,0,0)]
      hover:shadow-[0_0_20px_rgba(255,173,0,0.40)]
      hover:scale-[1.02]
      active:scale-[0.98]
      transition-all duration-200 ease-out
      overflow-hidden
      before:absolute before:inset-0
      before:bg-white/0 hover:before:bg-white/10
      before:transition-colors before:duration-200
    "
    {...props}
  >
    {children}
  </button>
);

// Secondary — Ghost with border glow
const ButtonSecondary = ({ children, ...props }) => (
  <button
    className="
      inline-flex items-center gap-2
      px-5 py-2.5 rounded-lg
      font-body font-medium text-sm text-primary-400
      bg-transparent
      border border-primary-400/30
      hover:border-primary-400/70
      hover:bg-primary-400/8
      hover:shadow-[0_0_12px_rgba(255,173,0,0.20)]
      active:scale-[0.98]
      transition-all duration-200
    "
    {...props}
  >
    {children}
  </button>
);

// Ghost — Minimal, for less important actions
const ButtonGhost = ({ children, ...props }) => (
  <button
    className="
      inline-flex items-center gap-2
      px-4 py-2 rounded-lg
      font-body font-medium text-sm text-neutral-300
      hover:text-neutral-100 hover:bg-white/5
      active:scale-[0.98]
      transition-all duration-150
    "
    {...props}
  >
    {children}
  </button>
);

// Danger — Red for destructive actions
const ButtonDanger = ({ children, ...props }) => (
  <button
    className="
      inline-flex items-center gap-2
      px-5 py-2.5 rounded-lg
      font-body font-semibold text-sm text-white
      bg-gradient-to-r from-red-500 to-red-700
      hover:shadow-[0_0_16px_rgba(239,68,68,0.35)]
      hover:scale-[1.02] active:scale-[0.98]
      transition-all duration-200
    "
    {...props}
  >
    {children}
  </button>
);

// Icon Button — Square, for toolbar actions
const ButtonIcon = ({ icon: Icon, size = 18, ...props }) => (
  <button
    className="
      flex items-center justify-center
      w-9 h-9 rounded-lg
      text-neutral-400 hover:text-neutral-100
      hover:bg-white/8
      active:scale-[0.92]
      transition-all duration-150
    "
    {...props}
  >
    <Icon size={size} />
  </button>
);
```

## 7.2 Input Fields

```jsx
const Input = ({ label, hint, error, icon: Icon, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="font-body font-medium text-xs text-neutral-400 tracking-widest uppercase">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
          <Icon size={16} />
        </div>
      )}
      <input
        className={`
          w-full px-4 py-2.5 ${Icon ? 'pl-10' : ''}
          font-body text-sm text-neutral-100
          bg-bg-elevated
          border rounded-lg
          outline-none
          placeholder:text-neutral-600
          transition-all duration-200
          ${error
            ? 'border-red-500/50 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
            : 'border-white/8 focus:border-primary-400/50 focus:shadow-[0_0_0_3px_rgba(255,173,0,0.12)]'
          }
        `}
        {...props}
      />
    </div>
    {hint && !error && (
      <p className="font-body text-xs text-neutral-500">{hint}</p>
    )}
    {error && (
      <p className="font-body text-xs text-red-400">{error}</p>
    )}
  </div>
);
```

## 7.3 Cards

```jsx
// Standard Card
const Card = ({ children, glow, className }) => (
  <div className={`
    relative rounded-xl p-5
    bg-surface
    border border-white/8
    ${glow === 'primary' ? 'shadow-[0_0_20px_rgba(255,173,0,0.12)] border-primary-400/20' : ''}
    ${glow === 'secondary' ? 'shadow-[0_0_20px_rgba(0,200,224,0.10)] border-plasma-400/20' : ''}
    transition-all duration-300
    ${className}
  `}>
    {/* Subtle top highlight */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-xl" />
    {children}
  </div>
);

// Stat Card — for XP, streak, tasks completed
const StatCard = ({ label, value, unit, icon: Icon, color = 'primary', trend }) => (
  <Card className="group hover:border-white/14 hover:-translate-y-0.5 transition-all duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className={`
        p-2.5 rounded-lg
        ${color === 'primary' ? 'bg-primary-400/12 text-primary-400' : ''}
        ${color === 'plasma' ? 'bg-plasma-400/12 text-plasma-400' : ''}
        ${color === 'success' ? 'bg-green-400/12 text-green-400' : ''}
        ${color === 'accent' ? 'bg-void_purple-400/12 text-void_purple-400' : ''}
      `}>
        <Icon size={18} />
      </div>
      {trend && (
        <span className={`text-xs font-mono font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="font-mono text-3xl font-bold text-neutral-50 tabular-nums mb-1">
      {value}<span className="text-lg text-neutral-500 ml-1">{unit}</span>
    </div>
    <div className="font-body text-xs text-neutral-500 tracking-wider uppercase">{label}</div>
  </Card>
);

// Glass Card — for overlays, modals, special sections
const GlassCard = ({ children, className }) => (
  <div className={`
    relative rounded-2xl p-6
    bg-white/[0.04]
    backdrop-blur-xl
    border border-white/10
    shadow-[0_8px_32px_rgba(0,0,0,0.5)]
    ${className}
  `}>
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl" />
    {children}
  </div>
);
```

## 7.4 Badge / Tag Components

```jsx
const Badge = ({ label, color = 'default', size = 'md' }) => {
  const colors = {
    default:  'bg-white/8 text-neutral-300 border-white/10',
    primary:  'bg-primary-400/15 text-primary-400 border-primary-400/30',
    plasma:   'bg-plasma-400/12 text-plasma-300 border-plasma-400/25',
    success:  'bg-green-400/12 text-green-400 border-green-400/25',
    danger:   'bg-red-400/12 text-red-400 border-red-400/25',
    warning:  'bg-amber-400/12 text-amber-400 border-amber-400/25',
    accent:   'bg-void_purple-400/12 text-void_purple-300 border-void_purple-400/25',
  };
  const sizes = {
    sm: 'px-1.5 py-0.5 text-2xs rounded',
    md: 'px-2.5 py-1 text-xs rounded-md',
    lg: 'px-3 py-1.5 text-sm rounded-lg',
  };
  return (
    <span className={`
      inline-flex items-center gap-1
      font-body font-medium tracking-wide
      border
      ${colors[color]} ${sizes[size]}
    `}>
      {label}
    </span>
  );
};

// Priority Badge
const PriorityBadge = ({ priority }) => {
  const map = {
    critical: { label: 'CRITICAL', color: 'danger', dot: '●' },
    high:     { label: 'HIGH',     color: 'warning', dot: '●' },
    medium:   { label: 'MEDIUM',   color: 'primary', dot: '●' },
    low:      { label: 'LOW',      color: 'default',  dot: '○' },
  };
  const { label, color, dot } = map[priority];
  return <Badge label={`${dot} ${label}`} color={color} size="sm" />;
};
```

## 7.5 Progress Bars

```jsx
// XP Progress Bar — with animated shine
const XPBar = ({ current, max, level }) => {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-xs text-primary-400 font-medium">LVL {level}</span>
        <span className="font-mono text-xs text-neutral-500">{current.toLocaleString()} / {max.toLocaleString()} XP</span>
      </div>
      <div className="h-2 bg-white/6 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #CC8800, #FFAD00, #FFD97A)',
            transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Animated shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

// Boss HP Bar — dramatic red bar
const BossHPBar = ({ current, max, bossName }) => {
  const pct = (current / max) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5">
        <span className="font-display text-sm font-semibold text-red-400 tracking-wide">{bossName}</span>
        <span className="font-mono text-xs text-red-400/70">{current}/{max} HP</span>
      </div>
      <div className="h-3 bg-red-900/30 rounded-sm overflow-hidden border border-red-500/20">
        <div
          className="h-full relative overflow-hidden"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #7F1D1D, #EF4444)',
            transition: 'width 1s ease-out',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/20 to-transparent animate-[shine_3s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

// Stat Bar (for RPG character stats)
const StatBar = ({ stat, value, max = 100, color }) => (
  <div className="flex items-center gap-3">
    <span className="font-body text-xs text-neutral-500 w-20 tracking-wider uppercase">{stat}</span>
    <div className="flex-1 h-1.5 bg-white/6 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${(value/max)*100}%`,
          background: color,
          transition: 'width 1s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: `0 0 6px ${color}`,
        }}
      />
    </div>
    <span className="font-mono text-xs text-neutral-400 w-8 text-right tabular-nums">{value}</span>
  </div>
);
```

## 7.6 Task Card

```jsx
const TaskCard = ({ task, onComplete, onFail }) => (
  <div className={`
    group relative rounded-xl px-4 py-3.5
    bg-surface border
    ${task.priority === 'critical' ? 'border-red-500/25 hover:border-red-500/40' :
      task.priority === 'high' ? 'border-amber-400/20 hover:border-amber-400/35' :
      'border-white/8 hover:border-white/14'}
    hover:-translate-y-0.5
    transition-all duration-200
    cursor-pointer
    ${task.status === 'completed' ? 'opacity-50' : ''}
  `}>
    {/* Priority accent bar — left edge */}
    <div className={`
      absolute left-0 top-3 bottom-3 w-0.5 rounded-full
      ${task.priority === 'critical' ? 'bg-red-500' :
        task.priority === 'high' ? 'bg-amber-400' :
        task.priority === 'medium' ? 'bg-primary-400/70' :
        'bg-neutral-600'}
    `} />

    <div className="pl-3 flex items-start gap-3">
      {/* Checkbox */}
      <button
        onClick={() => onComplete(task._id)}
        className={`
          mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2
          flex items-center justify-center
          transition-all duration-200
          ${task.status === 'completed'
            ? 'bg-green-500 border-green-500'
            : 'border-neutral-600 hover:border-primary-400 hover:bg-primary-400/10'}
        `}
      >
        {task.status === 'completed' && <Check size={12} className="text-black" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`
          font-body text-sm font-medium leading-snug
          ${task.status === 'completed' ? 'line-through text-neutral-500' : 'text-neutral-100'}
        `}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <CategoryChip category={task.category} />
          <PriorityBadge priority={task.priority} />
          {task.deadline && (
            <span className={`font-mono text-2xs ${isOverdue(task.deadline) ? 'text-red-400' : 'text-neutral-500'}`}>
              <Clock size={10} className="inline mr-0.5" />
              {formatDeadline(task.deadline)}
            </span>
          )}
          {task.estimatedDuration && (
            <span className="font-mono text-2xs text-neutral-600">
              ~{task.estimatedDuration}m
            </span>
          )}
        </div>
      </div>

      {/* Quick actions — reveal on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        <ButtonIcon icon={Edit2} size={14} />
        <ButtonIcon icon={X} size={14} className="hover:text-red-400" onClick={() => onFail(task._id)} />
      </div>
    </div>
  </div>
);
```

## 7.7 Pomodoro Timer Component

```jsx
const PomodoroTimer = ({ seconds, total, isRunning, mode }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / total);
  const dashOffset = circumference * (1 - progress);

  const modeColors = {
    work:  { stroke: '#FFAD00', glow: 'rgba(255,173,0,0.3)', text: 'FOCUS' },
    break: { stroke: '#22C55E', glow: 'rgba(34,197,94,0.3)', text: 'BREAK' },
    long:  { stroke: '#00C8E0', glow: 'rgba(0,200,224,0.3)', text: 'REST'  },
  };
  const { stroke, glow, text } = modeColors[mode];

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 210, height: 210,
          boxShadow: `0 0 60px ${glow}, 0 0 120px ${glow}40`,
        }}
      />
      {/* SVG Ring */}
      <svg width="200" height="200" className="-rotate-90">
        {/* Track */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        {/* Progress */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: 'stroke-dashoffset 1s linear',
            filter: `drop-shadow(0 0 8px ${stroke})`,
          }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute flex flex-col items-center">
        <span className="font-body text-xs text-neutral-500 tracking-widest uppercase mb-1">{text}</span>
        <span className="font-mono text-4xl font-bold text-neutral-50 tabular-nums leading-none">
          {formatTime(seconds)}
        </span>
        <span className="font-body text-xs text-neutral-600 mt-1 tracking-wider">
          {isRunning ? 'IN PROGRESS' : 'PAUSED'}
        </span>
      </div>
    </div>
  );
};
```

---

# PART 8: ANIMATION & MOTION SYSTEM

## 8.1 Animation Principles

```
DURATION SCALE:
  Instant:     0ms     — State changes (active, checked)
  Micro:       100ms   — Hover color changes
  Fast:        150ms   — Hover transforms, small transitions
  Default:     200ms   — Most UI transitions (buttons, inputs)
  Medium:      300ms   — Page elements, cards entering
  Slow:        500ms   — Modals, overlays appearing
  Deliberate:  700ms   — XP bars filling, level up
  Dramatic:    1000ms  — Achievement reveals, boss defeat
  Epic:        1500ms+ — Celebration sequences

EASING FUNCTIONS:
  ease-standard:  cubic-bezier(0.4, 0, 0.2, 1)   /* Material's standard */
  ease-enter:     cubic-bezier(0, 0, 0.2, 1)      /* Elements entering */
  ease-exit:      cubic-bezier(0.4, 0, 1, 1)      /* Elements leaving */
  ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1) /* Bouncy/elastic */
  ease-decelerate:cubic-bezier(0, 0, 0.2, 1)      /* Heavy things stopping */

MOTION RULES:
  1. Hierarchy: Important elements animate more dramatically
  2. Direction: Enter from direction of origin, exit to destination
  3. Choreography: Stagger related elements (50ms between each)
  4. Physics: Heavy elements = slower + elastic. Light = fast + sharp
  5. Never: Bounce things that carry meaning (errors should not bounce)
```

## 8.2 Framer Motion Variants Library

```jsx
// === CORE VARIANTS ===

// Page entry
export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// Staggered children (use on container)
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

// Child of stagger container
export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
};

// Card hover
export const cardHover = {
  whileHover: { y: -2, transition: { duration: 0.15 } },
  whileTap:   { scale: 0.98, transition: { duration: 0.1 } },
};

// Modal
export const modalVariants = {
  initial: { opacity: 0, scale: 0.95, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18 } },
};

// Overlay backdrop
export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};

// XP Gain floating number
export const xpGainVariants = {
  initial: { opacity: 0, y: 0, scale: 0.8 },
  animate: { opacity: 1, y: -30, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -60, transition: { duration: 0.5, ease: 'easeIn' } },
};

// Level up — full screen
export const levelUpVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
  exit:    { opacity: 0, scale: 1.1, transition: { duration: 0.4 } },
};

// Achievement unlock — slide from top
export const achievementVariants = {
  initial: { opacity: 0, y: -80, x: '-50%' },
  animate: { opacity: 1, y: 20, x: '-50%', transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
  exit:    { opacity: 0, y: -60, x: '-50%', transition: { duration: 0.35, ease: 'easeIn' } },
};

// Sidebar collapse
export const sidebarVariants = {
  expanded:  { width: 240, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  collapsed: { width: 64,  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
};

// Roast modal — dramatic entrance
export const roastVariants = {
  initial: { opacity: 0, scale: 1.2, rotate: -3 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
  exit:    { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

// Notification bell shake
export const bellShake = {
  animate: {
    rotate: [0, -15, 15, -10, 10, -5, 5, 0],
    transition: { duration: 0.6, ease: 'easeInOut' }
  }
};

// Checkbox check animation
export const checkVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
};

// Streak fire pulse
export const firePulse = {
  animate: {
    scale: [1, 1.1, 1],
    filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  }
};
```

## 8.3 GSAP Animations (for complex sequences)

```javascript
// === GSAP ANIMATION SEQUENCES ===

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Level Up Sequence
export function playLevelUpSequence(containerRef, level) {
  const tl = gsap.timeline();
  tl
    .from('.levelup-overlay', { opacity: 0, duration: 0.3 })
    .from('.levelup-number', { scale: 0, rotation: -180, duration: 0.6, ease: 'back.out(2)' })
    .from('.levelup-rays', { opacity: 0, scale: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, '-=0.3')
    .from('.levelup-text', { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.levelup-number', { textContent: `LEVEL ${level}`, duration: 0, snap: { textContent: 1 } })
    .to('.levelup-overlay', { opacity: 0, duration: 0.5, delay: 2 });
  return tl;
}

// Achievement unlock sequence
export function playAchievementSequence(ref) {
  gsap.fromTo(ref.current,
    { y: -100, opacity: 0, scale: 0.8 },
    { y: 20, opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1.2, 0.5)',
      onComplete: () => {
        gsap.to(ref.current, { y: -100, opacity: 0, delay: 3, duration: 0.4 });
      }
    }
  );
}

// XP bar fill animation
export function animateXPBar(barRef, from, to) {
  gsap.fromTo(barRef.current,
    { width: `${from}%` },
    { width: `${to}%`, duration: 1.2, ease: 'power2.out' }
  );
}

// Scroll reveal for analytics
export function initScrollReveal() {
  gsap.utils.toArray('.reveal-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      opacity: 0, y: 30, duration: 0.5,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });
}

// Boss HP damage flash
export function playDamageFlash(bossRef, amount) {
  gsap.timeline()
    .to(bossRef.current, { filter: 'brightness(2) saturate(0)', duration: 0.08 })
    .to(bossRef.current, { filter: 'brightness(1) saturate(1)', duration: 0.3 })
    .from('.damage-number', { opacity: 0, y: 0, scale: 2, color: '#EF4444', duration: 0.6, ease: 'power2.out' });
}

// Rage mode entrance — screen shake
export function playRageShake() {
  gsap.timeline()
    .to('body', { x: -8, duration: 0.05, ease: 'none' })
    .to('body', { x: 8, duration: 0.05, ease: 'none' })
    .to('body', { x: -6, duration: 0.05, ease: 'none' })
    .to('body', { x: 6, duration: 0.05, ease: 'none' })
    .to('body', { x: 0, duration: 0.05, ease: 'none' });
}
```

## 8.4 Tailwind Animation Keyframes

```javascript
// tailwind.config.js — keyframes + animation
keyframes: {
  shine: {
    '0%':   { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(200%)' },
  },
  pulse_glow: {
    '0%, 100%': { opacity: 1, boxShadow: '0 0 10px rgba(255,173,0,0.3)' },
    '50%':      { opacity: 0.8, boxShadow: '0 0 25px rgba(255,173,0,0.6)' },
  },
  scan_line: {
    '0%':   { top: '-2px' },
    '100%': { top: '100%' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%':      { transform: 'translateY(-6px)' },
  },
  text_flicker: {
    '0%, 95%, 100%': { opacity: 1 },
    '96%':           { opacity: 0.6 },
    '97%':           { opacity: 1 },
    '98%':           { opacity: 0.4 },
  },
  counter_up: {
    from: { opacity: 0, transform: 'translateY(8px)' },
    to:   { opacity: 1, transform: 'translateY(0)' },
  },
},
animation: {
  'shine':         'shine 2.5s ease-in-out infinite',
  'pulse-glow':    'pulse_glow 2s ease-in-out infinite',
  'scan-line':     'scan_line 4s linear infinite',
  'float':         'float 4s ease-in-out infinite',
  'text-flicker':  'text_flicker 8s linear infinite',
  'counter-up':    'counter_up 0.3s ease-out',
},
```

---

# PART 9: 3D & VISUAL EFFECTS (Three.js)

## 9.1 Background Particle System

```jsx
// components/effects/ParticleBackground.jsx
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 5;

    // Particle geometry
    const count = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const primaryColor   = new THREE.Color('#FFAD00');
    const secondaryColor = new THREE.Color('#00C8E0');
    const accentColor    = new THREE.Color('#A855F7');
    const palette = [primaryColor, secondaryColor, accentColor];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animate
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
};
```

## 9.2 RPG Character 3D Visualization

```jsx
// components/rpg/Character3D.jsx
// Rotating 3D character orb/sphere with stat-based color
export const CharacterOrb = ({ characterClass, level, hp }) => {
  const mountRef = useRef(null);

  const classColors = {
    warrior: { main: 0xFFAD00, emissive: 0xCC6600 },
    mage:    { main: 0x00C8E0, emissive: 0x0088A0 },
    rogue:   { main: 0xA855F7, emissive: 0x7C3AED },
    paladin: { main: 0xF8FAFC, emissive: 0xCBD5E1 },
  };

  useEffect(() => {
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 3;

    const colors = classColors[characterClass] || classColors.warrior;

    // Inner sphere — the core
    const coreGeo = new THREE.SphereGeometry(0.7, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: colors.main,
      emissive: colors.emissive,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Outer wireframe ring
    const ringGeo = new THREE.TorusGeometry(1.1, 0.02, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: colors.main, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 2;
    scene.add(ring1, ring2);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    const point   = new THREE.PointLight(colors.main, 3, 10);
    point.position.set(2, 2, 2);
    scene.add(ambient, point);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      core.rotation.y += 0.008;
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [characterClass]);

  return <div ref={mountRef} className="rounded-full overflow-hidden" style={{ width: 200, height: 200 }} />;
};
```

---

# PART 10: SOUND EFFECTS (SFX) SYSTEM

## 10.1 Sound Design Philosophy

All sounds are **short, precise, non-intrusive**. They confirm actions, celebrate wins, and warn of problems. User can mute all sounds globally.

## 10.2 SFX Library

```javascript
// utils/sfx.js
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('sfx_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('sfx_volume') || '0.4');
  }

  init() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  play(type) {
    if (this.muted || !this.ctx) return;
    const sounds = {
      task_complete:  () => this._chime([523.25, 659.25, 783.99], [0, 0.08, 0.16], 0.3),
      task_fail:      () => this._chime([220, 196, 174.61], [0, 0.1, 0.2], 0.25, 'sawtooth'),
      xp_gain:        () => this._chime([783.99, 987.77], [0, 0.06], 0.2),
      level_up:       () => this._chord([523, 659, 784, 1047], 0.8),
      streak_inc:     () => this._chime([659.25, 783.99], [0, 0.07], 0.15),
      achievement:    () => this._fanfare(),
      pomodoro_end:   () => this._bell(440, 0.6),
      break_end:      () => this._bell(523, 0.4),
      notification:   () => this._chime([783.99, 1046.50], [0, 0.05], 0.15),
      error:          () => this._chime([220, 207], [0, 0.1], 0.2, 'square'),
      boss_damage:    () => this._impact(),
      boss_defeat:    () => this._epic(),
      rage_activate:  () => this._distort(),
    };
    sounds[type]?.();
  }

  _chime(freqs, times, vol = 0.3, wave = 'sine') {
    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = wave;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, this.ctx.currentTime + times[i]);
      gain.gain.linearRampToValueAtTime(vol * this.volume, this.ctx.currentTime + times[i] + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + times[i] + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + times[i]);
      osc.stop(this.ctx.currentTime + times[i] + 0.35);
    });
  }

  _bell(freq, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.4 * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  _chord(freqs, duration) {
    freqs.forEach(freq => {
      setTimeout(() => this._bell(freq, duration), 0);
    });
  }

  _fanfare() {
    // Ascending triumphant sound for achievements
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((f, i) => {
      setTimeout(() => this._bell(f, 0.4), i * 80);
    });
  }

  _impact() {
    // Low boom for boss damage
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.5 * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  toggle() { this.muted = !this.muted; localStorage.setItem('sfx_muted', this.muted); }
  setVolume(v) { this.volume = v; localStorage.setItem('sfx_volume', v); }
}

export const sfx = new SoundManager();
```

---

# PART 11: LAYOUT SYSTEM

## 11.1 App Shell Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (h-16, fixed top, blur backdrop)                        │
│  Logo | Breadcrumb | Search | Notifications | Timer | Avatar    │
├────────────────┬────────────────────────────────────────────────┤
│                │                                                 │
│  SIDEBAR       │  MAIN CONTENT AREA                             │
│  (w-60)        │  (flex-1, overflow-y-auto)                     │
│                │                                                 │
│  Nav items     │  ┌─────────────────────────────────────────┐   │
│  with icons    │  │  PAGE CONTENT                           │   │
│                │  │  max-w-screen-xl mx-auto p-8            │   │
│  Streak        │  │                                         │   │
│  XP bar        │  │  Content here                           │   │
│                │  └─────────────────────────────────────────┘   │
│  Settings      │                                                 │
│  Profile       │                                                 │
└────────────────┴────────────────────────────────────────────────┘
```

## 11.2 Grid System

```jsx
// Dashboard grid — responsive
// Desktop: 4 columns | Tablet: 2 columns | Mobile: 1 column

// Stat cards row
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Main content: sidebar + main
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">  {/* Tasks */}
  <div className="lg:col-span-1">  {/* Goals / AI chat */}

// Analytics — 2 wide + 1 narrow
<div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
  <div className="lg:col-span-3">  {/* Main chart */}
  <div className="lg:col-span-2">  {/* Side stats */}
```

---

# PART 12: SHADCN/UI INTEGRATION

## 12.1 Setup & Theme Override

```javascript
// components.json (shadcn config)
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

```css
/* Override shadcn default variables with our design system */
:root {
  --background:    0 0% 3.5%;         /* --bg-base equivalent */
  --foreground:    240 15% 94%;       /* --text-primary */
  --card:          240 10% 7.5%;      /* --bg-surface */
  --card-foreground: 240 15% 94%;
  --popover:       240 10% 10%;       /* --bg-elevated */
  --popover-foreground: 240 15% 94%;
  --primary:       38 100% 50%;       /* --primary-400 amber */
  --primary-foreground: 0 0% 5%;
  --secondary:     187 100% 44%;      /* --plasma-400 cyan */
  --secondary-foreground: 0 0% 5%;
  --muted:         240 8% 16%;
  --muted-foreground: 240 10% 55%;
  --accent:        271 91% 65%;       /* --void_purple-400 */
  --accent-foreground: 240 15% 94%;
  --destructive:   0 84% 60%;
  --border:        240 10% 12%;
  --input:         240 10% 12%;
  --ring:          38 100% 50%;
  --radius: 0.5rem;
}
```

## 12.2 shadcn Components Used

```
Dialog      → Task create/edit modal, AI quiz modal
Sheet       → Mobile sidebar, quick-add panel
Tooltip     → Icon tooltips, stat explanations
Popover     → Date picker, color picker
Select      → Category, priority dropdowns
Calendar    → Date selection in task modal
Progress    → Lightweight progress bars
Switch      → Settings toggles
Slider      → Volume control, timer duration
Tabs        → Tasks (All/Today/Overdue/Completed)
Toast       → Notifications (via react-hot-toast override)
Avatar      → User profile, character display
Skeleton    → Loading states for all data
DropdownMenu → Task context menu, options menu
Accordion   → Goal milestones list, FAQ
Badge       → shadcn badge base (we extend heavily)
```

---

# PART 13: ICON SYSTEM (Lucide)

## 13.1 Icon Usage Rules

```
Size scale:
  Micro    : 12px — inline text icons, timestamps
  Small    : 14px — badges, tags, compact buttons
  Default  : 16px — nav items, form labels, list icons
  Medium   : 18px — card action buttons
  Large    : 20px — section headers
  XL       : 24px — stat cards, feature icons
  Hero     : 32-48px — empty states, onboarding

Stroke width:
  Default: 1.5 (Lucide default — looks best at all sizes)
  Bold:    2    (for emphasis, important actions)
  Light:   1    (for decorative, background icons)

Color:
  Interactive icons: text-neutral-400, hover:text-neutral-100
  Active icons:      colored (text-primary-400, etc.)
  Danger icons:      text-red-400
  Disabled icons:    text-neutral-700
```

## 13.2 Icon Map — Feature to Icon

```javascript
import {
  // Navigation
  LayoutDashboard, Target, Dumbbell, BookOpen, BarChart3,
  Timer, User, Settings, Trophy,
  // Tasks
  CheckCircle2, Circle, X, Plus, Edit2, Trash2, Flag,
  Calendar, Clock, Tag, Repeat, ChevronDown, GripVertical,
  // Goals
  Crosshair, Milestone, TrendingUp, Award,
  // RPG
  Sword, Shield, Zap, Star, Flame, Heart, Crown, Skull,
  // AI
  Brain, Sparkles, MessageSquare, Cpu, Eye,
  // Timer
  Play, Pause, RotateCcw, SkipForward, Bell,
  // Gym
  Activity, Weight, LineChart,
  // Journal
  PenLine, Image, Smile, Meh, Frown, ThumbsUp, ThumbsDown,
  // Analytics
  PieChart, AreaChart, Gauge, Radar,
  // Life Energy
  Hourglass, Globe, AlertCircle,
  // Music
  Music2, Volume2, VolumeX, SkipForward as Next, Shuffle,
  // System
  Moon, Sun, ChevronLeft, ChevronRight, Search, SlidersHorizontal,
  Download, Upload, Copy, Check, AlertTriangle, Info,
  Lock, Unlock, ExternalLink, Github, Mail, Loader2,
} from 'lucide-react';

// Semantic icon mapping
export const ICONS = {
  // Features
  tasks:     LayoutDashboard,
  goals:     Target,
  gym:       Dumbbell,
  journal:   BookOpen,
  analytics: BarChart3,
  timer:     Timer,
  rpg:       Sword,
  ai:        Brain,
  music:     Music2,
  life:      Hourglass,
  // Task categories
  work:      Crosshair,
  study:     BookOpen,
  personal:  Heart,
  creative:  Sparkles,
  finance:   TrendingUp,
  health:    Activity,
  // RPG stats
  strength:  Sword,
  intel:     Brain,
  discipline:Shield,
  creativity:Sparkles,
  wealth:    TrendingUp,
};
```

---

# PART 14: REMOTION ANIMATIONS

## 14.1 Year-End Review Video

```jsx
// remotion/YearEndReview.jsx
import { Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const YearEndReview = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);
  const titleY = interpolate(frame, [0, 20], [30, 0]);

  return (
    <div className="w-full h-full bg-[#0D0D12] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background mesh gradient */}
      <div style={{ background: 'radial-gradient(at 30% 40%, rgba(255,173,0,0.12) 0%, transparent 50%), radial-gradient(at 70% 60%, rgba(0,200,224,0.08) 0%, transparent 50%)',
        position: 'absolute', inset: 0 }} />

      {/* Sequence 1: Year title */}
      <Sequence from={0} durationInFrames={90}>
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          <h1 style={{ fontFamily: 'Rajdhani', fontSize: 80, fontWeight: 700, color: '#FFAD00', letterSpacing: 8 }}>
            2025 RECAP
          </h1>
        </div>
      </Sequence>

      {/* Sequence 2: Tasks completed */}
      <Sequence from={90} durationInFrames={90}>
        <CountUp target={data.tasksCompleted} label="TASKS COMPLETED" />
      </Sequence>

      {/* Sequence 3: XP earned */}
      <Sequence from={180} durationInFrames={90}>
        <CountUp target={data.xpEarned} label="XP EARNED" color="#00C8E0" />
      </Sequence>

      {/* Continue with streak, gym sessions, journal entries... */}
    </div>
  );
};

const CountUp = ({ target, label, color = '#FFAD00' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const value = Math.floor(interpolate(progress, [0, 1], [0, target]));
  return (
    <div className="text-center">
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 96, fontWeight: 700, color, lineHeight: 1 }}>
        {value.toLocaleString()}
      </div>
      <div style={{ fontFamily: 'Outfit', fontSize: 18, color: '#7878A0', letterSpacing: 4, marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
};
```

---

# PART 15: UX PATTERNS & INTERACTION DESIGN

## 15.1 Empty States

```jsx
// Every page has a beautiful, motivating empty state
const EmptyTasks = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-full bg-primary-400/10 flex items-center justify-center">
        <CheckCircle2 size={36} className="text-primary-400/60" />
      </div>
      <div className="absolute inset-0 rounded-full animate-[pulse_glow_3s_ease-in-out_infinite]" />
    </div>
    <h3 className="font-display text-2xl font-semibold text-neutral-300 mb-2">No missions today</h3>
    <p className="font-body text-sm text-neutral-600 max-w-xs mb-6">
      Every legend starts somewhere. Add your first task and begin your journey.
    </p>
    <ButtonPrimary onClick={openAddTask}>
      <Plus size={16} /> Add First Task
    </ButtonPrimary>
  </div>
);
```

## 15.2 Loading States

```jsx
// Skeleton for cards
const TaskCardSkeleton = () => (
  <div className="rounded-xl px-4 py-3.5 bg-surface border border-white/6 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-md bg-neutral-800 mt-0.5 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-neutral-800 rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-3 bg-neutral-800 rounded w-16" />
          <div className="h-3 bg-neutral-800 rounded w-12" />
        </div>
      </div>
    </div>
  </div>
);
```

## 15.3 Error States

```jsx
// Error boundary UI
const ErrorState = ({ message, retry }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 rounded-full bg-red-400/10 flex items-center justify-center mb-4">
      <AlertCircle size={28} className="text-red-400" />
    </div>
    <h3 className="font-display text-xl font-semibold text-neutral-300 mb-1">Something broke</h3>
    <p className="font-body text-sm text-neutral-600 mb-5">{message}</p>
    <ButtonSecondary onClick={retry}><RotateCcw size={14} /> Try Again</ButtonSecondary>
  </div>
);
```

## 15.4 Notification System

```jsx
// Notification types with distinct visual language
const NOTIFICATION_STYLES = {
  success: {
    icon: Check,
    className: 'border-green-400/30 bg-green-400/8',
    iconClass: 'text-green-400',
    titleClass: 'text-green-300',
  },
  error: {
    icon: X,
    className: 'border-red-400/30 bg-red-400/8',
    iconClass: 'text-red-400',
    titleClass: 'text-red-300',
  },
  xp_gain: {
    icon: Zap,
    className: 'border-primary-400/30 bg-primary-400/8',
    iconClass: 'text-primary-400',
    titleClass: 'text-primary-300',
  },
  achievement: {
    icon: Trophy,
    className: 'border-void_purple-400/30 bg-void_purple-400/8',
    iconClass: 'text-void_purple-400',
    titleClass: 'text-void_purple-300',
  },
};
```

## 15.5 Keyboard Shortcuts Map

```javascript
const KEYBOARD_SHORTCUTS = {
  'n':       { action: 'new_task',      label: 'New task' },
  'g':       { action: 'go_goals',      label: 'Go to Goals' },
  't':       { action: 'toggle_timer',  label: 'Start/Pause timer' },
  'j':       { action: 'go_journal',    label: 'Go to Journal' },
  'a':       { action: 'go_analytics',  label: 'Go to Analytics' },
  'r':       { action: 'go_rpg',        label: 'Go to Character' },
  '/':       { action: 'search',        label: 'Search' },
  'Escape':  { action: 'close_modal',   label: 'Close' },
  '?':       { action: 'show_shortcuts', label: 'Show shortcuts' },
  'ctrl+s':  { action: 'save',          label: 'Save' },
};
```

---

# PART 16: RESPONSIVE DESIGN BREAKPOINTS

```javascript
// Tailwind breakpoints
screens: {
  'xs':  '375px',   // Mobile S (iPhone SE)
  'sm':  '640px',   // Mobile L
  'md':  '768px',   // Tablet
  'lg':  '1024px',  // Desktop S (sidebar shows)
  'xl':  '1280px',  // Desktop M (max content width)
  '2xl': '1536px',  // Desktop L (large monitor)
}

// Responsive behavior:
// xs-sm:   Single column, bottom nav, no sidebar, compact cards
// md:      Two column grid, sidebar as sheet (slide-in), medium cards
// lg+:     Full layout with fixed sidebar, three+ column grids
// 2xl:     Wider content, larger charts, more breathing room
```

---

# PART 17: DESIGN TOKENS — QUICK REFERENCE

```javascript
// design-tokens.js — single source of truth, import everywhere
export const tokens = {
  colors: {
    primary:   '#FFAD00',
    plasma:    '#00C8E0',
    accent:    '#A855F7',
    success:   '#22C55E',
    danger:    '#EF4444',
    warning:   '#F59E0B',
    bg: {
      base:     '#0D0D12',
      surface:  '#13131A',
      elevated: '#1A1A24',
    },
    text: {
      primary:   '#F0F0F8',
      secondary: '#9090B0',
      muted:     '#505068',
    }
  },
  fonts: {
    display: "'Rajdhani', sans-serif",
    body:    "'Outfit', sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
  radii: {
    sm: '4px', md: '8px', lg: '12px',
    xl: '16px', '2xl': '20px', full: '9999px',
  },
  durations: {
    fast:    '150ms',
    default: '200ms',
    medium:  '300ms',
    slow:    '500ms',
    dramatic:'1000ms',
  },
  easings: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
    enter:    'cubic-bezier(0, 0, 0.2, 1)',
    exit:     'cubic-bezier(0.4, 0, 1, 1)',
  },
};
```

---

*Design System End — ProductivityOS v1.0*
*This document is the single source of truth for all UI/UX decisions.*
*All components must reference these tokens. No hardcoded values in components.*
