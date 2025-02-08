# Event Management Web Application

![Event Manager Preview](https://i.imgur.com/zXy3D0Q.png)

A full-stack web application for managing and discovering events with real-time updates and user authentication.

## 🚀 Features

- **User Authentication**
  - Secure login/register system
  - Guest user access
  - JWT token-based authentication
- **Event Management**
  - Create/Edit/Delete events
  - Upload event images (Cloudinary integration)
  - Categorize events (Conference, Concert, Sports)
- **Real-time Updates**
  - Live attendee count updates
  - Instant event updates using Socket.io
- **Responsive UI**
  - Mobile-first design
  - Interactive forms and modals
- **Event Details**
  - Event image galleries
  - Date and location information
  - Past vs Upcoming events separation

## ⚙️ Technologies Used

**Frontend**  
📦 Vite + React.js  
💅 Tailwind CSS  
🔄 Axios (HTTP Client)  
🔌 Socket.io Client  

**Backend**  
🛠️ Node.js + Express  
🗄️ MongoDB + Mongoose  
🔒 JWT Authentication  
☁️ Cloudinary (Image Storage)  

**Realtime**  
⚡ Socket.io  

**Database**  
🍃 MongoDB Atlas  

## 🛠️ Setup Instructions

### Backend Setup

1. Clone repository
   ```bash
   git clone https://github.com/panditpankaj21/event-management-backend.git
2. Install dependencies
    ```bash
   npm install
3. Create .env file in backend root
    ```bash
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/eventdb
    PORT=3000
    JWT_SECRET_KEY=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
4. Start Server
    ```bash
    npm run dev

### Frontend Setup
1. Clone repository
    ```bash
    git clone https://github.com/panditpankaj21/event-management-frontend.git

2. Install dependencies
    ```bash
    npm install
3. Create .env file in frontend root
    ```bash
    VITE_BACKEND_URL=http://localhost:3000
4. Start develeopment Server
    ```bash
    npm run dev
