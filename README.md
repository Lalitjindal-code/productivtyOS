# 🚀 ProductivityOS — Your AI-Powered Productivity Command Center

ProductivityOS is an intelligent productivity platform built to optimize focus, execution, and personal growth through AI-driven insights and automation. Powered primarily by Groq’s ultra-fast inference engine and backed by Google Gemini as a fallback layer, ProductivityOS delivers a seamless, responsive, and highly personalized experience.

Designed for creators, students, developers, and high performers, the platform combines task management, behavioral analytics, conversational AI, and productivity coaching into a single ecosystem.

---

# ✨ Core Features

### 🧠 AI Memory Engine
Personalized AI memory system that adapts to your workflow, remembers context, and delivers smarter recommendations over time.

### 🔥 Roast Mode
Brutally honest AI feedback that exposes procrastination patterns, productivity gaps, and wasted time — pushing users toward accountability and action.

### 📊 Productivity DNA Analytics
Advanced behavioral analysis that uncovers work habits, focus patterns, strengths, weaknesses, and performance trends.

### ⚡ Ultra-Fast AI Responses
Built on Groq’s high-speed inference architecture for near-instant AI interactions and real-time productivity assistance.

### 🛡️ Intelligent Failover System
Automatic fallback to Google Gemini ensures uninterrupted AI availability and platform reliability.

### 🔐 Secure & Scalable Infrastructure
Integrated with Redis for caching and rate limiting, and MongoDB with Mongoose for efficient, scalable data handling.

---

# 🛠️ Tech Stack

## Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS / Vanilla CSS
- **Animations:** Framer Motion

## Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Caching & Rate Limiting:** Redis
- **AI Providers:** Groq (Llama 3), Google Gemini

---

# 🚀 Getting Started

## Prerequisites

Before running the project, ensure you have:

- Node.js (v18 or later)
- MongoDB
- Redis

---

## Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd productivityOS
```

---

### 2️⃣ Configure Backend

```bash
cd server
npm install
```

Create a `.env` file using `.env.example` as reference, then start the backend server:

```bash
npm start
```

---

### 3️⃣ Configure Frontend

```bash
cd ../frontend
npm install
```

Create the frontend `.env` file and start the development server:

```bash
npm run dev
```

---

# 📂 Project Structure

```bash
productivityOS/
│
├── frontend/        # React + Vite frontend
├── server/  # Express.js backend services
├── mobile_app/
├── docs/            # Documentation and resources
├── .gitignore       # Git ignore configuration
└── README.md
```

---

# 🛡️ Security Best Practices

Sensitive credentials such as API keys and database URLs are managed through environment variables.

```bash
.env
```

files are automatically excluded using `.gitignore`.

⚠️ Never expose or commit secret keys to public repositories.

---

# 🌟 Vision

ProductivityOS is more than a task manager — it’s an AI-driven execution system built to help users eliminate distractions, understand their behavioral patterns, and operate at a higher level consistently.

---

# 📄 License

Licensed under the ISC License.
