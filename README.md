# Nexus - Professional Networking Platform

A full-stack professional networking platform built with React, Node.js, Express, and MySQL.

## Project Milestones and Implementation Status

### MILESTONE ONE: Conceptualization and Design 
- System Architecture Design
  - React frontend with Material-UI for modern, responsive interface
  - Node.js/Express backend for robust API development
  - MySQL database for reliable data storage
- Requirements Analysis
  - User authentication and authorization
  - Role-based access control (Admin, Regular Users)
  - Professional networking features
  - Administrative dashboard

### MILESTONE TWO: Core Functionality Implementation 
- User Authentication System
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Protected routes implementation
- User Management
  - User registration and login
  - Profile management
  - Role-based access control

### MILESTONE THREE: Advanced Feature Development 
- Administrative Features
  - Comprehensive admin dashboard
  - User management capabilities
  - Analytics and statistics tracking
- Data Analysis
  - User statistics visualization
  - Activity tracking
  - Performance monitoring

### MILESTONE FOUR: Evaluation and Optimization 
- System Improvements
  - Enhanced security measures
  - Performance optimizations
  - UI/UX refinements
- Quality Assurance
  - Bug fixes and testing
  - Security audits
  - Performance testing

### MILESTONE FIVE: Documentation and Presentation 
- Project Documentation
  - API documentation
  - User guides
  - System architecture documentation
- Final Presentation Preparation
  - Project overview
  - Technical implementation details
  - Future recommendations

## Features

- User Authentication (JWT)
- Role-based Access Control
- Admin Dashboard
  - User Management
  - Analytics Dashboard
  - Activity Monitoring
- Modern and Responsive UI with Material-UI
- Secure Password Hashing
- Protected Routes

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Project Structure

```
nexus/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   └── App.js      # Main application component
├── server/              # Node.js backend
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/        # Database models
│   └── routes/        # API routes
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexus
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the server directory with:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=nexus_db
   DB_PORT=3307
   ```

3. **Set up the database**
   - Ensure MySQL is running
   - Create a database named 'nexus_db'
   - Import the schema from `server/config/schema.sql`

4. **Set up the client**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the application**
   
   In the server directory:
   ```bash
   npm run dev
   ```
   
   In the client directory:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile

### Admin Routes
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id` - Update user role
- DELETE `/api/admin/users/:id` - Delete user
- GET `/api/admin/stats` - Get system statistics

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected routes with middleware
- Role-based access control
- Admin-only routes protection

## Current Status

The application has successfully implemented all core features and advanced functionality, including the administrative dashboard with user management and analytics capabilities. The system is currently in the documentation and final presentation phase, with all major features completed and tested.

## Next Steps

1. Complete comprehensive documentation
2. Prepare final presentation materials
3. Conduct final system review
4. Gather user feedback
5. Plan future enhancements
