# Blog Application

This is a full-stack web application that allows users to create, read, update, and delete (CRUD) blog posts. The application features user authentication, a React frontend with Redux for state management, and an Express backend with a MongoDB database.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Setup

### Clone the Repository

```
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

### Backend Setup

#### 1. Navigate to the backend directory:

```
cd backend
```

#### 2. Install the dependencies:

```
npm install
```

#### 3. Create a .env file in the backend directory with the following content:

```
MONGO_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_jwt_secret
```

#### 4. Start the backend server:

```
npm run dev
```

### Frontend Setup

#### 1. Open a new terminal window and navigate to the frontend directory:

```
cd frontend
```

#### 2. Install the dependencies:

```
npm install
```

#### 3. Start the frontend development server:

```
npm start
```