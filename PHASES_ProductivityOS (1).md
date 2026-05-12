# ProductivityOS — Phase-wise Development Plan

**Project:** ProductivityOS (Personal → SaaS)  
**Total Duration:** ~12-14 months (2 hours/day learning + building)  
**Developer Level:** Beginner → Intermediate → Advanced  

---

# OVERVIEW — ALL PHASES AT A GLANCE

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| Phase 0 | Foundation | 6 weeks | Learn prerequisites |
| Phase 1 | MVP Core | 8 weeks | Working dashboard (personal use) |
| Phase 2 | AI Integration | 6 weeks | Add AI chatbot, quiz, roast, memory |
| Phase 3 | Advanced Features | 8 weeks | RPG, DNA, Life Energy, Gym, Journal |
| Phase 4 | Polish & Optimize | 4 weeks | Performance, mobile-responsive, testing |
| Phase 5 | Focus App | 6 weeks | Flutter app for blocking + popups |
| Phase 6 | SaaS Preparation | 6 weeks | Auth, payments, multi-user |
| Phase 7 | Launch | 4 weeks | Deploy, market, monitor |

**Total: ~48 weeks (~11-12 months)**  
*(Beginners ke liye realistic estimate, rush mat karo)*

---

---

# PHASE 0 — FOUNDATION (Weeks 1-6)
**Goal: Learn enough to start building. No code yet in the actual project.**

---

## Week 1: HTML + CSS Mastery

### What to Learn:
- HTML structure — headings, divs, forms, buttons, inputs
- CSS basics — selectors, box model, flexbox, grid
- CSS variables (custom properties)
- Responsive design — media queries

### Daily Tasks:
- **Day 1-2:** freeCodeCamp HTML course (complete Basic HTML section)
- **Day 3-4:** freeCodeCamp CSS course (complete Basic CSS + Visual Design)
- **Day 5:** Build a simple static page — "My Todo List" HTML only (no functionality)
- **Day 6-7:** Style it with CSS — colors, fonts, layout

### Checkpoint:
Can you build a page that looks decent and is responsive on phone?  
YES → Move on | NO → Spend one more week

### Resources:
- https://www.freecodecamp.org/learn/responsive-web-design/
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/

---

## Week 2: JavaScript Fundamentals

### What to Learn:
- Variables (let, const), data types
- Arrays and Objects — most important
- Functions — regular + arrow functions
- Loops — for, forEach, map, filter
- DOM manipulation — querySelector, addEventListener
- Fetch API basics

### Daily Tasks:
- **Day 1-2:** freeCodeCamp JavaScript Algorithms — Basic JavaScript section
- **Day 3:** Practice arrays and objects — make a small exercise: manage a list of tasks as an array
- **Day 4:** DOM manipulation — make buttons actually DO things (add item to list)
- **Day 5:** Local Storage — save your task list so it persists on refresh
- **Day 6-7:** Build: "Working Todo App" with HTML/CSS/JS — no framework

### Checkpoint:
Kya tumhara todo app kaam karta hai? Tasks add, complete, delete hote hain? Local storage save hota hai?  
YES → Move on | NO → More JS practice needed

### Resources:
- https://javascript.info (the best JS resource)
- https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/

---

## Week 3: React.js Basics

### What to Learn:
- What is a component
- JSX syntax
- Props and State (useState)
- useEffect hook
- Event handling in React
- Lists and keys

### Daily Tasks:
- **Day 1:** Install Node.js + create first React app with Vite (`npm create vite@latest`)
- **Day 2-3:** React official tutorial (tic-tac-toe tutorial on react.dev)
- **Day 4:** Convert your Week 2 todo app to React
- **Day 5-6:** Add features: categories, priorities — understand state management
- **Day 7:** Learn React Router — multiple pages in your app

### Checkpoint:
Can you build a multi-page React app with working state?

### Resources:
- https://react.dev/learn (official, best resource)

---

## Week 4: Tailwind CSS + Modern UI

### What to Learn:
- Tailwind utility classes
- Responsive classes (sm:, md:, lg:)
- Dark mode with Tailwind
- How to make things look good fast

### Daily Tasks:
- **Day 1:** Install Tailwind in your React project, understand utility-first concept
- **Day 2-3:** Restyle your todo app completely using Tailwind
- **Day 4:** Learn about components with Tailwind — buttons, cards, modals
- **Day 5:** Dark mode toggle implement karo
- **Day 6-7:** Design a full dashboard layout (sidebar + main content + header) — static, no functionality

### Checkpoint:
Does your dashboard look professional? Would you be proud to show it?

---

## Week 5: Backend Basics — Node.js + Express

### What to Learn:
- What is a backend and why we need it
- Node.js basics
- Express.js — creating routes
- REST API concepts (GET, POST, PUT, DELETE)
- Postman — testing your API

### Daily Tasks:
- **Day 1:** Install Node.js, create first Express server, make it say "Hello World"
- **Day 2:** Create CRUD routes for tasks (in-memory, no database yet)
- **Day 3:** Test all routes in Postman
- **Day 4:** Learn about middleware — what it does
- **Day 5:** Connect your React app to your Express API (axios)
- **Day 6-7:** Full stack todo: React frontend + Express backend (no DB yet — just array)

### Resources:
- https://expressjs.com/en/starter/hello-world.html
- Download Postman from https://www.postman.com

---

## Week 6: MongoDB + Git

### What to Learn:
- MongoDB basics — collections, documents, CRUD
- Mongoose ODM — schemas and models
- Connecting MongoDB Atlas (free cloud DB)
- Git basics — init, add, commit, push
- GitHub — remote repository

### Daily Tasks:
- **Day 1-2:** MongoDB Atlas account create karo, connect karo Express app se
- **Day 3:** Mongoose schema for Task — make it properly typed
- **Day 4:** Full CRUD with real database — replace in-memory array
- **Day 5:** Git init, first commit, push to GitHub
- **Day 6-7:** Full stack todo app — React + Express + MongoDB — fully working, on GitHub

### Phase 0 Final Checkpoint:
- [ ] HTML/CSS: Build responsive layouts
- [ ] JavaScript: Arrays, objects, async/await
- [ ] React: Components, state, routing
- [ ] Tailwind: Professional UI fast
- [ ] Express: REST API creation
- [ ] MongoDB: Data persistence
- [ ] Git: Version control basics
- [ ] Full Stack Todo App: Working end-to-end

**If all checked → You are READY for Phase 1!**

---

---

# PHASE 1 — MVP CORE (Weeks 7-14)
**Goal: Working ProductivityOS dashboard — personal use, no AI yet**

---

## Week 7: Project Setup & Architecture

### Tasks:
- [ ] Create GitHub repo: `productivityos`
- [ ] Initialize frontend: `npm create vite@latest frontend -- --template react`
- [ ] Initialize backend: `mkdir backend && cd backend && npm init -y`
- [ ] Install all dependencies:
  - Frontend: `react-router-dom zustand axios @tanstack/react-query tailwindcss framer-motion recharts date-fns react-hot-toast`
  - Backend: `express mongoose dotenv bcryptjs jsonwebtoken cors helmet express-rate-limit express-validator`
- [ ] Setup folder structure exactly as in TRD Section 6.2 and 6.3
- [ ] Create `.env` files (frontend + backend) — never commit these
- [ ] Setup MongoDB Atlas — create cluster, get connection string
- [ ] Deploy backend on Railway (free) — test endpoint live
- [ ] Deploy frontend on Vercel (free) — connect to GitHub

### Deliverable: Empty project running live on Vercel + Railway

---

## Week 8: Layout + Navigation

### Tasks:
- [ ] Build main dashboard layout:
  - Sidebar with navigation links
  - Header with date, user name, streak counter
  - Main content area
- [ ] Create all page routes (empty pages for now):
  - `/` → Dashboard
  - `/tasks` → Task Manager
  - `/goals` → Goals
  - `/timer` → Pomodoro
  - `/gym` → Gym Tracker
  - `/journal` → Journal
  - `/analytics` → Analytics
  - `/rpg` → Character
- [ ] Make layout fully responsive (mobile hamburger menu)
- [ ] Implement dark/light mode toggle
- [ ] Store theme preference in localStorage

### Deliverable: Beautiful shell app — all pages exist, navigation works

---

## Week 9-10: Task Manager (Core Feature)

### Week 9 Tasks:
- [ ] Task model in MongoDB (all fields from TRD Section 6.4)
- [ ] All task API endpoints (GET, POST, PATCH, DELETE, complete, fail)
- [ ] Task list component with filter tabs (All, Today, Overdue, Completed)
- [ ] Add task modal — form with all fields
- [ ] Task card component — shows title, priority, category, deadline
- [ ] Priority color coding (critical=red, high=orange, medium=yellow, low=green)
- [ ] Mark task as complete — with animation (checkmark + strike-through)
- [ ] Delete task with confirmation

### Week 10 Tasks:
- [ ] Subtasks — nested task items
- [ ] Recurring tasks — auto-generate logic on backend
- [ ] Overdue detection — highlight overdue tasks
- [ ] Drag-to-reorder tasks (within same day)
- [ ] Task search — real-time filtering
- [ ] Bulk actions — select multiple, complete/delete all
- [ ] Category filter + Priority filter (combine both)
- [ ] "Today's Tasks" vs "All Tasks" toggle

### Deliverable: Fully working task manager — add, complete, fail, search, filter

---

## Week 11: Goals + Calendar

### Tasks:
- [ ] Goals model in MongoDB
- [ ] Goals API — CRUD + milestone endpoints
- [ ] Goals page — card view with progress bars
- [ ] Create goal modal — all fields (title, why, timeline, milestones)
- [ ] Milestone checklist inside goal card
- [ ] Progress auto-calculation — (completed milestones / total milestones) x 100
- [ ] Goals linked to tasks — can tag a task as "for this goal"
- [ ] Install FullCalendar: `npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid`
- [ ] Calendar page — monthly view
- [ ] Tasks appear on calendar on their deadline date
- [ ] Goals milestones appear on calendar
- [ ] Click calendar event → opens task/milestone detail
- [ ] Weekly and daily views

### Deliverable: Goals page + Calendar — everything linked

---

## Week 12: Pomodoro Timer

### Tasks:
- [ ] Pomodoro Timer component — circular visual countdown
- [ ] Settings: configurable work/break/long break duration
- [ ] Start, Pause, Reset, Skip controls
- [ ] Auto-cycle: work → break → work → break → long break (after 4 cycles)
- [ ] Sound notification on cycle end (use HTML5 Audio API)
- [ ] Background timer — continues even if user navigates away
- [ ] Link timer to a specific task — "Working on: Task Name"
- [ ] Pomodoro session saved to DB on completion
- [ ] Daily stats: Pomodoros completed today
- [ ] Distraction log button — click when distracted, log what distracted
- [ ] Full-screen focus mode — dim everything except timer
- [ ] Browser notification permission request + notification on cycle end

### Deliverable: Fully working Pomodoro timer with session tracking

---

## Week 13: Streak System + Dashboard Stats

### Tasks:
- [ ] Streak calculation logic on backend:
  - Check if user completed at least 1 task yesterday
  - If yes → increment streak
  - If no → reset streak to 0
  - Update on each login and on each task completion
- [ ] Streak display on header — fire emoji + number
- [ ] Streak milestone notifications (7 days, 14 days, 30 days, etc.)
- [ ] Dashboard stats widgets:
  - Tasks completed today / total tasks today
  - Current streak
  - This week's completion rate (%)
  - Total XP (placeholder — RPG comes later)
  - Goals on track count
  - Pomodoros today
- [ ] Activity heatmap (GitHub-style) — last 90 days of activity
- [ ] Weekly completion bar chart
- [ ] Category breakdown pie chart (time spent per category this week)

### Deliverable: Dashboard actually shows useful data at a glance

---

## Week 14: Basic User Preferences + Settings

### Tasks:
- [ ] Settings page:
  - Profile (name, date of birth, timezone, expected lifespan)
  - Appearance (theme, sidebar collapsed/expanded)
  - Pomodoro (work duration, break duration)
  - Notifications (which notifications to receive)
  - Data (export all data as JSON, clear data)
- [ ] All settings persist to DB
- [ ] Profile picture upload (start with URL input — Cloudinary integration later)
- [ ] Keyboard shortcuts:
  - `N` → new task
  - `T` → start timer
  - `G` → go to goals
  - `J` → journal
  - `?` → show shortcuts modal
- [ ] Onboarding flow for first visit (5-step setup wizard)

### Phase 1 Final Deliverable:
A fully working personal productivity dashboard with tasks, goals, calendar, Pomodoro timer, streaks, and dashboard analytics. Deployed live. No AI yet, but everything works perfectly.

---

---

# PHASE 2 — AI INTEGRATION (Weeks 15-20)
**Goal: Make the app intelligent — AI everywhere**

---

## Week 15: Claude API Setup + Task Completion Quiz

### Tasks:
- [ ] Get Anthropic API key (https://console.anthropic.com)
- [ ] Install SDK: `npm install @anthropic-ai/sdk` (backend)
- [ ] Create `aiService.js` with base Claude API call function
- [ ] Environment variable for API key (NEVER in code)
- [ ] Rate limiting for AI endpoints (50 calls/day per user)
- [ ] Task completion quiz:
  - After `POST /tasks/:id/complete` → trigger AI quiz generation
  - AI generates 2-3 questions based on task title + category
  - Questions appear as modal right after task completion
  - User answers saved to `task.aiQuizAnswers`
  - Skip option available
- [ ] Prompt template for quiz questions:
  - Work task → comprehension/application questions
  - Study task → recall and application
  - Gym task → form check/reflection questions
  - Creative task → reflection + next steps

### Deliverable: Task completion triggers AI quiz

---

## Week 16: Rage Mode System

### Tasks:
- [ ] Rage mode settings page — choose mode (soft/hard/brutal/custom)
- [ ] When task is marked failed:
  - `POST /tasks/:id/fail` → save to DB → trigger AI roast generation
  - AI generates contextual roast based on: task title, mode, how many times failed this week
  - Roast displayed as modal with dramatic animation
- [ ] Wall of Shame page:
  - Failed tasks listed with AI-generated sarcastic comment
  - Sorted by "most failed category"
  - Earn Back system: penalty task auto-created for each Wall of Shame task
  - Completing penalty task → removes original from Wall of Shame
- [ ] Shame Report — weekly summary of failures with AI commentary
- [ ] Roast prompt engineering — ensure messages are actually funny/impactful, not generic
- [ ] Test all 4 modes — make sure tone is distinctly different

### Deliverable: Rage mode working — fail a task, get roasted

---

## Week 17: AI Memory System

### Tasks:
- [ ] `ai_memory` collection setup in MongoDB
- [ ] Memory data aggregation service:
  - Every Sunday midnight → background job runs
  - Aggregates last 7 days: tasks by day, by hour, completion rates, mood
  - Sends to Claude → generates weekly insights
  - Saves insights to `ai_memory.weeklyInsights`
- [ ] Memory Insights page:
  - Show all weekly insights
  - User can flag insight as "Wrong" → AI notes it
  - Timeline of insights (newest first)
- [ ] "Ask Your Brain" chat interface:
  - Chat UI component
  - `POST /ai/chat` endpoint
  - System prompt includes: user's full memory, last 30 days stats, current goals
  - Conversational — maintains context within a session
  - Common questions suggested: "When am I most productive?", "What's my biggest struggle?"
- [ ] Manual memory entries:
  - User can add personal notes to AI memory
  - E.g., "I work best in coffee shops" → AI includes this in context

### Deliverable: AI actually remembers user patterns and can chat about them

---

## Week 18: Life Energy Tracker

### Tasks:
- [ ] Life Energy page — main display
- [ ] Life grid visualization:
  - SVG or canvas-based grid
  - Each square = 1 week of life
  - Green = past, yellow = current, grey = remaining
  - Hover → show week number + date range
  - Total remaining weeks displayed prominently
- [ ] Daily energy view:
  - 24-hour timeline
  - User assigns activities to time blocks (drag or dropdown)
  - Day end score calculation
  - Historical daily scores graph
- [ ] Reality check notifications:
  - Weekly push notification with remaining weeks
  - Monthly newsletter-style summary
- [ ] Goal Time Calculator:
  - Input: goal, daily time commitment
  - Output: time to achieve + number of remaining "attempts"
- [ ] Lifespan customization in settings
- [ ] "Memento Mori" mode — optional extreme version with daily death countdown

### Deliverable: Life energy tracker fully working, existentially impactful

---

## Week 19: Time Capsule Journal

### Tasks:
- [ ] Journal entry model finalized (all fields from TRD)
- [ ] Journal page — entry form + history list
- [ ] Daily entry form:
  - Mood selector (5 options with emoji + color)
  - 3 required fields (achieved, struggled, intention)
  - Optional free text
  - Optional photo upload (Cloudinary integration)
  - Tag selector
- [ ] Entry validation — gently remind if missing required fields but don't block
- [ ] Historical entries list — infinite scroll, search, filter by mood/tag
- [ ] "On This Day" feature:
  - Check entries from 1 year ago, 6 months ago, 3 months ago
  - Show as "Memory" card at top of journal page
  - If no past entry → show "Come back next year to see this!"
- [ ] Monthly AI journal summary:
  - First of month → AI generates previous month's summary
  - Mood trends, biggest achievements, word cloud (text-based list)
  - Saved to journal entry with type "ai_monthly_summary"
- [ ] Journal export — all entries as PDF (future) or JSON now

### Deliverable: Journal with AI summaries and time capsule memories

---

## Week 20: AI Refinement + Integration Polish

### Tasks:
- [ ] Review all AI prompts — refine for better quality responses
- [ ] Add loading states everywhere AI is called — skeleton screens
- [ ] Handle AI errors gracefully — fallback messages if API fails
- [ ] AI call caching — cache quiz for same task category (24hr Redis TTL)
- [ ] AI usage dashboard (for you) — how many calls per day, cost estimate
- [ ] Connect all AI features to memory system:
  - Failed tasks → stored in memory context
  - Journal mood → factored into memory
  - Pomodoro patterns → factored into DNA
- [ ] Test all AI features with edge cases:
  - Empty task titles
  - Very long journal entries
  - API timeout handling

### Phase 2 Final Deliverable:
App is genuinely intelligent. AI quiz on completion, roasts on failure, memory insights, "Ask Your Brain" chat, life energy tracker, and time capsule journal all working.

---

---

# PHASE 3 — ADVANCED FEATURES (Weeks 21-28)
**Goal: RPG system, Gym tracker, DNA of Productivity — make it addictive**

---

## Week 21-22: RPG Game System

### Week 21 Tasks (Character + XP):
- [ ] RPG fields added to user model (character, class, level, xp, hp, stats)
- [ ] XP calculation service:
  - Simple task complete: +10 XP
  - Medium task: +25 XP
  - Hard task: +50 XP
  - Pomodoro session: +15 XP
  - Gym session: +30 XP
  - Journal entry: +10 XP
  - Streak bonus: +5 XP/day
- [ ] Level thresholds defined (array: [0, 100, 250, 500, 1000, 2000...])
- [ ] Level up detection — trigger on every XP gain
- [ ] Level up animation (Framer Motion — dramatic, celebratory)
- [ ] Character page:
  - Avatar display (emoji-based character based on class)
  - Level + XP bar (progress to next level)
  - All 5 stats displayed as bars
  - Class description
  - Total XP earned lifetime
- [ ] HP system:
  - Miss task → -5 HP
  - HP displayed on character page and header
  - Low HP warning (below 30) — red warning banner
  - HP recovery: +5 HP per completed task when below 50

### Week 22 Tasks (Bosses + Achievements):
- [ ] Boss Battle system:
  - Each goal = Boss
  - Boss HP = (number of milestones x 100)
  - Milestone complete → boss takes damage
  - Boss HP bar displayed on goal card + boss battle page
  - Boss defeat → epic animation + 200 XP + achievement badge
- [ ] Achievements system (start with 15 achievements):
  - "First Blood" — complete first task
  - "Streak Starter" — 7 day streak
  - "Unstoppable" — 30 day streak
  - "Iron Will" — 7 gym sessions in a row
  - "Early Bird" — 5 tasks completed before 8am
  - "Night Owl" — 5 tasks completed after 10pm
  - "Deep Diver" — 4 Pomodoros in one day
  - "Boss Slayer" — defeat first boss (complete a goal)
  - "Journaler" — 30 journal entries
  - "Scholar" — 10 study tasks completed
  - "Warrior" — 25 gym sessions logged
  - "Comeback Kid" — recover from 0-HP with 3 day streak
  - "Overachiever" — complete all tasks for 5 days straight
  - "Honest" — log 10 honest failures (actually mark tasks as failed)
  - "Grandmaster" — reach Level 50
- [ ] Achievements page — trophy room style, locked vs unlocked
- [ ] Achievement unlock animation + notification

### Deliverable: Full RPG system — XP, levels, stats, bosses, achievements

---

## Week 23-24: Gym Tracker

### Week 23 Tasks (Core Tracking):
- [ ] Gym session model finalized
- [ ] Exercise library: 100+ exercises with muscle groups, instructions
  - Create as JSON file (seed data) → import to MongoDB on startup
  - Categories: Chest, Back, Shoulders, Arms, Legs, Core, Cardio
- [ ] Workout logging UI:
  - Select exercises (searchable library)
  - Log sets with reps + weight
  - Add more sets inline
  - Rest timer auto-starts after each set (configurable duration)
  - Session notes
  - Session timer (total workout duration)
- [ ] Session summary screen at end:
  - Total volume (kg x reps)
  - Exercises completed
  - PRs achieved (highlighted)
  - XP earned
  - RPG stat gained (Strength)
- [ ] Save session to DB + XP award

### Week 24 Tasks (Progress + Plans):
- [ ] Progress tracking:
  - Per-exercise charts — weight over time, volume over time
  - PR history for each exercise
  - Muscle group balance chart (radar/spider chart using Recharts)
  - Body weight log (optional)
- [ ] Personal Records (PRs):
  - Auto-detect when new PR set
  - PR animation + achievement notification
  - PR board — all time best per exercise
- [ ] Weekly gym plan:
  - User sets plan: Mon=Chest+Tri, Wed=Back+Bi, Fri=Legs, etc.
  - Plan auto-generates gym tasks weekly
  - Rest day scheduling
- [ ] Gym sessions in calendar view
- [ ] RPG integration: gym sessions update Strength stat + contribute to boss battles

### Deliverable: Complete gym tracker with progress graphs and PR tracking

---

## Week 25-26: DNA of Productivity

### Week 25 Tasks (Data Collection + Analysis):
- [ ] Analytics aggregation service:
  - Run every night at midnight (cron job)
  - Aggregate: tasks by day/hour, completion rates, categories, mood
  - Store raw analytics in separate collection (or compute on-the-fly for <90 days)
- [ ] Analytics API endpoints:
  - Activity heatmap data (365 days)
  - Hourly performance data
  - Day-of-week performance data
  - Category success rates
  - Task duration analysis (completed vs failed by duration)
- [ ] DNA report generation (30+ days):
  - Peak hours calculation (weighted average of completion time)
  - Best/worst day algorithm
  - Kryptonite identification (lowest completion category)
  - Sweet spot duration (mode of completed task durations)
  - Send all to Claude → generate narrative DNA report
  - Cache report for 7 days — regenerate weekly

### Week 26 Tasks (Visualization):
- [ ] DNA Report page:
  - Hourly performance heatmap (24 hours x 7 days grid)
  - "Peak Window" prominently highlighted
  - Kryptonite section with explanation
  - Sweet spot task duration recommendation
  - Category performance radar chart
  - Your custom productivity formula (AI-generated text)
- [ ] Smart scheduling suggestions:
  - When adding a task → AI suggests best time based on DNA
  - Warning if task scheduled at historically bad time
  - "Optimal week" auto-schedule button
- [ ] Trend analysis page:
  - 30/60/90 day toggle
  - Line charts for: completion rate, focus hours, XP earned, mood score
  - Comparison: "This month vs last month"

### Deliverable: Full DNA report with interactive charts + smart scheduling

---

## Week 27-28: AI DJ + Feature Integration

### Week 27 Tasks (AI DJ):
- [ ] Music player component — embedded YouTube player (iframe API)
- [ ] Playlist configuration per task category (settings page)
- [ ] Default playlists (curated YouTube playlist URLs for each category):
  - Deep work: Lo-fi beats playlist
  - Gym: High energy playlist
  - Study: Classical playlist
  - Creative: Ambient playlist
  - Break: Upbeat short playlist
- [ ] Auto-switch: when active task category changes → switch playlist
- [ ] Player controls: play/pause/next/volume (all in dashboard header)
- [ ] User can override: manually choose category
- [ ] "Now Playing" display — subtle, non-intrusive
- [ ] Future Spotify API: document the endpoint for later

### Week 28 Tasks (Integration Sprint):
- [ ] Connect ALL features together:
  - Task complete → XP earned → level check → achievement check → quiz → memory log
  - Task fail → HP loss → rage mode → Wall of Shame → memory log
  - Gym session → Strength XP → PR check → achievement check
  - Journal entry → mood logged → memory log → capsule stored
  - Pomodoro complete → XP → focus stat → DNA data point
- [ ] Global notification system:
  - Browser notifications for: streak reminders, level up, achievement unlock, life energy weekly
  - In-app notification bell with history
- [ ] All feature data appears in analytics dashboard
- [ ] Cross-feature insights: "Your mood directly correlates with gym days" — AI generated

### Phase 3 Final Deliverable:
Complete feature set working — RPG, Gym, DNA, AI DJ, Journal. Everything talks to everything. Dashboard shows a rich, interconnected view of user's productivity life.

---

---

# PHASE 4 — POLISH & OPTIMIZE (Weeks 29-32)
**Goal: Make it fast, beautiful, and bug-free**

---

## Week 29: Performance Optimization

### Tasks:
- [ ] Frontend bundle analysis — `npm run build` + analyze output size
- [ ] Code splitting — lazy load all page components
- [ ] Image optimization — WebP + lazy loading
- [ ] React Query optimization — staleTime, cacheTime tuned per endpoint
- [ ] MongoDB query optimization:
  - Verify all indexes are being used (MongoDB Atlas Performance Advisor)
  - Add missing indexes if any
  - Optimize N+1 queries (use `populate` sparingly — prefer aggregation)
- [ ] Redis caching:
  - Dashboard stats: cache 5 minutes
  - Exercise library: cache 24 hours
  - AI DNA report: cache 7 days
- [ ] API response optimization — select only needed fields (`.select()` in Mongoose)
- [ ] Load testing — verify app handles 100 concurrent users
- [ ] Lighthouse score > 90 for Performance, Accessibility, Best Practices

---

## Week 30: Mobile Responsiveness + PWA

### Tasks:
- [ ] Complete mobile audit — test all features on 375px (iPhone SE)
- [ ] Fix all mobile layout issues:
  - Sidebar → bottom nav on mobile
  - Modals → full-screen sheets on mobile
  - Tables → card view on mobile
  - Charts → simplified on mobile
- [ ] Progressive Web App (PWA) setup:
  - `vite-plugin-pwa` installation
  - Service worker — offline task viewing
  - Web manifest — app icon, name, theme color
  - "Add to Home Screen" prompt
  - Offline fallback page
- [ ] Touch interactions:
  - Swipe right on task → complete
  - Swipe left on task → options (edit, delete, fail)
  - Pull to refresh on task list

---

## Week 31: Testing + Bug Fixing

### Tasks:
- [ ] Manual test all features end-to-end (make a test checklist based on all acceptance criteria)
- [ ] Fix all bugs found in testing
- [ ] Edge case handling:
  - Empty states for all pages (first time user, no data)
  - Error states (API down, network error)
  - Loading states (skeleton screens for all data loads)
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] Write basic API tests (Jest + Supertest) for critical endpoints:
  - Task CRUD
  - Goal CRUD
  - Auth flow
  - XP calculation
- [ ] Error monitoring: add Sentry (free tier) to frontend + backend

---

## Week 32: UX Polish + Animations

### Tasks:
- [ ] Page transition animations (route changes) — subtle fade
- [ ] Micro-interactions:
  - Task check animation (bouncy checkmark)
  - XP gain floating number animation
  - Streak increment animation (fire grows briefly)
  - Achievement unlock — full screen celebration (3 second)
  - Level up — epic full screen animation
- [ ] Empty state illustrations — friendly, motivating (SVG illustrations)
- [ ] Onboarding improvements — based on Phase 1 Week 14 setup wizard
- [ ] Keyboard shortcut polish — all shortcuts working across all pages
- [ ] Helpful tooltips on all feature icons
- [ ] First-time feature introduction tooltips (one-time, dismissible)

### Phase 4 Final Deliverable:
A polished, fast, mobile-responsive web app. Looks professional. Performs great. All bugs fixed. Ready to use seriously as a daily driver.

---

---

# PHASE 5 — FOCUS APP (Weeks 33-38)
**Goal: Flutter app for phone — app blocking + task popup**

---

## Week 33: Flutter Learning Basics

### What to Learn:
- Flutter installation (https://flutter.dev/docs/get-started/install)
- Dart language basics (similar to JavaScript — easy transition)
- Widgets — everything is a widget in Flutter
- State management in Flutter (Provider or Riverpod)
- Navigation in Flutter

### Tasks:
- [ ] Install Flutter SDK + Android Studio
- [ ] Create first Flutter app — "Hello World"
- [ ] Dart basics — variables, functions, classes, async/await
- [ ] Build simple static UI in Flutter
- [ ] Flutter todo app (yes, another one — to learn Flutter specifically)

---

## Week 34: Focus App UI

### Tasks:
- [ ] Design Focus App screens:
  - Home — today's tasks (mirrored from web dashboard)
  - Focus Screen — full-screen task popup (modal overlay)
  - Settings — configure blocking times, blocked apps list, API connection
  - Blocked apps picker — list of installed apps
- [ ] Build all screens in Flutter
- [ ] Bottom navigation bar
- [ ] Light + dark mode
- [ ] Brand consistent with web dashboard

---

## Week 35: Backend API Connection

### Tasks:
- [ ] `http` package for API calls
- [ ] Login screen — enter same credentials as web dashboard
- [ ] JWT token storage (`shared_preferences`)
- [ ] Fetch today's tasks from backend
- [ ] Task display on home screen — same data as web
- [ ] Mark task complete from phone → syncs to web dashboard
- [ ] Error handling — offline mode (show cached tasks)

---

## Week 36: Notification System

### Tasks:
- [ ] `flutter_local_notifications` setup
- [ ] User configures focus schedule: e.g., "9am-11am is focus time"
- [ ] At start of focus time → notification fires: "Focus time! Task: [task name]"
- [ ] Notification shows task title and description
- [ ] Tap notification → opens Focus Screen full-screen
- [ ] Focus Screen shows: task details, Pomodoro timer, "Mark Done" button
- [ ] Background scheduling — works even when app is closed (`workmanager` package)
- [ ] Daily recap notification (9pm): "You completed X tasks today"
- [ ] Streak reminder if no tasks done by 8pm

---

## Week 37: App Blocking (Android)

### Tasks:
- [ ] Request permissions:
  - `PACKAGE_USAGE_STATS` — detect foreground app
  - `SYSTEM_ALERT_WINDOW` — overlay over other apps
  - `RECEIVE_BOOT_COMPLETED` — restart service on reboot
- [ ] App blocking service:
  - Foreground service (persistent, runs always during focus hours)
  - Every 500ms → check current foreground app
  - If app in blocked list → launch Focus Screen as overlay
  - Focus Screen cannot be dismissed — must acknowledge task
  - After acknowledgment → 5 minute grace period before re-blocking
- [ ] Blocked apps selection UI:
  - Shows all installed apps with icons
  - Toggle to add/remove from blocked list
  - Quick presets: "Social Media Pack" (Instagram, YouTube, Twitter, TikTok)
- [ ] Emergency override:
  - Hold screen for 5 seconds → enter PIN → bypass for 30 minutes
  - Override usage logged — shows in analytics as "overrides used"
- [ ] Focus schedule configuration:
  - Multiple time blocks per day (e.g., 9-11am and 2-4pm)
  - Different schedules per day of week

---

## Week 38: iOS Basics + App Polish

### Tasks:
- [ ] iOS note: Full app blocking NOT possible on iOS (Apple restriction)
- [ ] iOS alternative features:
  - Strong notifications (same scheduling as Android)
  - Focus Screen popup (can be dismissed — but shows task urgently)
  - Screen Time category configuration guide (help user set manually)
  - Widget for home screen — shows today's tasks
- [ ] Test thoroughly on Android emulator
- [ ] Test on real Android device (USB debugging)
- [ ] Fix all bugs from testing
- [ ] Polish animations and transitions
- [ ] App icon + splash screen

### Phase 5 Final Deliverable:
Android Focus App — blocks distracting apps during focus hours, shows task popup. iOS version with notifications + widget. Both sync with web dashboard.

---

---

# PHASE 6 — SAAS PREPARATION (Weeks 39-44)
**Goal: Transform personal app into a multi-user product**

---

## Week 39: Authentication System

### Tasks:
- [ ] Registration flow:
  - Email + password (bcrypt hash)
  - Email verification (SendGrid — free 100 emails/day)
  - Welcome email on verification
- [ ] Login with JWT (15min access + 7 day refresh — already built, now formalize)
- [ ] Password reset flow:
  - "Forgot password" → email with secure reset link (valid 1 hour)
  - Reset link → set new password
- [ ] Google OAuth (optional but recommended):
  - `passport-google-oauth20` package
  - "Continue with Google" button
- [ ] Account settings:
  - Change email (verify new email)
  - Change password
  - Delete account (GDPR — delete all user data)
  - Export all data as JSON

---

## Week 40: Multi-User Data Isolation

### Tasks:
- [ ] Audit ALL API endpoints — ensure every query has `userId` filter
- [ ] Middleware: automatically inject `req.userId` from JWT into every request
- [ ] Test data isolation: create 2 test users, verify neither can access other's data
- [ ] Rate limiting per userId (not just per IP)
- [ ] Admin panel (basic):
  - Total users count
  - Daily active users
  - AI API usage + cost
  - Flag problematic users

---

## Week 41: Payments (Razorpay)

### Tasks:
- [ ] Razorpay account setup (https://razorpay.com)
- [ ] Subscription plans:
  - Free plan limitations enforcement (10 tasks/day limit, no AI)
  - Pro plan: unlimited tasks, all AI features, full history
- [ ] Payment flow:
  - "Upgrade to Pro" button → Razorpay checkout modal
  - Payment success → update user plan in DB
  - Webhook: handle payment failure, subscription renewal
- [ ] Plan enforcement middleware:
  - Before AI endpoints → check if user is Pro
  - Before task creation if >10 today → check if Pro
  - Show upgrade prompt gracefully (not aggressive)
- [ ] Billing page:
  - Current plan display
  - Next billing date
  - Payment history
  - Cancel subscription flow

---

## Week 42: Email System + Notifications

### Tasks:
- [ ] SendGrid integration for transactional emails:
  - Welcome email (on signup)
  - Email verification
  - Password reset
  - Weekly productivity report email (AI-generated summary)
  - Streak broken email ("You broke your streak — come back!")
  - Achievement unlocked email
- [ ] HTML email templates — professional, branded
- [ ] Email preferences (user can unsubscribe from non-essential emails)
- [ ] Weekly report email:
  - Auto-generated every Monday morning
  - Tasks completed, goals progress, XP earned, streak status
  - AI-generated insights
  - Unsubscribe link (CAN-SPAM compliance)

---

## Week 43: Onboarding + Help System

### Tasks:
- [ ] Onboarding flow (new users):
  - Step 1: "What do you want to achieve?" (goal-setting)
  - Step 2: Set first 3 tasks (guided)
  - Step 3: Choose character class (RPG setup)
  - Step 4: Set focus schedule (for app blocking)
  - Step 5: "You're ready! Here's your first challenge"
- [ ] In-app help:
  - Tooltips on all features (first visit only)
  - "?" button on every page → contextual help
  - Video demos (future — link to YouTube)
  - FAQ page
- [ ] Changelog page — "What's New" so users see improvements
- [ ] Feedback button (every page) → form → goes to your email

---

## Week 44: Legal + Compliance

### Tasks:
- [ ] Privacy Policy page (write clearly in simple language):
  - What data is collected
  - How it's used
  - How to delete it
  - Contact information
- [ ] Terms of Service page
- [ ] Cookie policy (minimal — only essential cookies)
- [ ] GDPR compliance:
  - Data export endpoint (ZIP with all user data as JSON)
  - Account deletion (soft delete → hard delete after 30 days)
  - Consent on signup for email marketing
- [ ] Cookie consent banner (if using analytics)
- [ ] Security audit checklist:
  - [ ] No sensitive data in logs
  - [ ] All API keys in environment variables
  - [ ] MongoDB Atlas IP whitelist configured
  - [ ] HTTPS enforced
  - [ ] Rate limiting verified
  - [ ] SQL/NoSQL injection prevention verified

### Phase 6 Final Deliverable:
A production-ready multi-user SaaS product. Auth, payments, emails, legal all done. Ready to accept real paying users.

---

---

# PHASE 7 — LAUNCH (Weeks 45-48)
**Goal: Get first 100 users**

---

## Week 45: Infrastructure Setup

### Tasks:
- [ ] Production environment separate from development
- [ ] Environment variables management (Railway + Vercel secrets)
- [ ] Database backups:
  - MongoDB Atlas automated backups (daily)
  - Test restore procedure
- [ ] Monitoring:
  - Sentry — error tracking
  - UptimeRobot — 24/7 uptime monitoring (free)
  - Railway metrics — CPU, memory, request count
- [ ] Staging environment — test all changes here before production
- [ ] CI/CD pipeline:
  - GitHub → main branch push → auto deploy to Vercel (frontend)
  - GitHub → main branch push → Railway auto-deploy (backend)
- [ ] Custom domain setup (buy domain on GoDaddy/Namecheap, ~₹500/year)
- [ ] SSL certificate (auto via Vercel + Railway)

---

## Week 46: Beta Testing

### Tasks:
- [ ] Invite 5-10 beta testers (friends/family — serious ones)
- [ ] Create simple feedback form (Google Forms)
- [ ] Monitor for bugs — Sentry alerts
- [ ] Daily check: any errors, crashes, slow pages
- [ ] User interviews — ask beta testers:
  - What feature do you use most?
  - What confused you?
  - What's missing?
  - Would you pay ₹299/month?
- [ ] Fix top 5 bugs / UX issues from beta feedback
- [ ] Optimize AI prompts based on actual usage quality

---

## Week 47: Marketing Preparation

### Tasks:
- [ ] Landing page — separate from the app:
  - Hero section with product demo GIF/video
  - Features section (with actual screenshots)
  - Pricing section (Free + Pro)
  - Social proof (beta user quotes)
  - Email waitlist if launching gradually
- [ ] Product Hunt listing preparation:
  - Tagline, description, screenshots, demo video
  - Schedule launch day
- [ ] Twitter/X account for product
- [ ] Demo video (3 minutes max — screen recording with voiceover)
- [ ] SEO basics:
  - Page titles and meta descriptions
  - OG tags (for social sharing previews)
  - Sitemap.xml
- [ ] Referral system (optional but powerful):
  - Share link → friend signs up → both get 1 month Pro free

---

## Week 48: Launch Day

### Tasks:
- [ ] Product Hunt launch:
  - Post at midnight Pacific Time (US peak hours)
  - Personal network ko share karo — upvote karo
  - Respond to all comments
- [ ] Reddit posts:
  - r/productivity — "I built a productivity app with AI roast mode — check it out"
  - r/selfimprovement — "Built this to stop wasting my life"
  - r/webdev — "I built this full stack in X months as a beginner"
- [ ] Twitter/X thread — "I built ProductivityOS in 48 weeks starting from scratch"
- [ ] LinkedIn post — professional angle
- [ ] IndieHackers post — detailed build story
- [ ] Monitor signups + payments in real-time
- [ ] Have customer support ready (Crisp chat or WhatsApp)

---

---

# QUICK REFERENCE — TOOLS TO INSTALL WHEN

| When | Install |
|------|---------|
| Phase 0 Week 5 | Node.js, Postman, MongoDB Atlas account |
| Phase 1 Week 7 | VS Code, Git, all npm packages |
| Phase 1 Week 11 | FullCalendar npm |
| Phase 2 Week 15 | Anthropic SDK, get Claude API key |
| Phase 2 Week 19 | Cloudinary account (free tier) |
| Phase 5 Week 33 | Flutter SDK, Android Studio |
| Phase 6 Week 41 | Razorpay account, SendGrid account |
| Phase 7 Week 45 | UptimeRobot, custom domain |

---

# LEARNING RESOURCES — PHASE-WISE

| Phase | Best Resources |
|-------|---------------|
| 0 | react.dev, javascript.info, freecodecamp.org, tailwindcss.com/docs |
| 1 | React Router docs, FullCalendar docs, Recharts docs |
| 2 | docs.anthropic.com, Redis University (free) |
| 3 | Framer Motion docs, FullCalendar advanced, MongoDB Aggregation docs |
| 5 | flutter.dev/docs, pub.dev (Flutter packages) |
| 6 | Razorpay docs, SendGrid docs, GDPR checklist |

---

# BUDGET ESTIMATE — ALL PHASES

| Item | Cost |
|------|------|
| Phase 0-4 (building) | ₹0/month (all free tiers) |
| Domain name | ₹500/year |
| Claude API (testing) | ~₹500/month |
| Phase 7 (launch infra) | ~₹2,000/month |
| Total to launch | ~₹10,000 |

---

*Phase Plan End — ProductivityOS Development Roadmap v1.0*
