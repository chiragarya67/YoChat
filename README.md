# 🗨️ YoChat

YoChat is a full-stack real-time chat application built with Node.js, Express, MongoDB, and a modern frontend stack. Designed for scalability, clean architecture, and secure communication.

## 🚀 Features

- 🔐 Secure authentication with JWT & cookies
- 💬 Real-time messaging with socket.io
- 🧠 MongoDB integration with Mongoose
- 🎨 Responsive frontend (React or your preferred stack)
- 🌐 Deployed backend on Render, frontend on Vercel

## 📁 Project Structure

\`\`\`
YoChat/
├── backend/       # Express server, routes, controllers, DB config
├── frontend/      # React app or frontend stack
└── README.md      # You're reading it!
\`\`\`

## 🛠️ Tech Stack

| Layer      | Tech Used              |
|------------|------------------------|
| Backend    | Node.js, Express.js    |
| Database   | MongoDB, Mongoose      |
| Auth       | JWT, Cookies           |
| Frontend   | React (or your stack)  |
| Realtime   | Socket.io              |
| Deployment | Render (backend), Vercel (frontend) |

## ⚙️ Setup Instructions

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/chiragarya67/YoChat.git
cd YoChat
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### 3. Frontend Setup

\`\`\`bash
cd ../frontend
npm install
npm start
\`\`\`

### 4. Deployment Notes

- Backend: [Render](https://render.com/)
- Frontend: [Vercel](https://vercel.com/)
- Ensure .env files are configured correctly and .gitignore excludes them.


## 🧠 Developer Notes

- Clean Git setup with .gitignore configured
- Modular folder structure for scalability
- Retry logic for MongoDB connection
- Open to contributions and feedback!

## 📢 Connect

Made with ❤️ by [Chirag Arya](https://github.com/chiragarya67). Follow my dev journey on [LinkedIn](https://www.linkedin.com/in/chirag-a-79382a302/) and stay tuned for updates!
EOF
