# Event Engagement Website

A functional prototype of an Event Engagement Web Platform that allows attendees to join via QR code, participate in a quiz, and view scores in real-time. The admin panel displays participants, quiz results, and the winner.

---

## **📌 Objective**

Build a web application where attendees can:
- Scan a QR code to join an event.
- Register with Name, Email, and Company (optional).
- Participate in a quiz (one question at a time).
- View live scores and final results.

Admins can:
- Start the quiz and move through questions.
- End the quiz and announce winners.
- View all participant scores in real-time.

---

## **🛠 Tech Stack**

**Frontend:**
- React.js + Vite
- Axios
- React Router
- Socket.io-client

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.io

**Deployment:**
- Frontend: Netlify / Vercel
- Backend: Render / Railway / Heroku

---

## **🚀 Live Demo**

- Frontend: [Your Frontend Deployment Link]  
- Backend: [Your Backend Deployment Link]

**Admin Login:**
- Email: `admin@event.com`  
- Password: `admin123`

---

## **💻 Local Setup**

### **Backend**

1. Navigate to backend folder:
   ```bash
   cd backend

   Install dependencies:

npm install


Create .env file with:

MONGO_URI=<Your MongoDB URI>
JWT_SECRET=supersecret


Seed initial admin and quiz questions:

node seed.js


Start server:

node server.js


Server runs at http://localhost:5005

Frontend

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Start development server:

npm run devs


App runs at http://localhost:5173

Make sure frontend API URLs point to your backend:

const API_URL = "http://localhost:5005";

📐 Architecture Overview
[Attendee Browser] --(HTTP / WebSocket)--> [Frontend React App]
                                              |
                                              v
                                     [Backend Express API]
                                              |
                                              v
                                      [MongoDB Database]


Admin controls quiz via Admin Panel.

Attendees submit answers; backend calculates scores.

Live updates are sent via Socket.io.

🎯 Features
Attendee Flow

Landing page with QR code.

Registration form: Name, Email, Company.

Quiz interface (one question at a time, real-time updates).

Auto-navigation between questions.

Quiz Functionality

Minimum 5 multiple-choice questions.

Answers stored in backend with scores.

Optional timer per question (bonus feature).

Admin Panel

Secure login with JWT.

Dashboard shows all participants and live scores.

Start quiz, move to next question, end quiz.

Auto-calculation and announcement of winner.

Real-Time Updates

Live question updates to all attendees.

Live score updates in Admin Panel.

📂 Project Structure
event-engagement/
├── backend/
│   ├── models/        # MongoDB models (User, Admin, Question, QuizState)
│   ├── routes/        # API routes (auth, users, quiz)
│   ├── server.js      # Backend entry point
│   ├── seed.js        # Seed initial data
│   └── package.json
├── frontend/
│   ├── src/           # React app source code
│   ├── vite.config.js
│   └── package.json
└── README.md

⚡ Notes

Ensure MongoDB is running and accessible.

Admin must login first to start the quiz.

Socket.io handles real-time communication for questions and scores.
