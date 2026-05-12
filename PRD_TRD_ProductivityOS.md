# ProductivityOS — Product Requirements Document (PRD) & Technical Requirements Document (TRD)

**Version:** 1.0  
**Author:** Senior Product & Engineering Team  
**Date:** May 2026  
**Status:** Draft — Internal Use Only  

---

# TABLE OF CONTENTS

1. Executive Summary  
2. Product Vision & Goals  
3. Target Users  
4. Feature Specifications (PRD)  
   - 4.1 Second Brain AI Memory System  
   - 4.2 Rage Mode Accountability  
   - 4.3 Full RPG Game System  
   - 4.4 Life Energy Tracker  
   - 4.5 AI DJ (Context-Aware Music)  
   - 4.6 Time Capsule Journal  
   - 4.7 Gym Tracker  
   - 4.8 DNA of Productivity (Pattern Analysis)  
   - 4.9 Pomodoro Focus Timer  
   - 4.10 Daily Task Manager  
   - 4.11 Long-Term Goals & Calendar  
5. Non-Functional Requirements  
6. Technical Architecture (TRD)  
   - 6.1 System Architecture Overview  
   - 6.2 Frontend Architecture  
   - 6.3 Backend Architecture  
   - 6.4 Database Design  
   - 6.5 AI & ML Layer  
   - 6.6 API Specifications  
   - 6.7 Authentication & Security  
   - 6.8 Focus App (Desktop/Mobile)  
7. Tech Stack Summary  
8. Scalability & Infrastructure  
9. SaaS Launch Considerations  

---

---

# PART 1: PRODUCT REQUIREMENTS DOCUMENT (PRD)

---

## 1. Executive Summary

**ProductivityOS** ek all-in-one AI-powered productivity platform hai jo users ko unki daily tasks, long-term goals, habits, gym progress, aur mental state sab ek jagah manage karne deta hai. Yeh sirf ek to-do app nahi hai — yeh ek "life operating system" hai jisme AI deeply integrated hai taki user ka behavior samjhe, patterns dhunde, aur real, personalized feedback de.

**Core Differentiators:**
- AI sirf assistant nahi hai — woh memory rakhta hai, roast karta hai, aur future self ki taraf guide karta hai
- Gamification itna deep hai ki productivity ek actual RPG game ban jaati hai
- Real data-driven insights jo batate hain exactly kab, kaise, kyun user productive hota ya nahi hota
- Future mein SaaS product ke roop mein launch hoga multiple users ke liye

---

## 2. Product Vision & Goals

**Vision Statement:**  
"Har insaan apni full potential tak pahunch sake — AI uska partner ho, sirf ek tool nahi."

**Primary Goals:**
- Users ko daily accountability provide karna through tasks, streaks, aur AI feedback
- Long-term goal achievement ko track karna with milestone breakdowns
- Behavior patterns identify karna aur personalized productivity formula banana
- Engagement maintain karna through gamification (RPG system) jo addictive feel ho
- Health & fitness tracking (gym) ko productivity ke saath integrate karna
- Future self visualization se deep motivation create karna

**Success Metrics:**
- Daily Active Users (DAU) retention > 60% after 30 days
- Average session time > 20 minutes/day
- Task completion rate > 70% for logged tasks
- Streak maintenance > 14 days average
- User-reported productivity improvement > 40% (survey-based)

---

## 3. Target Users

**Primary User (MVP):** The builder himself — ek ambitious individual jo apni life organize karna chahta hai.

**Future Target Audience (SaaS Launch):**
- Students (16-25) who want to study better and track goals
- Freelancers & entrepreneurs who are self-managed
- Fitness-minded individuals who combine gym + work tracking
- Gamers who respond to RPG-style motivation systems
- Anyone who has tried 10 apps but nothing "sticks"

**User Personas:**

**Persona 1 — "The Hustler" (Rahul, 22)**  
College student, wants to build a startup. Uses Instagram too much. Needs accountability, not another boring app. Loves games. Would respond well to roast mode and RPG system.

**Persona 2 — "The Builder" (Priya, 28)**  
Freelance developer. Has goals but loses momentum. Needs pattern analysis to understand when she works best. Would love the Second Brain + DNA of Productivity features.

**Persona 3 — "The Fitness Guy" (Arjun, 25)**  
Goes to gym but wants to sync his fitness journey with work goals. Needs the gym tracker + life energy system to see holistic progress.

---

## 4. Feature Specifications

---

### 4.1 SECOND BRAIN AI MEMORY SYSTEM

**What it does:**  
AI ko user ki har conversation, completed task, failed task, mood, time patterns sab yaad rehta hai. Yeh ek persistent memory layer hai jo har session mein active rehti hai.

**User Experience:**
- Jab user koi task add kare, AI silently note kare — topic, category, time of day, success/failure
- After 7 days, AI ek "Memory Insight" dikhaye — "Tu Tuesday ko 90% tasks complete karta hai, lekin Thursday ko sirf 30%"
- User apne saare goals, fears, triggers AI ko bata sakta hai — woh sab yaad rakhega
- "Ask Your Brain" button — user koi bhi productivity question puchhe, AI apni memory se jawab de
- Weekly "Brain Report" generate ho — last 7 din ka summary, patterns, suggestions

**Memory Categories AI Track Karega:**
- Task completion by day, hour, category
- Mood patterns (user manually log kare ya typing speed se infer)
- Streak breaks — kab kab hua aur kyun (user se reason lega)
- Most productive hours (based on data, not assumptions)
- Trigger events — kya hua uss din jab productivity giri

**Edge Cases:**
- Agar user memory clear karna chahe — full wipe option with confirmation
- Privacy: sab data local + encrypted; future mein user ka apna encrypted cloud storage
- AI galat pattern predict kare toh user "Wrong" flag kar sakta hai — AI learn karega

**Acceptance Criteria:**
- AI memory minimum 90 days retain kare
- Memory insights weekly auto-generate ho
- User manually memory entries add/delete kar sake
- "Ask Your Brain" chatbot real-time respond kare (< 3 seconds)

---

### 4.2 RAGE MODE ACCOUNTABILITY

**What it does:**  
Jab user koi task miss kare, AI use ek customizable intensity pe "roast" karta hai. Yeh feature emotional impact create karta hai jisse user next time seriously le.

**Modes:**
- **Soft Mode:** Gentle reminder — "Kal bhi yahi hua tha, soch le kya chahiye tujhe."
- **Hard Mode:** Direct — "3 baar miss kar chuka hai. Excuse factory band kar."
- **Brutal Mode:** No mercy — "Teri future self tujhse sharmindi hai. Kya chal raha hai seriously?"
- **Custom Mode:** User khud apna roast message likh sakta hai

**Wall of Shame:**
- Failed tasks ek special "Wall of Shame" section mein move ho jaate hain
- Yeh wall sirf user ko dikhti hai — private
- Each failed task pe AI ek sarcastic comment likhta hai
- "Earn Back" system: failed task wapas complete karne ke liye ek extra "penalty task" milta hai
- Penalty task complete karo toh failed task Wall of Shame se hata

**Trigger Mechanism:**
- Task deadline pass hone ke 1 hour baad notification
- Next login pe automatic roast popup
- Weekly "Shame Report" — top 3 most-failed areas

**Acceptance Criteria:**
- User mode kisi bhi time change kar sake (settings mein)
- Roast messages AI-generated ho — repetitive na ho
- Wall of Shame minimum last 30 days retain kare
- Penalty task system properly linked ho original task se

---

### 4.3 FULL RPG GAME SYSTEM

**What it does:**  
User ki real life ek RPG game ban jaati hai. Har kaam karne se XP milta hai, level up hota hai, character grow karta hai, boss battles hoti hain, aur agar kaam na karo toh character ki HP kam hoti hai.

**Character System:**
- User apna character naam aur class choose kare — Warrior (gym + physical), Mage (study + learning), Rogue (creative + business), Paladin (balance of all)
- Character ka visual avatar ho — simple pixel art ya emoji-based
- Stats: Strength (gym tasks), Intelligence (learning tasks), Discipline (streak), Creativity (creative tasks), Wealth (business/finance tasks)
- Har category ke tasks corresponding stat badhate hain

**XP & Leveling:**
- Simple task: 10 XP
- Medium task: 25 XP
- Hard/long task: 50 XP
- Boss battle (major goal milestone): 200 XP
- Streak bonus: +5 XP per day of streak
- Level 1-10: Beginner | Level 11-25: Intermediate | Level 26-50: Advanced | Level 51+: Legendary

**Boss Battles:**
- Har long-term goal ek "Boss" hota hai
- Boss ka HP hota hai (e.g., "Read 12 books this year" = Boss HP 1200)
- Har book complete = 100 damage to boss
- Boss defeat karne pe rare achievement badge

**HP System (Consequence of Inaction):**
- Character ka max HP 100 se start
- Agar koi task miss ho — character -5 HP lose kare
- 3 consecutive misses — character "Wounded" state mein
- 7 consecutive misses — character "Critical" state — warning aata hai
- HP 0 pe character "fall" ho — but recovery possible with 3 day streak
- Character kabhi permanently die nahi karta — recovery always possible

**Achievements & Inventory:**
- Special badges: "Early Bird" (5 tasks before 8am), "Night Owl" (5 tasks after 10pm), "Unstoppable" (30 day streak), "Gym Warrior" (50 gym sessions logged)
- Inventory mein achievements display ho — trophy room style

**Acceptance Criteria:**
- XP calculation real-time ho — task complete karo, XP turant dikhaye
- Level up animation play ho
- All stats properly tracked and displayed on character screen
- Boss battle progress visual progress bar se dikhaye

---

### 4.4 LIFE ENERGY TRACKER

**What it does:**  
User ko dikhata hai ki unki life finite hai. Remaining weeks, days, aur hours visualize hoke deep motivation create karta hai.

**Core Display:**
- User apni date of birth enter kare aur expected lifespan (default: 80 years)
- Dashboard pe ek visual grid dikhe — har square = 1 week of life
- Green squares = past weeks (gone)
- Yellow square = current week
- Grey squares = remaining weeks
- Total remaining weeks prominently display ho

**Daily Energy View:**
- "Aaj ke 24 hours ka budget" — visual bar
- Har activity category ko time allocation karo (sleep, work, exercise, entertainment)
- Day end mein: "Aaj ka energy score" — kite % time meaningful kaam mein gaya
- Wasted hours = red blocks on the day's timeline

**Reality Check Notifications:**
- Weekly: "Tumhare paas approximately X Sundays bache hain"
- Monthly: "Iss mahine 30 days mein se X days productive the"
- Yearly: "Tumne apni life ka X% use kar liya"
- Birthday pe special notification with life summary

**Goal Time Calculator:**
- User ek goal enter kare — "Learn guitar"
- System calculate kare: "Agar tum 30 min/day practice karo, tum 6 months mein intermediate level ho jaoge"
- "Is goal ke liye tumhari remaining life mein X attempts hain agar ek fail hua"

**Acceptance Criteria:**
- Life grid accurately calculate aur render ho
- Date of birth se calculations correct hon
- Wasted hours vs productive hours graph daily update ho
- All calculations update if user changes expected lifespan

---

### 4.5 AI DJ — CONTEXT-AWARE MUSIC

**What it does:**  
User ke current task type, energy level, aur time of day ke basis pe automatic music recommendations ya playlist switching. Focus ke liye scientifically chosen audio environment.

**Task-to-Music Mapping:**
- Deep work / coding → Lo-fi hip hop, binaural beats (40Hz gamma)
- Creative tasks → Ambient electronic, instrumental jazz
- Physical/gym tasks → High BPM electronic, motivational tracks
- Reading/studying → Classical, nature sounds
- Meditation/reflection → 432Hz music, silence with nature sounds
- Pomodoro break → Upbeat, energizing short tracks

**Integration Options:**
- Embedded YouTube playlist links per category (no API key needed initially)
- Future: Spotify API integration for actual playback control
- User can add custom playlist URLs per task category
- "Override" button — user manually choose kar sake

**Energy-Based Adaptation:**
- If user is in a long streak (flow state detected) → music stays consistent, no interruptions
- If many tasks being missed → switch to high-energy motivational music automatically
- Morning sessions → gradually increasing energy tracks
- Night sessions → calmer, focus-oriented audio

**Acceptance Criteria:**
- Music player embedded in dashboard (YouTube iframe or similar)
- Auto-switch on task category change
- User can mute/pause from dashboard without leaving
- Custom playlist URL per category saveable

---

### 4.6 TIME CAPSULE JOURNAL

**What it does:**  
User roz ek entry likhta hai — text + optional photo/mood. AI yeh entries analyze karke ek saal baad "Aaj se ek saal pehle" memory dikhata hai. Year-end mein AI ek complete journey summary generate karta hai.

**Daily Entry Components:**
- Date auto-filled
- Mood selector (5 options: Terrible / Bad / Okay / Good / Amazing — with emoji)
- 3 required fields: "Aaj kya achieve kiya?", "Kya struggle raha?", "Kal ke liye ek intention"
- Optional: longer free-form journal text
- Optional: photo upload (phone se)
- Tags: work, personal, gym, learning, relationships, etc.

**Memory Replay System:**
- "On This Day" feature — exactly 1 year, 6 months, 3 months pehle ki entry
- Weekly digest email/notification — "Iss hafte pichle saal..."
- AI-generated monthly summary — "October 2025 mein tumne X tasks complete kiye, mood mostly Y tha, biggest achievement Z tha"

**Year-End AI Report:**
- Full year journey document generate ho (downloadable PDF)
- Growth areas highlighted
- Biggest wins & losses
- Word cloud from journal entries
- Mood graph for the entire year
- XP earned, level achieved
- "Dear Future Self" letter automatically generated based on year's data

**Acceptance Criteria:**
- Journal entries permanently stored (user's data, never deleted without permission)
- "On This Day" feature works from day 1 (even if no past data, shows "Check back next year!")
- Year-end report generates automatically on Jan 1 or user's signup anniversary
- Photo storage properly handled (compressed, local or cloud)

---

### 4.7 GYM TRACKER

**What it does:**  
User apne gym sessions log kare — exercises, sets, reps, weight. Progress track ho, PRs (personal records) celebrate ho, aur gym progress RPG stats se linked ho.

**Workout Logging:**
- Quick-add: Choose exercise → sets → reps → weight
- Pre-built exercise library (100+ exercises with muscle group tags)
- Custom exercises add kar sake
- Rest timer between sets (auto-starts after set logged)
- Session timer — total workout duration

**Progress Tracking:**
- Per-exercise progress graph — weight/reps over time
- PR detection — jab new personal record ho, celebration animation
- Weekly volume tracking — total sets, total weight lifted
- Muscle group balance chart — kaunsa muscle group over/under trained hai
- Body measurement log (weight, measurements) — optional

**Gym + RPG Integration:**
- Gym session = Strength stat XP gain
- New PR = Special achievement badge
- 7-day gym streak = "Iron Will" achievement
- Gym tasks appear in main task dashboard as "Physical Quests"

**Workout Plans:**
- User ek weekly plan set kare — Monday: Chest + Triceps, etc.
- Plan automatically tasks generate kare weekly
- Missed gym session = character HP loss (RPG system se connected)

**Acceptance Criteria:**
- Exercise library searchable with muscle group filter
- Progress graphs load in < 2 seconds
- PR detection accurate — compares all historical data
- Rest timer runs in background, notification on completion

---

### 4.8 DNA OF PRODUCTIVITY — PATTERN ANALYSIS

**What it does:**  
90 din ka data collect hone ke baad, AI user ka unique "Productivity DNA" generate karta hai — exact peak hours, kryptonite factors, best task types, aur ek personalized productivity formula.

**Data Points Tracked:**
- Task completion timestamp — exactly kab tasks complete hue
- Task failure timestamp — kab miss hua
- Task category success rates — kaunse type ke tasks consistently complete hote hain
- Day of week performance — Monday worst? Sunday best?
- Time of day performance — morning warrior ya night owl?
- Mood correlation — good mood days mein kitne tasks?
- Season/weather correlation (future feature)

**DNA Report Components:**
- **Peak Performance Window:** "Tumhara 90% best work 9am-12pm ke beech hota hai"
- **Kryptonite:** "Wednesday ko tumhari productivity 40% drop hoti hai — identify the pattern"
- **Sweet Spot Task Duration:** "Tum 30-45 min ke tasks best complete karte ho — 2 hour tasks incomplete rehte hain"
- **Best Category:** "Learning tasks mein tumhari completion rate 85% hai, admin tasks mein 30%"
- **Energy Curve:** Line graph showing energy/productivity by hour across all tracked days
- **Custom Formula:** "Tumhara ideal day: 9am start, 3 tasks of 45 min each, gym at 6pm, journal at 10pm"

**Recommendations Engine:**
- Auto-schedule suggestions: "Is task ko Tuesday 10am pe schedule karo — tumhara best time"
- Warning flags: "Yeh task Wednesday ke liye hai — historically tumhara worst day. Reschedule?"
- Weekly optimization tips based on last week's data

**Acceptance Criteria:**
- DNA report generates after 30 days (preliminary) and full report after 90 days
- All graphs interactive — hover se exact data point dikhaye
- Recommendations dismissible — user disagree kar sake
- Data export available as CSV

---

### 4.9 POMODORO FOCUS TIMER

**What it does:**  
Classic Pomodoro technique (25 min work + 5 min break) with AI enhancements — session tracking, focus score, distraction logging, aur RPG integration.

**Timer Features:**
- Standard Pomodoro: 25 min work, 5 min break, 4 cycles = long break (15 min)
- Customizable: User apne intervals set kare (e.g., 50 min work / 10 min break)
- Visual timer — circular countdown, color changes as time progresses
- Audio cue on completion (customizable sound)
- Full-screen focus mode — dashboard dim, sirf timer dikhe

**Session Tracking:**
- Har Pomodoro = 1 "Focus Block" logged
- Daily focus blocks graph
- Total focus hours this week/month
- Linked to current task — "2 Pomodoros for this task"
- Distraction log: user manually log kare agar distracted hua — what distracted them

**AI Enhancement:**
- After 5 sessions, AI suggest kare optimal session length based on completion patterns
- "You complete more work in 50-min blocks than 25-min" — AI insight
- Focus score: (completed pomodoros / planned pomodoros) x 100

**RPG Integration:**
- 1 Pomodoro completed = 15 XP
- 4 Pomodoros in a row (no break skipped) = "Deep Focus" achievement
- Focus blocks contribute to "Discipline" stat

**Acceptance Criteria:**
- Timer accurate to the second
- Timer continues if user switches tabs (background timer)
- Notification on timer end (browser notification)
- Session data saved even if user closes tab mid-session (localStorage fallback)

---

### 4.10 DAILY TASK MANAGER

**What it does:**  
Core task management — add, edit, complete, delete tasks with priority levels, categories, deadlines, and AI-powered task completion quiz.

**Task Properties:**
- Title (required)
- Category: Work / Study / Gym / Personal / Creative / Finance / Health
- Priority: Low / Medium / High / Critical
- Estimated duration (in minutes)
- Deadline: date + optional time
- Notes/description field
- Subtasks support (nested tasks)
- Recurring: daily, weekly, monthly, custom

**Task States:**
- Todo → In Progress → Completed / Failed
- Archived (old completed tasks)
- "Wall of Shame" (failed tasks — from Rage Mode feature)

**AI Task Completion Quiz:**
- Jab user koi task complete kare, AI 2-3 relevant questions puchhe
- E.g., Task: "Read Chapter 5 of Atomic Habits" → AI asks: "What was the main concept of the chapter?", "How will you apply this in the next 24 hours?"
- User ka answer save ho — journal mein add ho
- Agar user skip kare — AI gently notes it but doesn't force

**Smart Features:**
- AI suggest kare ki kaunsa task pehle karna chahiye (priority + deadline + energy level)
- Overdue tasks automatically highlighted
- "Quick Win" filter — short tasks jaldi complete karne ke liye
- Bulk actions: complete all, delete all, reschedule all

**Acceptance Criteria:**
- Task add in < 5 seconds (minimal required fields)
- Recurring tasks auto-generate correctly
- AI quiz appears within 2 seconds of task completion
- Filter and sort work in real-time
- Search tasks by keyword

---

### 4.11 LONG-TERM GOALS & CALENDAR

**What it does:**  
User apne bade goals set kare (3 months, 6 months, 1 year, 5 year), unhe milestones mein break kare, aur ek calendar pe sab kuch dekhe.

**Goal Structure:**
- Goal title + description
- Timeline: end date
- Category (same as tasks)
- Milestones: smaller checkpoints jo goal ki taraf lead kare
- Progress percentage (auto-calculated from milestones completed)
- Linked tasks: daily tasks jo is goal ke liye hain
- Why statement: "Yeh goal kyun important hai mere liye"

**Calendar View:**
- Monthly, weekly, daily views
- Tasks, goals, milestones, gym sessions sab ek calendar pe
- Color coding by category
- Drag and drop rescheduling
- "Ideal Week" template — user set kare ki ideal week kaisi honi chahiye

**Goal Reviews:**
- Weekly: Auto-prompt — "Is goal pe is hafte kya progress hua?"
- Monthly: AI generate kare goal health report — "On track / At Risk / Off Track"
- Quarterly: Full review with AI recommendations

**Acceptance Criteria:**
- Goals visually linked to calendar milestones
- Progress bar auto-updates as linked tasks complete
- Calendar supports all 3 views (monthly/weekly/daily)
- Goal review prompts can be snoozed but not permanently dismissed

---

## 5. Non-Functional Requirements

**Performance:**
- Page load time < 2 seconds on 4G connection
- API response time < 500ms for 95% of requests
- AI chat response < 3 seconds

**Reliability:**
- 99.5% uptime target (SaaS launch ke baad)
- Offline support: Core features (task viewing, timer) work without internet
- Data autosave every 30 seconds

**Security:**
- All user data encrypted at rest (AES-256)
- HTTPS only — no HTTP
- JWT tokens for authentication, refresh token rotation
- No third-party tracking/analytics without user consent

**Accessibility:**
- Keyboard navigable
- Screen reader compatible (ARIA labels)
- Color blind friendly — no color-only indicators

**Scalability:**
- MVP: Single user (personal use)
- Phase 4: 100 users
- Phase 5: 10,000+ users — horizontal scaling ready

---

---

# PART 2: TECHNICAL REQUIREMENTS DOCUMENT (TRD)

---

## 6. Technical Architecture

---

### 6.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     USER DEVICES                        │
│         Browser (Web App)  |  Phone (Flutter App)       │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
               ▼                          ▼
┌─────────────────────────┐  ┌────────────────────────────┐
│    React.js Frontend    │  │    Flutter Mobile App      │
│    (SPA - Vite build)   │  │  (Focus/Block features)    │
└────────────┬────────────┘  └────────────────────────────┘
             │
             ▼
┌─────────────────────────┐
│   Node.js + Express     │  ← REST API Layer
│       Backend           │
│   (API Gateway)         │
└────────────┬────────────┘
             │
     ┌───────┼────────────┐
     ▼       ▼            ▼
┌────────┐ ┌─────────┐ ┌──────────────┐
│MongoDB │ │ Redis   │ │ Claude API   │
│(Main   │ │(Cache + │ │ (AI Layer)   │
│ DB)    │ │Sessions)│ │              │
└────────┘ └─────────┘ └──────────────┘
```

**Architecture Pattern:** Monolith first (MVP), microservices ready (SaaS scale)

**Communication:** REST API for MVP; WebSockets for real-time features (timer, live notifications)

---

### 6.2 Frontend Architecture

**Framework:** React.js 18+ with Vite (fast HMR, optimized builds)

**State Management:**
- Zustand — simple, lightweight global state
- React Query (TanStack Query) — server state, caching, background refetch
- Context API — user preferences, theme

**Routing:** React Router v6

**Styling:** Tailwind CSS + custom CSS variables for theming

**Key Libraries:**
- `recharts` — all graphs and analytics (DNA, progress, mood trends)
- `@fullcalendar/react` — calendar component
- `framer-motion` — animations (level up, achievements, transitions)
- `react-hot-toast` — notifications
- `date-fns` — date manipulation
- `zustand` — state management
- `axios` — HTTP client with interceptors

**Folder Structure:**
```
src/
├── components/
│   ├── common/           # Button, Modal, Input, Card
│   ├── layout/           # Sidebar, Header, Navigation
│   ├── features/
│   │   ├── tasks/        # TaskCard, TaskModal, TaskList
│   │   ├── rpg/          # Character, XPBar, BossBattle
│   │   ├── timer/        # PomodoroTimer, SessionTracker
│   │   ├── gym/          # WorkoutLog, ExerciseLibrary
│   │   ├── journal/      # JournalEntry, TimeCapsule
│   │   ├── analytics/    # DNAReport, ProductivityGraph
│   │   ├── goals/        # GoalCard, MilestoneTracker
│   │   └── ai/           # ChatBot, MemoryInsights, RoastModal
├── hooks/                # usePomodoro, useXP, useStreak
├── stores/               # Zustand stores per feature
├── services/             # API service layer (axios instances)
├── utils/                # XP calculations, date helpers
├── pages/                # Dashboard, Goals, Journal, Gym, Analytics
└── assets/               # Icons, sounds, images
```

**Component Design Principles:**
- Atomic design pattern (atoms → molecules → organisms → pages)
- All components lazy-loaded except critical path
- Custom hooks for all complex logic — no logic in JSX
- All API calls in service layer — components never call fetch directly

---

### 6.3 Backend Architecture

**Runtime:** Node.js 20 LTS  
**Framework:** Express.js 4  
**Pattern:** Controller → Service → Repository (layered)

**Folder Structure:**
```
server/
├── controllers/          # HTTP request handlers
│   ├── taskController.js
│   ├── goalController.js
│   ├── gymController.js
│   ├── journalController.js
│   ├── pomodoroController.js
│   ├── aiController.js
│   └── analyticsController.js
├── services/             # Business logic
│   ├── xpService.js      # XP calculation, leveling
│   ├── aiService.js      # Claude API calls, memory
│   ├── analyticsService.js # DNA calculations
│   └── notificationService.js
├── models/               # Mongoose schemas
├── routes/               # Express route definitions
├── middleware/
│   ├── auth.js           # JWT verification
│   ├── rateLimit.js      # API rate limiting
│   ├── validate.js       # Request validation (Joi/Zod)
│   └── errorHandler.js   # Global error handler
├── config/
│   ├── database.js       # MongoDB connection
│   ├── redis.js          # Redis connection
│   └── ai.js             # Claude API config
└── utils/
    ├── logger.js          # Winston logging
    └── dateHelpers.js
```

**Middleware Stack (in order):**
1. Helmet (security headers)
2. CORS (configured origins)
3. Rate limiter (express-rate-limit)
4. JSON body parser
5. JWT authentication
6. Request validator
7. Route handlers
8. Global error handler

---

### 6.4 Database Design

**Primary Database:** MongoDB (flexible schema, good for user-specific varying data)  
**Caching:** Redis (sessions, frequently accessed data, rate limiting)

**Collections:**

**users**
```json
{
  "_id": "ObjectId",
  "email": "string (unique, indexed)",
  "passwordHash": "string",
  "profile": {
    "name": "string",
    "dateOfBirth": "date",
    "timezone": "string",
    "avatar": "string (url)",
    "expectedLifespan": "number (default: 80)"
  },
  "rpg": {
    "characterName": "string",
    "characterClass": "enum: warrior|mage|rogue|paladin",
    "level": "number",
    "xp": "number",
    "hp": "number (0-100)",
    "stats": {
      "strength": "number",
      "intelligence": "number",
      "discipline": "number",
      "creativity": "number",
      "wealth": "number"
    }
  },
  "preferences": {
    "rageMode": "enum: soft|hard|brutal|custom",
    "rageModeCustomMessage": "string",
    "pomodoroWork": "number (minutes)",
    "pomodoroBreak": "number (minutes)",
    "musicPreferences": {
      "deepWork": "string (playlist url)",
      "creative": "string",
      "gym": "string"
    },
    "theme": "enum: dark|light|system"
  },
  "streaks": {
    "current": "number",
    "longest": "number",
    "lastActiveDate": "date"
  },
  "achievements": ["string (achievement IDs)"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

**tasks**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (indexed)",
  "title": "string",
  "description": "string",
  "category": "enum: work|study|gym|personal|creative|finance|health",
  "priority": "enum: low|medium|high|critical",
  "status": "enum: todo|inprogress|completed|failed|archived",
  "estimatedDuration": "number (minutes)",
  "deadline": "date",
  "completedAt": "date",
  "failedAt": "date",
  "xpEarned": "number",
  "subtasks": [{ "title": "string", "completed": "boolean" }],
  "recurring": {
    "enabled": "boolean",
    "frequency": "enum: daily|weekly|monthly|custom",
    "customDays": ["number"],
    "nextOccurrence": "date"
  },
  "goalId": "ObjectId (optional, ref: goals)",
  "aiQuizAnswers": [{ "question": "string", "answer": "string", "timestamp": "date" }],
  "pomodorosUsed": "number",
  "wallOfShame": "boolean",
  "penaltyTaskFor": "ObjectId (ref: tasks, optional)",
  "createdAt": "date"
}
```

**goals**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (indexed)",
  "title": "string",
  "description": "string",
  "whyStatement": "string",
  "category": "string",
  "status": "enum: active|completed|abandoned",
  "startDate": "date",
  "endDate": "date",
  "milestones": [{
    "_id": "ObjectId",
    "title": "string",
    "dueDate": "date",
    "completed": "boolean",
    "completedAt": "date"
  }],
  "linkedTaskIds": ["ObjectId"],
  "progressPercent": "number (0-100, auto-calculated)",
  "bossHp": "number (for RPG — total)",
  "bossCurrentHp": "number",
  "reviews": [{
    "type": "enum: weekly|monthly|quarterly",
    "note": "string",
    "progressSnapshot": "number",
    "createdAt": "date"
  }],
  "createdAt": "date"
}
```

**journal_entries**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (indexed)",
  "date": "date (indexed)",
  "mood": "enum: terrible|bad|okay|good|amazing",
  "moodScore": "number (1-5)",
  "achieved": "string",
  "struggled": "string",
  "intention": "string",
  "freeText": "string",
  "photoUrl": "string",
  "tags": ["string"],
  "tasksCompletedThatDay": "number",
  "xpEarnedThatDay": "number",
  "pomodorosCompletedThatDay": "number",
  "aiSummary": "string (generated monthly)",
  "createdAt": "date"
}
```

**gym_sessions**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (indexed)",
  "sessionDate": "date",
  "duration": "number (minutes)",
  "exercises": [{
    "exerciseId": "string",
    "exerciseName": "string",
    "muscleGroup": "string",
    "sets": [{
      "setNumber": "number",
      "reps": "number",
      "weightKg": "number",
      "isPersonalRecord": "boolean"
    }]
  }],
  "totalVolume": "number (kg x reps, auto-calculated)",
  "notes": "string",
  "xpEarned": "number",
  "createdAt": "date"
}
```

**pomodoro_sessions**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "taskId": "ObjectId (optional)",
  "startTime": "date",
  "endTime": "date",
  "durationMinutes": "number",
  "type": "enum: work|break|longbreak",
  "completed": "boolean",
  "distractionLog": ["string"],
  "focusScore": "number",
  "xpEarned": "number"
}
```

**ai_memory**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (unique index)",
  "memories": [{
    "type": "enum: pattern|insight|trigger|preference|goal",
    "content": "string",
    "confidence": "number (0-1)",
    "createdAt": "date",
    "updatedAt": "date",
    "verified": "boolean"
  }],
  "weeklyInsights": [{
    "weekOf": "date",
    "insights": ["string"],
    "generatedAt": "date"
  }],
  "productivityDNA": {
    "generatedAt": "date",
    "peakHours": [{ "hour": "number", "score": "number" }],
    "bestDay": "string",
    "worstDay": "string",
    "kryptonite": "string",
    "sweetSpotDuration": "number",
    "formula": "string"
  }
}
```

**Indexes:**
- `tasks`: `{userId: 1, status: 1}`, `{userId: 1, deadline: 1}`, `{userId: 1, category: 1}`
- `journal_entries`: `{userId: 1, date: -1}` (unique: userId+date)
- `gym_sessions`: `{userId: 1, sessionDate: -1}`
- `pomodoro_sessions`: `{userId: 1, startTime: -1}`

---

### 6.5 AI & ML Layer

**Provider:** Anthropic Claude API (claude-sonnet-4 model)  
**Use Cases:**

1. **Task Completion Quiz** — dynamic questions based on task title/category
2. **Rage Mode Roasts** — creative, non-repetitive roast messages per mode
3. **Memory Insights** — pattern analysis from structured user data
4. **DNA Report Generation** — natural language summary of analytics data
5. **Journal Summaries** — monthly AI journal summary
6. **Goal Review** — weekly AI goal health assessment
7. **"Ask Your Brain" Chat** — conversational AI with full user context

**AI Service Architecture:**

```javascript
// aiService.js pattern
class AIService {
  async generateTaskQuiz(task, userHistory) { }
  async generateRoast(missedTask, mode, recentHistory) { }
  async generateWeeklyMemoryInsight(userId, last7DaysData) { }
  async generateDNAReport(userId, analyticsData) { }
  async generateJournalSummary(entries) { }
  async chatWithBrain(userId, userMessage, fullMemoryContext) { }
}
```

**Context Injection Strategy:**
- Har AI call mein relevant user context inject karo (not all data, just relevant slice)
- Task quiz: task details + user's past quiz answers for same category
- Roast: missed task + last 7 days performance + selected mode
- Chat: full ai_memory document + last 30 days summary

**Rate Limiting for AI:**
- Max 50 AI calls per user per day (MVP)
- Queue system for non-urgent calls (weekly reports)
- Cache identical requests (same task type quiz) for 24 hours

**Prompt Engineering Standards:**
- All prompts in `/server/prompts/` folder as template strings
- Prompts versioned (v1, v2) for easy A/B testing
- System prompt consistent across all calls (user's full profile context)
- Output always requested in JSON for structured responses

---

### 6.6 API Specifications

**Base URL:** `https://api.productivityos.com/v1`  
**Authentication:** Bearer token (JWT) in Authorization header  
**Content-Type:** application/json

**Core Endpoints:**

```
AUTH
POST   /auth/register          → Create account
POST   /auth/login             → Get JWT token
POST   /auth/refresh           → Refresh JWT
POST   /auth/logout            → Invalidate token

TASKS
GET    /tasks                  → Get all tasks (with filters)
POST   /tasks                  → Create task
PATCH  /tasks/:id              → Update task
DELETE /tasks/:id              → Delete task
POST   /tasks/:id/complete     → Mark complete + trigger AI quiz
POST   /tasks/:id/fail         → Mark failed + trigger rage mode
GET    /tasks/today            → Today's tasks
GET    /tasks/overdue          → Overdue tasks

GOALS
GET    /goals                  → All goals
POST   /goals                  → Create goal
PATCH  /goals/:id              → Update goal
POST   /goals/:id/milestones   → Add milestone
PATCH  /goals/:id/milestones/:mid → Complete milestone

RPG
GET    /rpg/character          → Character stats
POST   /rpg/xp/add            → Add XP (internal use)
GET    /rpg/achievements       → All achievements
GET    /rpg/bosses             → Boss battles (goals)

JOURNAL
GET    /journal                → List entries (paginated)
POST   /journal                → Create entry
GET    /journal/:date          → Entry for specific date
GET    /journal/on-this-day    → This day last year/6months

GYM
GET    /gym/sessions           → All sessions
POST   /gym/sessions           → Log session
GET    /gym/exercises          → Exercise library
GET    /gym/progress/:exercise → Progress for specific exercise
GET    /gym/prs                → All personal records

POMODORO
POST   /pomodoro/start        → Start session
POST   /pomodoro/complete     → Complete session
POST   /pomodoro/break        → Log distraction
GET    /pomodoro/stats        → Focus stats

AI
POST   /ai/chat               → Chat with AI brain
GET    /ai/memory/insights    → Weekly memory insights
GET    /ai/dna                → Productivity DNA report
POST   /ai/roast/:taskId      → Generate roast for failed task

ANALYTICS
GET    /analytics/dashboard   → Main dashboard stats
GET    /analytics/heatmap     → Activity heatmap data
GET    /analytics/energy      → Life energy data
GET    /analytics/trends      → 30/60/90 day trends
```

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task with given ID does not exist",
    "statusCode": 404
  }
}
```

**Success Response Format:**
```json
{
  "success": true,
  "data": { },
  "meta": {
    "page": 1,
    "total": 50,
    "limit": 20
  }
}
```

---

### 6.7 Authentication & Security

**Authentication Flow:**
1. User register kare → password bcrypt hash (cost factor 12) → MongoDB store
2. Login → verify hash → generate JWT (access: 15min) + refresh token (7 days)
3. Refresh token Redis mein store (fast invalidation possible)
4. All protected routes → JWT middleware verify kare
5. Logout → refresh token Redis se delete

**Security Measures:**
- Helmet.js — XSS, clickjacking, MIME sniffing protection
- express-rate-limit — 100 req/15min per IP, 10 login attempts/hour
- Input sanitization — express-validator + mongo-sanitize (NoSQL injection prevention)
- CORS — only whitelisted origins
- Environment variables — never hardcode secrets
- API keys (Claude) — server-side only, never exposed to frontend

**Future SaaS Security:**
- OAuth 2.0 (Google, GitHub sign-in)
- 2FA (TOTP via authenticator app)
- Audit logs for all sensitive operations
- GDPR compliance — data export + deletion endpoints

---

### 6.8 Focus App Architecture

**Platform:** Flutter (Android + iOS — one codebase)  
**Purpose:** Time-based task popup + app blocking

**Core Features:**
- Scheduled background service (runs even when app closed)
- At configured time → push notification + popup with task text
- App blocking (Android: UsageStatsManager API; iOS: limited — Screen Time API, parental controls workaround)
- Sync with web dashboard via REST API

**Flutter Package Dependencies:**
- `flutter_local_notifications` — local push notifications
- `workmanager` — background tasks scheduling
- `android_alarm_manager_plus` — precise timing on Android
- `device_apps` — list installed apps
- `flutter_foreground_task` — foreground service for blocking
- `shared_preferences` — local settings storage
- `http` — API calls to backend

**App Architecture:**
```
lib/
├── main.dart
├── services/
│   ├── scheduler_service.dart     # Task scheduling logic
│   ├── blocking_service.dart      # App blocking logic
│   ├── api_service.dart           # Backend API calls
│   └── notification_service.dart  # Push notifications
├── screens/
│   ├── home_screen.dart           # Dashboard mirror
│   ├── focus_screen.dart          # Full-screen task popup
│   └── settings_screen.dart       # Configure blocking times
└── models/
    ├── task_model.dart
    └── schedule_model.dart
```

**Android-Specific:**
- `RECEIVE_BOOT_COMPLETED` permission — restart service after phone reboot
- `PACKAGE_USAGE_STATS` permission — detect which app is foreground
- Overlay permission — show popup over other apps
- Background service runs as foreground service (persistent notification)

**Blocking Mechanism (Android):**
- Every 1 second, check foreground app package name
- If blocked app detected → launch focus_screen as overlay
- User cannot dismiss overlay until task is acknowledged
- Emergency override: enter password to dismiss (1 use per day)

---

## 7. Tech Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend Framework | React.js | 18+ | UI |
| Build Tool | Vite | 5+ | Fast dev + build |
| Styling | Tailwind CSS | 3+ | Utility-first CSS |
| State (client) | Zustand | 4+ | Global state |
| State (server) | TanStack Query | 5+ | API state + cache |
| Animations | Framer Motion | 11+ | Smooth transitions |
| Charts | Recharts | 2+ | Analytics graphs |
| Calendar | FullCalendar | 6+ | Calendar view |
| Backend | Node.js + Express | 20 LTS | REST API |
| Database | MongoDB | 7+ | Primary data store |
| Cache | Redis | 7+ | Sessions + cache |
| AI Provider | Claude API | claude-sonnet-4 | AI features |
| Auth | JWT + bcrypt | — | Authentication |
| Mobile App | Flutter | 3+ | Focus/block app |
| Hosting (Frontend) | Vercel | — | CDN + deploys |
| Hosting (Backend) | Railway / Render | — | Node.js server |
| DB Hosting | MongoDB Atlas | — | Cloud MongoDB |
| File Storage | Cloudinary | — | Journal photos |
| Payments (future) | Razorpay | — | Indian SaaS billing |

---

## 8. Scalability & Infrastructure

**MVP (Personal Use):**
- Frontend: Vercel (free tier)
- Backend: Railway (free tier — 500 hours/month)
- DB: MongoDB Atlas (free tier — 512MB)
- All on free tiers — cost: ₹0/month

**SaaS Phase (100 users):**
- Backend: Railway Starter ($5/month)
- MongoDB Atlas: M10 cluster ($57/month)
- Redis: Upstash ($0-10/month)
- Vercel: Pro ($20/month)
- Total: ~$90/month (~₹7,500/month)

**Scale Phase (10,000+ users):**
- Backend: Multiple Railway instances behind load balancer
- MongoDB Atlas: M30+ cluster with read replicas
- Redis Cluster: 3 nodes
- CDN: Cloudflare for static assets
- Background jobs: BullMQ with Redis for AI report generation
- Estimated: $500-800/month

**Performance Optimizations:**
- MongoDB: Compound indexes on all frequently queried fields
- Redis: Cache dashboard stats (TTL: 5 minutes), exercise library (TTL: 24 hours)
- Frontend: Code splitting per route, lazy loading all feature modules
- AI: Cache quiz questions per task category for 24 hours
- Images: Cloudinary auto-compression + WebP conversion

---

## 9. SaaS Launch Considerations

**Multi-tenancy:** All documents have userId — natural tenant isolation in MongoDB. No schema changes needed for SaaS.

**Pricing Model (Recommended):**
- **Free:** 10 tasks/day, basic timer, no AI features, 7-day history
- **Pro (₹299/month):** Unlimited tasks, all AI features, full history, gym tracker, RPG system
- **Team (₹999/month per 5 users):** All Pro + shared accountability features (future)

**Launch Checklist:**
- [ ] Auth system fully tested
- [ ] Rate limiting per user (not just per IP)
- [ ] Data isolation verified (users cannot access each other's data)
- [ ] Payment integration (Razorpay)
- [ ] Email system (welcome, weekly reports) — SendGrid
- [ ] Error monitoring — Sentry
- [ ] Analytics — self-hosted Plausible (privacy-first)
- [ ] Terms of Service + Privacy Policy
- [ ] GDPR: Data export + deletion endpoints
- [ ] Onboarding flow (first-time user guided setup)
- [ ] Support system (Crisp chat or email)

---

*Document End — ProductivityOS PRD + TRD v1.0*  
*Next Document: Phase-wise Development Plan*
