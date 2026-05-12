# 🚀 ProductivityOS

ProductivityOS is a high-performance, AI-driven productivity platform designed to streamline your workflow. It leverages the power of **Groq** (primary) and **Google Gemini** (fallback) to provide intelligent features like task quizzes, roast mode, productivity DNA reporting, and conversational AI assistance.

---

## ✨ Features

- **🧠 AI Memory Service**: Persistent AI memory for a personalized experience.
- **🔥 Roast Mode**: Get a productivity reality check with AI-powered roasts.
- **📊 Productivity DNA**: Deep insights into your work habits and patterns.
- **⚡ High Performance**: Built with Groq's lightning-fast inference.
- **🛡️ Resilient Architecture**: Seamless fallback to Google Gemini for 100% uptime.
- **🔐 Secure & Scalable**: Integrated with Redis for rate limiting and Mongoose for robust data management.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS / Tailwind CSS
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Caching**: Redis
- **AI Engines**: Groq (Llama 3), Google Gemini

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Redis

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd productivityOS
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

---

## 📂 Project Structure

```
├── frontend/          # React + Vite application
├── server/            # Node.js + Express backend
├── docs/              # Project documentation
└── .gitignore         # Consolidated git ignore rules
```

---

## 🛡️ Security Note

This project uses environment variables (`.env`) for sensitive API keys. **Never commit your `.env` files.** The repository is configured to ignore them automatically.

---

## 📄 License

This project is licensed under the ISC License.
