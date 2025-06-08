 Mentoons - Real-Time Chat Application

 Full-Stack Developer Assignment

This project is a real-time chat application built as part of the Mentoons Full-Stack Developer Assignment. It integrates robust user authentication, friend connections, real-time messaging, and moderation features.

---

 📌 Live Link
   http://mentoons.vercel.app



## 🧱 Tech Stack

### 🖥️ Frontend
- **React JS**
- **Tailwind CSS**
- **Axios**
- **Socket.IO Client**


### ⚙️ Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Socket.IO**
- **JWT Authentication**
- **Mongoose ODM**

---

## ✨ Features

### 🔐 Authentication
- Sign-up & Sign-in pages
- JWT-based authentication
- Secure route protection

### 👥 Friend Connections
- Send/accept friend requests
- View all connected users
- Block users and manage visibility

### 💬 Chat System
- Real-time messaging with Socket.IO
- Select user to initiate chat
- View chat history from MongoDB

### 🚫 Moderation
- Block users from messaging or seeing you


---

## 📁 Folder Structure

### Frontend (`/client`)

src/
├── components/
├── pages/ 
├── features/ 
├── utils/ 
├── store/
├── validations/
├── App.jsx
└── main.jsx

### Backend (`/server`)

server/
├── controllers/ # Route logic
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── services/ # Business logic
├── middlewares/ # Auth, error handlers, etc.
├── socket/ # Socket.IO handlers
└── server.js


---

## 📦 API Documentation

### Auth APIs
- POST /api/register → Register a user
- POST /api/login → Login and set auth cookie
- GET /api/logout → Logout and clear cookie

### Friend System
- POST /api/friends/request/:id → Send request
- POST /api/friends/accept/:id → Accept request
- GET /api/friends → Get all connections

### Chat & Moderation
- GET /api/messages/:receiverId → Fetch history
- POST /api/block/:userId → Block and unblock user
- POST /api/report/:userId → Report a user

### Notification
- GET /api/notifiction/:userId -> Get the notifications 

---

## ⚙️ Deployment

### Frontend (Vercel)
### Backedn (Rentder)

---------

