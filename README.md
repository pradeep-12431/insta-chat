# 📱 InstaChat - Real-Time Chat App

InstaChat is a full-stack real-time chat application inspired by popular messaging platforms like WhatsApp and Instagram. It allows users to register, log in, and send messages instantly using Socket.IO. Users can also upload a profile photo and have their chats displayed in a clean and modern UI.

---

## 🚀 Features

- ✅ Real-time messaging using **Socket.IO**
- 🔐 User authentication with **JWT**
- 🧾 Secure password storage with **bcrypt**
- 🖼️ Profile photo support
- 🗂️ MongoDB database integration
- 💬 Clean and responsive chat UI (React)
- 🌐 RESTful API (Node.js + Express)

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React.js | Node.js + Express | MongoDB (Mongoose) |
| Socket.IO | JWT Authentication | MongoDB Atlas |
| Axios | CORS | dotenv |

---

## 🧑‍💻 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/pradeep-12431/insta-chat.git
cd insta-chat
cd server
npm install
#CREATE .ENV FILE
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5001
