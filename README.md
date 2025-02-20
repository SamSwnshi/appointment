# 🏥 Samswnshi Appointment System  

## 📌 Introduction  

Appointment System is a full-stack web application that allows users to book, manage, and track medical appointments. The application provides authentication, doctor listings, and appointment scheduling functionalities.  

The project is divided into two main parts:  

- **Client (Frontend):** Built with React and Vite.  
- **Server (Backend):** Built with Node.js, Express, and MongoDB.  

---

## 📖 Table of Contents  

- [Introduction](#-introduction)  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Project Structure](#-project-structure)  
- [Configuration](#-configuration)  
- [API Endpoints](#-api-endpoints)  
- [Troubleshooting](#-troubleshooting)  
- [Contributors](#-contributors)  
- [License](#-license)  

---

## ✨ Features  

✅ User Authentication (Signup/Login)  
✅ Book and Manage Appointments  
✅ View Available Doctors and Their Slots  
✅ Calendar-Based Slot Selection  
✅ Protected Routes for Authentication  
✅ RESTful API with Express.js  
✅ MongoDB Database Integration  

---

## 🛠 Tech Stack  

### **Frontend (Client)**  
- **React** with Vite  
- **React Router**  
- **CSS Modules**  
- **ESLint**  

### **Backend (Server)**  
- **Node.js**  
- **Express.js**  
- **MongoDB (Mongoose ORM)**  
- **JWT Authentication**  
- **Bcrypt.js for password hashing**  

---

## ⚡ Installation  

### **Prerequisites**  
Ensure you have the following installed:  
- **Node.js (>=14.x)**  
- **MongoDB** (or a MongoDB Atlas account)  

### **Setup Instructions**  

#### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-repo/samswnshi-appointment.git
cd samswnshi-appointment
```

#### 2️⃣ Install Dependencies  

##### Client  
```sh
cd client
npm install
```

##### Server  
```sh
cd ../server
npm install
```

#### 3️⃣ Set Up Environment Variables  

- Create a `.env` file inside both `client/` and `server/` directories and add the necessary configuration values.  

##### Server `.env` Example  
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

##### Client `.env` Example  
```
VITE_API_BASE_URL=http://localhost:5000
```

#### 4️⃣ Run the Application  

##### Start Backend  
```sh
cd server
npm start
```

##### Start Frontend  
```sh
cd client
npm run dev
```

The frontend should now be accessible at [http://localhost:5173](http://localhost:5173).  

---

## 🚀 Usage  

- **Signup/Login:** Create an account or log in.  
- **View Doctors:** Browse available doctors and appointment slots.  
- **Book Appointment:** Select a slot and confirm the appointment.  
- **Manage Appointments:** Cancel or reschedule bookings.  

---

## 📂 Project Structure  

```
samswnshi-appointment/
├── client/ (React Frontend)
│   ├── src/
│   │   ├── component/ (Reusable Components)
│   │   ├── config/ (API Configurations)
│   ├── public/ (Static Files)
│   ├── package.json (Dependencies)
│   ├── vite.config.js (Vite Config)
│   ├── .env (Environment Variables)
│
└── server/ (Node.js Backend)
    ├── controllers/ (Business Logic)
    ├── db/ (Database Config)
    ├── middleware/ (Auth Middleware)
    ├── models/ (MongoDB Schemas)
    ├── routes/ (Express API Endpoints)
    ├── server.js (Main Server File)
    ├── package.json (Dependencies)
    ├── .env (Environment Variables)
```

---

## 🌍 API Endpoints  

### **Authentication Routes** (`/api/auth`)  
- `POST /register` → Register a new user  
- `POST /login` → Authenticate user  

### **Doctor Routes** (`/api/doctors`)  
- `GET /` → Get list of doctors  

### **Appointment Routes** (`/api/appointments`)  
- `POST /` → Book an appointment  
- `GET /` → Get all appointments for a user  
- `DELETE /:id` → Cancel an appointment  

---

## ❓ Troubleshooting  

🔹 **MongoDB Connection Issues?**  
Ensure MongoDB is running and that your `MONGO_URI` is correctly set.  

🔹 **Frontend Not Loading?**  
Check that the backend is running before starting the frontend.  

🔹 **JWT Authentication Fails?**  
Ensure the `JWT_SECRET` in your `.env` file is correct and consistent.  

---

## 👨‍💻 Contributors  

- **Your Name** (Sameer Suryawnshi)  

---

## 📜 License  

This project is licensed under the **MIT License**.  
