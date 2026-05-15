# ProductivityOS — Complete Deployment Guide
## Kahan Deploy Karo + Kaunse Accounts Banao

---

# PART 1: ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT MAP                              │
├─────────────────────┬───────────────────────────────────────────┤
│  WHAT               │  WHERE                                    │
├─────────────────────┼───────────────────────────────────────────┤
│  React Frontend     │  Vercel (Free → Pro)                      │
│  Node.js Backend    │  Railway (Free → Starter)                 │
│  MongoDB Database   │  MongoDB Atlas (Free → M10)               │
│  Redis Cache        │  Upstash (Free → Pay-as-you-go)           │
│  File Storage       │  Cloudinary (Free)                        │
│  Push Notifications │  Firebase (Free)                          │
│  Emails             │  SendGrid (Free 100/day)                  │
│  Domain             │  Namecheap / GoDaddy                      │
│  Android App        │  Google Play Store                        │
│  iOS App            │  Apple App Store                          │
│  Error Monitoring   │  Sentry (Free)                            │
│  Uptime Monitor     │  UptimeRobot (Free)                       │
└─────────────────────┴───────────────────────────────────────────┘
```

---

# PART 2: ACCOUNTS — BANANE WALE ACCOUNTS KI COMPLETE LIST

## Step 1 — Domain & Hosting (Pehle karo — sabse pehle)

### 1.1 Namecheap (Domain)
- URL: https://www.namecheap.com
- Kyun: Sabse sasta domain registrar India ke liye
- Kya karo:
  1. Account create karo
  2. Search karo: `productivityos.app` ya `productivityos.in` ya tumhara preferred name
  3. Buy karo — `.app` domain ~$14/year (~₹1,200), `.in` ~₹700/year
  4. DNS management access hoga yahan se
- Free alternatives: `.is-a.dev` (free subdomain agar abhi paise nahi lagane)
- Account mein save karo: username, password, domain name

### 1.2 Vercel (Frontend Hosting)
- URL: https://vercel.com
- Kyun: Best for React/Vite apps — free CDN, auto HTTPS, GitHub integration
- Kya karo:
  1. "Sign up with GitHub" karo (GitHub account pehle banao agar nahi hai)
  2. Free Hobby plan kaafi hai personal use ke liye
  3. Pro plan ($20/month) sirf SaaS launch ke time chahiye
- Free tier limits: Unlimited deployments, 100GB bandwidth/month, custom domains
- Account mein save karo: GitHub se connected — alag password nahi

### 1.3 Railway (Backend Hosting)
- URL: https://railway.app
- Kyun: Best Node.js hosting — easy, fast deploys, free tier available
- Kya karo:
  1. "Login with GitHub" karo
  2. Free tier: $5 credit/month (enough for ~500 hours)
  3. Starter plan: $5/month fixed — better for regular use
- Free tier limits: 512MB RAM, shared CPU, sleeps after inactivity
- Account mein save karo: GitHub se connected

---

## Step 2 — Database & Cache

### 2.1 MongoDB Atlas (Database)
- URL: https://cloud.mongodb.com
- Kyun: Official MongoDB cloud — free 512MB cluster
- Kya karo:
  1. Create account
  2. Create Organization: "ProductivityOS"
  3. Create Project: "production"
  4. Create Cluster: M0 (Free forever) → region: Mumbai (ap-south-1)
  5. Database User create karo: username + strong password — SAVE THIS
  6. Network Access: Add IP 0.0.0.0/0 (allow all — Railway IPs change hote hain)
  7. Get connection string: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
- Save karo: Connection string (ye backend mein MONGO_URI env variable banega)
- Upgrade path: M0 (Free) → M10 ($57/month) jab 100+ users ho

### 2.2 Upstash (Redis Cache)
- URL: https://upstash.com
- Kyun: Serverless Redis — free tier, pay per request
- Kya karo:
  1. Create account (GitHub se)
  2. Create Database: name "productivityos-cache", region "ap-southeast-1" (Singapore — closest to India)
  3. Type: Regional (not Global — cheaper)
  4. Get REST URL + Token
- Free tier: 10,000 requests/day, 256MB data
- Save karo: UPSTASH_REDIS_REST_URL aur UPSTASH_REDIS_REST_TOKEN

---

## Step 3 — Media & Files

### 3.1 Cloudinary (Image/File Storage)
- URL: https://cloudinary.com
- Kyun: Free image CDN — journal photos, profile pictures
- Kya karo:
  1. Create account
  2. Free tier: 25GB storage, 25GB bandwidth/month
  3. Dashboard se copy karo: Cloud Name, API Key, API Secret
- Save karo: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

---

## Step 4 — AI APIs

### 4.1 Groq (Primary AI)
- URL: https://console.groq.com
- Kyun: Fastest free AI inference — LLaMA 3.3 70B
- Kya karo:
  1. Create account
  2. API Keys → Create API Key → name "productivityos-prod"
  3. Free tier: 14,400 requests/day
- Save karo: GROQ_API_KEY

### 4.2 Google AI Studio (Gemini Fallback)
- URL: https://aistudio.google.com
- Kyun: Free fallback AI when Groq rate limited
- Kya karo:
  1. Google account se login
  2. "Get API Key" → Create API Key in new project
  3. Free tier: 1,500 requests/day, 1M tokens/minute
- Save karo: GEMINI_API_KEY

---

## Step 5 — Notifications & Communication

### 5.1 Firebase (Push Notifications + Auth)
- URL: https://console.firebase.google.com
- Kyun: Best push notifications for Flutter apps — free
- Kya karo:
  1. Google account se login
  2. Create Project: "productivityos"
  3. Enable products:
     - Authentication (Email/Password provider enable karo)
     - Cloud Messaging (FCM — for push notifications)
     - Crashlytics (for Flutter app crash reports)
     - Analytics (optional)
  4. Add Android App:
     - Package name: com.productivityos.app (ya tumhara chosen package)
     - Download google-services.json → flutter project ke android/app/ mein daalo
  5. Add iOS App:
     - Bundle ID: com.productivityos.app
     - Download GoogleService-Info.plist → flutter project ke ios/Runner/ mein daalo
  6. Server Key (for backend to send notifications):
     - Project Settings → Cloud Messaging → Server Key copy karo
- Save karo: FIREBASE_SERVER_KEY, project config

### 5.2 SendGrid (Transactional Emails)
- URL: https://sendgrid.com
- Kyun: Free 100 emails/day — enough for personal use + early SaaS
- Kya karo:
  1. Create account
  2. Verify sender email address
  3. Create API Key: Settings → API Keys → Full Access
  4. Free tier: 100 emails/day forever
- Save karo: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL

---

## Step 6 — Error & Uptime Monitoring

### 6.1 Sentry (Error Monitoring)
- URL: https://sentry.io
- Kyun: Catches errors in production before users report them
- Kya karo:
  1. Create account
  2. Create Organization: "productivityos"
  3. Create 2 projects:
     - "productivityos-web" (React — platform: React)
     - "productivityos-mobile" (Flutter — platform: Flutter)
  4. Get DSN URLs for each project
  5. Free tier: 5,000 errors/month
- Save karo: SENTRY_DSN_WEB, SENTRY_DSN_MOBILE

### 6.2 UptimeRobot (Uptime Monitoring)
- URL: https://uptimerobot.com
- Kyun: Free alerts when your server goes down
- Kya karo:
  1. Create account
  2. Add monitors (after deployment):
     - Frontend: https://productivityos.app
     - Backend API: https://api.productivityos.app/health
  3. Alert contacts: your email + phone (SMS)
  4. Free tier: 50 monitors, 5-minute checks
- Setup: Deployment ke baad karo

---

## Step 7 — Mobile App Distribution

### 7.1 Google Play Console (Android)
- URL: https://play.google.com/console
- Kyun: Official Android app distribution
- Kya karo:
  1. Google account se login
  2. One-time developer fee: $25
  3. Create developer account (takes 2-3 days for approval)
  4. Create app: "ProductivityOS"
  5. Internal testing pehle, phir production
- Save karo: Developer account credentials, keystore file (NEVER LOSE THIS)
- Important: Keystore file backup rakho — iske bina app update nahi kar sakte

### 7.2 Apple Developer Account (iOS — Optional, Later)
- URL: https://developer.apple.com
- Annual fee: $99/year (~₹8,200)
- Recommend: Android pehle launch karo, iOS baad mein
- Agar iOS chahiye toh account create karo 2-3 weeks pehle (approval time lagta hai)

---

## Step 8 — Payments (SaaS Launch Time)

### 8.1 Razorpay (Indian Payments)
- URL: https://razorpay.com
- Kyun: Best for India — UPI, cards, netbanking sab support
- Kya karo (SaaS phase mein):
  1. Business account create karo
  2. KYC complete karo (Aadhaar + PAN)
  3. Test mode mein develop karo — free
  4. Live mode: 2% transaction fee
- Save karo: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

---

# PART 3: ENVIRONMENT VARIABLES — COMPLETE LIST

## Backend (.env)

```bash
# === SERVER ===
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://productivityos.app

# === DATABASE ===
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/productivityos

# === REDIS (Upstash) ===
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxxxxxxxxxxxxxxxx

# === AUTH ===
JWT_SECRET=your_super_long_random_secret_min_64_chars
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=another_super_long_random_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# === AI ===
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxxx
AI_DAILY_LIMIT=50
AI_CACHE_TTL=3600

# === FILE STORAGE ===
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# === EMAIL ===
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=hello@productivityos.app
SENDGRID_FROM_NAME=ProductivityOS

# === FIREBASE (Push Notifications) ===
FIREBASE_SERVER_KEY=AAAAxxxxxxxxxxxxxxx
FIREBASE_PROJECT_ID=productivityos

# === MONITORING ===
SENTRY_DSN=https://xxxxx@o0.ingest.sentry.io/0

# === PAYMENTS (SaaS phase) ===
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
```

## Frontend (.env.production)

```bash
VITE_API_URL=https://api.productivityos.app
VITE_APP_NAME=ProductivityOS
VITE_SENTRY_DSN=https://xxxxx@o0.ingest.sentry.io/0
```

## Flutter (dart-define or .env via flutter_dotenv)

```bash
API_BASE_URL=https://api.productivityos.app
SENTRY_DSN=https://xxxxx@o0.ingest.sentry.io/0
```

---

# PART 4: STEP-BY-STEP DEPLOYMENT

## Phase A: Backend Deploy (Railway)

```bash
# Step 1: GitHub pe push karo
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourusername/productivityos-backend
git push -u origin main

# Step 2: Railway mein
# 1. railway.app → New Project
# 2. Deploy from GitHub → select repo
# 3. Add environment variables (PART 3 se sab)
# 4. Add custom domain: api.productivityos.app
#    → Railway domain mein CNAME record add karo Namecheap mein

# Step 3: Verify
curl https://api.productivityos.app/health
# Expected: { "status": "ok", "timestamp": "..." }
```

## Phase B: Frontend Deploy (Vercel)

```bash
# Step 1: Vercel CLI install
npm install -g vercel

# Step 2: Project root se
cd frontend
vercel

# OR: Vercel dashboard se GitHub connect karo (easier)
# 1. vercel.com → Import Project → GitHub repo
# 2. Framework: Vite
# 3. Build Command: npm run build
# 4. Output Directory: dist
# 5. Environment Variables add karo

# Step 3: Custom domain add
# Vercel dashboard → Domains → Add productivityos.app
# Namecheap mein A record: 76.76.21.21 (Vercel IP)
```

## Phase C: MongoDB Atlas Setup

```bash
# Connection string format:
mongodb+srv://productivityos_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/productivityos?retryWrites=true&w=majority

# Test connection locally pehle:
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/productivityos" --username productivityos_user

# Indexes create karo (important for performance):
# Ye backend startup pe automatically create ho — seedData.js mein likho
```

## Phase D: Flutter App — Android Build

```bash
# Step 1: Signing setup (ONE TIME — store this safely)
keytool -genkey -v -keystore productivityos.keystore \
  -alias productivityos -keyalg RSA -keysize 2048 -validity 10000
# SAVE: productivityos.keystore file + password

# Step 2: key.properties file banao (android/ folder mein)
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=productivityos
storeFile=../../productivityos.keystore

# Step 3: .gitignore mein add karo:
*.keystore
key.properties

# Step 4: Release APK build
flutter build apk --release --dart-define=API_BASE_URL=https://api.productivityos.app

# Step 5: App Bundle (Play Store ke liye preferred)
flutter build appbundle --release --dart-define=API_BASE_URL=https://api.productivityos.app

# Output: build/app/outputs/bundle/release/app-release.aab
```

## Phase E: Play Store Upload

```
1. play.google.com/console → Create app
2. App name: ProductivityOS
3. Default language: Hindi (hi) ya English (en)
4. App type: App (not Game)
5. Free or Paid: Free (pehle)

Required before publishing:
□ App icon: 512x512 PNG
□ Feature graphic: 1024x500 PNG
□ Screenshots: min 2, recommended 8 (phone)
□ Short description: max 80 chars
□ Full description: max 4000 chars
□ Privacy Policy URL (required for apps with user data)
□ Content rating questionnaire fill karo
□ Data safety form fill karo

Upload flow:
1. Internal testing → add yourself as tester
2. Test thoroughly → Fix bugs
3. Closed testing → small group
4. Production → public
```

---

# PART 5: DNS CONFIGURATION (Namecheap)

```
Domain: productivityos.app

DNS Records to add:

TYPE    NAME    VALUE                   TTL
A       @       76.76.21.21             Automatic  ← Vercel (frontend)
CNAME   www     cname.vercel-dns.com    Automatic  ← Vercel www redirect
CNAME   api     your-app.up.railway.app Automatic  ← Railway (backend)

Wait 24-48 hours for DNS propagation.
Check with: https://dnschecker.org
```

---

# PART 6: CI/CD PIPELINE

## GitHub Actions — Auto Deploy

```yaml
# .github/workflows/deploy.yml

name: Deploy ProductivityOS

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: cd backend && npm ci

      - name: Run tests
        run: cd backend && npm test

      - name: Deploy to Railway
        uses: bervproject/railway-deploy@v1.1.0
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: productivityos-backend

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./frontend
```

GitHub Secrets add karo (Settings → Secrets):
- RAILWAY_TOKEN (Railway dashboard se)
- VERCEL_TOKEN (Vercel dashboard → Settings → Tokens)
- VERCEL_ORG_ID (Vercel project settings)
- VERCEL_PROJECT_ID (Vercel project settings)

---

# PART 7: COST BREAKDOWN

## Phase 1 — Personal Use (₹0/month)

```
Vercel:        Free (Hobby plan)
Railway:       Free ($5 credit — ~500 hours)
MongoDB Atlas: Free (M0 — 512MB)
Upstash:       Free (10K req/day)
Cloudinary:    Free (25GB)
Firebase:      Free
SendGrid:      Free (100 emails/day)
Sentry:        Free (5K errors/month)
UptimeRobot:   Free
Groq AI:       Free (14.4K req/day)
Gemini AI:     Free (1.5K req/day)
─────────────────────────────────
TOTAL:         ₹0/month
               + Domain: ~₹700-1200/year
```

## Phase 2 — Early SaaS (< 100 users) (~₹4,000/month)

```
Vercel Pro:    $20/month  (~₹1,700)
Railway:       $5/month   (~₹420)
MongoDB M10:   $57/month  (~₹4,800)
Upstash:       ~$5/month  (~₹420)
SendGrid:      Free still
─────────────────────────────────
TOTAL:         ~$87/month (~₹7,300)
Break-even at: 25 Pro users @ ₹299/month = ₹7,475
```

## Phase 3 — Scale (1,000+ users) (~₹25,000/month)

```
Vercel Pro:    $20/month
Railway:       $20/month  (multiple services)
MongoDB M30:   $200/month (~₹17,000)
Upstash:       $20/month
SendGrid Ess:  $20/month  (40K emails)
─────────────────────────────────
TOTAL:         ~$280/month (~₹23,000)
Break-even at: 80 Pro users @ ₹299/month
```

---

# PART 8: HEALTH CHECK ENDPOINT

```javascript
// server/routes/health.js
router.get('/health', async (req, res) => {
  const checks = {
    server: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: 'checking',
    redis: 'checking',
  };

  try {
    await mongoose.connection.db.admin().ping();
    checks.mongodb = 'ok';
  } catch (e) {
    checks.mongodb = 'error';
  }

  try {
    await redis.ping();
    checks.redis = 'ok';
  } catch (e) {
    checks.redis = 'error';
  }

  const allOk = checks.mongodb === 'ok' && checks.redis === 'ok';
  res.status(allOk ? 200 : 503).json(checks);
});
```

UptimeRobot monitor URL: `https://api.productivityos.app/health`

---

# PART 9: QUICK REFERENCE — ACCOUNT CREATION ORDER

```
PRIORITY 1 (Aaj karo — free, setup ke liye chahiye):
□ GitHub account (https://github.com)
□ MongoDB Atlas (https://cloud.mongodb.com)
□ Upstash Redis (https://upstash.com)
□ Groq API (https://console.groq.com)
□ Google AI Studio / Gemini (https://aistudio.google.com)
□ Firebase Console (https://console.firebase.google.com)
□ Cloudinary (https://cloudinary.com)
□ SendGrid (https://sendgrid.com)

PRIORITY 2 (Jab deploy karne wale ho):
□ Vercel (https://vercel.com) — GitHub se sign up
□ Railway (https://railway.app) — GitHub se sign up
□ Sentry (https://sentry.io)
□ UptimeRobot (https://uptimerobot.com)

PRIORITY 3 (App launch ke liye):
□ Namecheap domain (https://namecheap.com) — ~₹700-1200
□ Google Play Console (https://play.google.com/console) — $25 one-time

PRIORITY 4 (SaaS launch ke liye):
□ Razorpay Business (https://razorpay.com) — KYC required
□ Apple Developer (https://developer.apple.com) — $99/year (optional)
```

---

# PART 10: BACKUP STRATEGY

```bash
# MongoDB Atlas: Automatic daily backups (free on M10+)
# For M0 (free tier): Manual backup weekly
mongodump --uri="mongodb+srv://..." --out=backup_$(date +%Y%m%d)

# Keystore file (Android signing):
# Store in: Google Drive + USB drive + printed paper
# If lost: CANNOT update app on Play Store

# Environment variables:
# Store in: Password manager (Bitwarden — free)
# Never in code, never in git

# Source code:
# GitHub (already handled by pushing)
# Private repo → Settings → make private
```

---

*Deployment Guide End — ProductivityOS v1.0*
*Estimated setup time: 4-6 hours (first time)*
*All free tier limits are as of 2025 — verify before use*
