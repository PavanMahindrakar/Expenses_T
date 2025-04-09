# Expense Tracker (MERN Stack)

A full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Track income and expenses
- Categorize transactions
- View spending history and statistics
- Responsive design that works on desktop and mobile

## Project Structure

- `/client` - React frontend
- `/server` - Express/Node.js backend API

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd client
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm start
   ```
2. Start the frontend development server:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
``` 