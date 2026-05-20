# Phase 5 — New Features to Add (Priority: MEDIUM 🟡)

> **Estimated Time:** 14-20 days
> **Dependencies:** Phase 1, 2, 3 complete hone chahiye

---

## 🆕 New Features List

### Feature #1 — Daily Challenge System

**What:** Every day AI generate kare ek unique challenge
**Example:** "Complete 3 high-priority tasks before 3 PM" or "Write journal entry + 1 workout"
**Reward:** Bonus XP + special badge

**Backend:**
- New model: `DailyChallenge.js`
- Cron job: Every midnight naya challenge generate kare
- AI se challenge ideas generate ho based on user's weak points

**Frontend (Website):**
```jsx
// Dashboard pe add karo:
const DailyChallengeCard = () => (
  <Card className="p-6 border border-yellow-500/20 bg-yellow-500/5">
    <h3>⚡ Today's Challenge</h3>
    <p>{challenge?.title}</p>
    <ProgressBar value={challenge?.progress} max={challenge?.target} />
    <span>+{challenge?.xpReward} XP reward</span>
  </Card>
);
```

**Mobile:**
- Home screen pe prominently show karo
- Reminder notification at 9 AM
- Completion animation with XP burst

---

### Feature #2 — Habit Tracker

**What:** Daily habits track karo (ye tasks se alag hai)
**Examples:** Drink water 8 glasses, Meditate 10 min, Read 30 pages, Sleep by 11 PM

**Backend:**
- New model: `Habit.js`
- Daily completion tracking
- Streak per habit
- Analytics: completion rate over 30 days

**Schema:**
```javascript
const habitSchema = new mongoose.Schema({
  userId: String,
  title: String,           // "Drink 8 glasses of water"
  icon: String,            // Emoji
  frequency: String,       // 'daily', 'weekdays', 'custom'
  customDays: [Number],    // [1,2,3,4,5] = Mon-Fri
  targetCount: Number,     // Times per day (default 1)
  currentStreak: Number,
  longestStreak: Number,
  totalCompletions: Number,
  completions: [{          // Log of completions
    date: Date,
    count: Number
  }]
});
```

**Website UI:**
- New page: `/habits` in sidebar
- Habit grid with checkmark animation
- Streak display per habit
- Weekly heatmap per habit
- Quick add habit modal

**Mobile:**
- Home screen widget showing today's habits
- Quick check-off from home screen
- Reminder per habit at custom time

---

### Feature #3 — Social/Friends System (Light Version)

**What:** Friends add karo, ek doosre ki streaks dekho, compete karo
**Not full social media — sirf motivational**

**Features:**
- Friend invite via link/code
- Friends' streak leaderboard
- "Poke" feature (push notification to remind friend)
- Compare weekly completion rates
- Privacy: Share only what you want

**Backend:**
- Add `friends: [{ userId, addedAt }]` to User model
- New routes: `/api/user/friends`, `/api/user/invite`
- Leaderboard query

**Privacy controls:**
- "Public", "Friends only", "Private" toggle for each section
- By default everything private

---

### Feature #4 — AI Daily Briefing

**What:** Every morning, AI brief kare — "Aaj ka plan, kya priority hai, weather, motivational message"

**Backend:**
- New route: `GET /api/ai/morning-briefing`
- Generate based on: today's tasks, goals progress, streak status, pending items
- Cache for the day

**Frontend:**
```jsx
// Show on Dashboard on first visit each day:
const MorningBriefingModal = ({ briefing }) => (
  <Modal>
    <div className="text-center mb-6">
      <div className="text-4xl mb-2">☀️</div>
      <h2>Good Morning, {user.displayName}!</h2>
    </div>
    <div className="space-y-4">
      <BriefingSection title="Today's Priority" content={briefing.topPriority} />
      <BriefingSection title="Streak Status" content={briefing.streakStatus} />
      <BriefingSection title="AI Tip" content={briefing.tip} />
    </div>
    <Button onClick={dismiss}>Let's Go! 🚀</Button>
  </Modal>
);
```

**Mobile:**
- Show as notification at 7 AM
- Tap opens app to briefing

---

### Feature #5 — Pomodoro Statistics Deep Dive

**What:** Timer page pe detailed pomodoro analytics

**Current:** Just counts sessions
**New Features:**
- Total focus time this week/month
- Best focus day/time
- Average session length
- Task completion per session
- Focus score (sessions vs interruptions)
- Comparison with last week

**Backend:**
- Update `PomodoroSession` model with more fields
- New route: `GET /api/pomodoro/analytics`

**Frontend:**
```jsx
// In Timer.jsx - add stats panel:
const PomodoroStats = () => (
  <div className="grid grid-cols-2 gap-4">
    <StatCard title="Focus Time Today" value="2h 30m" />
    <StatCard title="Sessions Completed" value="6" />
    <StatCard title="Best Focus Day" value="Tuesday" />
    <StatCard title="This Week" value="12h 45m" />
    <FocusTimeChart data={weeklyData} />
  </div>
);
```

---

### Feature #6 — Body Metrics Tracker (Gym Enhancement)

**What:** Weight, body measurements track karo over time

**New Fields in User/Gym model:**
```javascript
bodyMetrics: [{
  date: Date,
  weight: Number,      // in kg
  bodyFat: Number,     // percentage (optional)
  chest: Number,       // cm
  waist: Number,
  hips: Number,
  arms: Number,
  legs: Number,
}]
```

**Website — New section in Gym page:**
- Weekly weigh-in chart
- Body measurements tracker
- Progress photos (before/after grid)
- Body fat % trend

**Mobile — Quick weight log:**
- FAB in Gym screen
- Simple number input
- Line chart showing progress

---

### Feature #7 — Mood Tracker Integration

**What:** Daily mood log karo aur productivity ke saath correlate karo

**Moods:** 😊 Great, 😐 Okay, 😔 Low, 😤 Stressed, 😴 Tired

**Where to add:**
- Journal page — mood before entry
- Dashboard — quick mood check-in
- Analytics — mood vs productivity correlation

**AI Feature:** "When you're stressed, you complete fewer tasks but longer ones" type insights

---

### Feature #8 — Weekly/Monthly Reports (Email)

**What:** Automatic PDF/email report every Sunday

**Content:**
- This week's stats vs last week
- Top achievements
- Streak status
- AI analysis
- Next week suggestions

**Backend:**
- Node-cron: Every Sunday at 8 PM
- Generate HTML report
- Send via Nodemailer

```javascript
// In server: setup cron
const cron = require('node-cron');
const { generateWeeklyReport } = require('./services/reportService');

cron.schedule('0 20 * * 0', async () => {  // Sunday 8 PM
  const users = await User.find({ 
    'settings.notifications.weeklyReport': true 
  });
  for (const user of users) {
    await generateWeeklyReport(user);
  }
});
```

---

### Feature #9 — Achievements System (Complete)

**Current:** `achievements` array exists in User model but nothing awards them

**Implement proper achievement system:**

```javascript
// server/services/achievementService.js - complete it:

const ACHIEVEMENTS = {
  FIRST_TASK: {
    id: 'first_task',
    title: 'Baby Steps',
    description: 'Complete your first task',
    icon: '✅',
    xpReward: 50
  },
  STREAK_7: {
    id: 'streak_7',
    title: 'Week Warrior',
    description: '7 day streak',
    icon: '🔥',
    xpReward: 200
  },
  STREAK_30: {
    id: 'streak_30',
    title: 'Iron Discipline',
    description: '30 day streak',
    icon: '⚡',
    xpReward: 1000
  },
  LEVEL_5: {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    xpReward: 300
  },
  BOSS_FIRST: {
    id: 'boss_first',
    title: 'Dragon Slayer',
    description: 'Defeat your first boss (complete a goal)',
    icon: '🐉',
    xpReward: 500
  },
  GYM_10: {
    id: 'gym_10',
    title: 'Gym Rat',
    description: 'Log 10 workouts',
    icon: '💪',
    xpReward: 300
  },
  JOURNAL_7: {
    id: 'journal_7',
    title: 'Storyteller',
    description: '7 consecutive journal entries',
    icon: '📖',
    xpReward: 200
  },
  FOCUS_100: {
    id: 'focus_100',
    title: 'Zen Master',
    description: 'Complete 100 Pomodoro sessions',
    icon: '🧘',
    xpReward: 500
  },
  TASKS_100: {
    id: 'tasks_100',
    title: 'Task Machine',
    description: 'Complete 100 tasks',
    icon: '🤖',
    xpReward: 500
  }
};

// Check and award achievements after each action:
exports.checkAndAward = async (userId, trigger) => {
  const user = await User.findOne({ userId });
  const unlockedIds = user.achievements.map(a => a.id);
  const newAchievements = [];
  
  for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
    if (unlockedIds.includes(achievement.id)) continue; // Already unlocked
    
    const shouldAward = await checkCondition(userId, trigger, key, user);
    if (shouldAward) {
      user.achievements.push({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        unlockedAt: new Date()
      });
      user.totalXP += achievement.xpReward;
      newAchievements.push(achievement);
    }
  }
  
  if (newAchievements.length > 0) {
    await user.save();
    // Emit achievement events
    newAchievements.forEach(a => {
      emitToUser(userId, events.ACHIEVEMENT_UNLOCKED, a);
    });
  }
  
  return newAchievements;
};
```

**Website — Achievement unlock animation:**
```jsx
// AchievementToast component:
const AchievementToast = ({ achievement }) => (
  <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
    <div className="text-4xl">{achievement.icon}</div>
    <div>
      <div className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
        Achievement Unlocked!
      </div>
      <div className="text-white font-bold">{achievement.title}</div>
      <div className="text-neutral-400 text-xs">{achievement.description}</div>
    </div>
  </div>
);
```

---

### Feature #10 — Workout Plan Templates

**What:** Pre-built workout plans select karo (Push/Pull/Legs, Full Body, etc.)

**Plans library:**
```javascript
const WORKOUT_PLANS = {
  ppl: {
    name: 'Push/Pull/Legs',
    schedule: {
      Monday: 'Push',
      Tuesday: 'Pull',
      Wednesday: 'Legs',
      Thursday: 'Push',
      Friday: 'Pull',
      Saturday: 'Legs',
      Sunday: 'Rest'
    },
    exercises: { /* per day exercises */ }
  },
  fullBody3: {
    name: 'Full Body 3x Week',
    // ...
  }
};
```

**Website:** Template picker in GymPlanEditor
**Mobile:** Onboarding step "Choose a starting plan"

---

## 📋 Feature Priority Order

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 🔴 Must Have | Achievement System (complete) | 2 days | Very High |
| 🔴 Must Have | Daily Challenge | 2 days | High |
| 🟠 High | Habit Tracker | 4 days | High |
| 🟠 High | AI Daily Briefing | 2 days | Medium |
| 🟠 High | Pomodoro Stats Deep Dive | 2 days | Medium |
| 🟡 Medium | Body Metrics Tracker | 2 days | Medium |
| 🟡 Medium | Mood Tracker | 2 days | Medium |
| 🟡 Medium | Workout Templates | 1 day | Medium |
| 🟢 Nice to Have | Weekly Reports Email | 2 days | Medium |
| 🟢 Nice to Have | Friends/Social | 5 days | Low (complex) |
