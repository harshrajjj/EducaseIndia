# PopX Application

A mobile-first web application built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Account settings management
- Mobile-optimized UI with enhanced animations
- Responsive design with mobile app interface centered on the webpage
- Attractive UI/UX with modern design elements
- Toast notifications for user feedback

## Screenshots

- Welcome Page - Modern design with animated features
- Sign In Page - Clean and intuitive login form
- Create Account Page - User-friendly registration
- Account Settings Page - Profile management with image upload

## Tech Stack

### Frontend
- React 19
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for data storage
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd NewClient && npm install
   cd ../NewServer && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the NewServer directory with the following variables:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/popx
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     CLIENT_URL=http://localhost:5173
     ```
   - Create a `.env` file in the NewClient directory:
     ```
     VITE_API_URL=http://localhost:5000
     ```

4. Start the development servers:
   ```
   # Terminal 1
   cd NewClient && npm run dev

   # Terminal 2
   cd NewServer && npm run dev
   ```

This will start both the frontend and backend servers.

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to a GitHub repository
2. Log in to [Vercel](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Configure the project:
   - Root Directory: `NewClient`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables:
   - `VITE_API_URL`: Your backend URL (e.g., https://popx-api.onrender.com)
6. Click "Deploy"

### Backend Deployment (Render)

1. Push your code to a GitHub repository
2. Log in to [Render](https://render.com)
3. Click "New Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - Name: `popx-api` (or your preferred name)
   - Root Directory: `NewServer`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Add the following environment variables:
   - `PORT`: 5000 (Render will override this with its own port)
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production
   - `CLIENT_URL`: Your frontend URL (e.g., https://popx-app.vercel.app)
7. Click "Create Web Service"

## Project Structure

```
├── NewClient/              # React frontend
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS styles
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vercel.json         # Vercel deployment configuration
│   └── ...
├── NewServer/              # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   └── routes/         # API routes
│   ├── server.js           # Server entry point
│   ├── Procfile            # Render deployment configuration
│   └── ...
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

### User
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
