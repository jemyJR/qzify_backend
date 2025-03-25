# 🎓 Qzify Online Examination System

Qzify is a robust and feature-rich online examination system designed specifically for **programming quizzes**. It allows users to generate **general quizzes** or **specific quizzes** based on selected categories, difficulty levels, and the desired number of questions. The platform provides a seamless experience for both administrators and students, ensuring a secure and efficient environment for online assessments.

---

## 📝 Table of Contents

1. [🚀 Features](#-features)
2. [🌐 Deployment](#-deployment)
3. [🛠️ Installation](#-installation)
4. [📖 Usage](#-usage)
5. [📚 API Documentation](#-api-documentation)
6. [📂 Folder Structure](#-folder-structure)
7. [🌐 Environment Variables](#-environment-variables)

---

## 🚀 Features

### **Authentication**
- User registration with email verification.
- Login with JWT-based authentication.
- Password reset via email.
- Refresh token for session management.
- Logout from all devices.

### **User Management**
- Admin-only access to manage users.
- View, update, and delete user profiles.

### **Quiz Management**
- Create, update, delete, and fetch quiz questions.
- Categorize questions by difficulty and topic.
- Bulk question creation for efficiency.

### **Quiz Attempts**
- Start, continue, and submit quiz attempts.
- Auto-submit expired attempts.
- Scoring and detailed review of quiz results.

### **Security**
- JWT-based authentication.
- Rate limiting to prevent abuse.
- XSS and NoSQL injection protection.
- Helmet for secure HTTP headers.

### **API Documentation**
- Interactive Swagger documentation for all endpoints.

### **Cron Jobs**
- Automated submission of expired quiz attempts.

---

## 🌐 Deployment

The project is deployed on **Railway**. You can access the live version of the application at:

[https://qzifybackend-production.up.railway.app](https://qzifybackend-production.up.railway.app)

---

## 🛠️ Installation

### **Clone the Repository**
```bash
git clone <repository-url>
cd qzify_backend
```

### **Install Dependencies**
```bash
npm install
```

### **Configure Environment Variables**
Create a `.env` file in the root directory and configure the following:
```
PORT=3000
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
DB_HOST=<your-db-host>
DB_OPTIONS=<your-db-options>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
REFRESH_TOKEN_EXPIRY=7d
SEND_GRID_API_KEY=<your-sendgrid-api-key>
USER_EMAIL=<your-email>
FRONTEND_URL=http://localhost:3000
```

### **Start the Server**
For development:
```bash
npm run dev
```
For production:
```bash
npm start
```

---

## 📖 Usage

### **API Endpoints**
Refer to the [API Documentation](https://qzifybackend-production.up.railway.app/api/docs/) section for detailed information about available endpoints.

### **Swagger Docs**
Access the interactive API documentation at `/api/docs`.

---

## 📚 API Documentation

For detailed information about each endpoint, refer to the [API Routes Documentation](./routes.md).

### **Authentication**
- **POST** `/auth/register` - [Register a new user](./routes.md#post-authregister).
- **GET** `/auth/verify-email/:token` - [Verify user email](./routes.md#get-authverify-emailtoken).
- **POST** `/auth/login` - [User login](./routes.md#post-authlogin).
- **POST** `/auth/refresh-token` - [Refresh access token](./routes.md#post-authrefresh-token).
- **POST** `/auth/logout` - [Logout the user](./routes.md#post-authlogout).
- **POST** `/auth/change-password` - [Change user password](./routes.md#post-authchange-password).
- **POST** `/auth/forgot-password` - [Request password reset](./routes.md#post-authforgot-password).
- **PATCH** `/auth/reset-password/:token` - [Reset user password](./routes.md#patch-authreset-passwordtoken).

### **Users**
- **GET** `/users` - [Get all users (Admin only)](./routes.md#get-users).
- **GET** `/users/:id` - [Get user profile](./routes.md#get-usersid).
- **PUT** `/users/:id` - [Update user profile](./routes.md#put-usersid).
- **DELETE** `/users/:id` - [Delete user profile (Admin only)](./routes.md#delete-usersid).

### **Questions**
- **GET** `/questions` - [Get all questions](./routes.md#get-questions).
- **GET** `/questions/:id` - [Get question by ID](./routes.md#get-questionsid).
- **POST** `/questions` - [Create a new question](./routes.md#post-questions).
- **PUT** `/questions/:id` - [Update a question](./routes.md#put-questionsid).
- **DELETE** `/questions/:id` - [Delete a question](./routes.md#delete-questionsid).
- **GET** `/questions/category` - [Get all available categories](./routes.md#get-questionscategory).
- **GET** `/questions/category/:category` - [Get questions by category](./routes.md#get-questionscategorycategory).
- **POST** `/questions/bulk` - [Create multiple questions](./routes.md#post-questionsbulk).
- **GET** `/questions/random` - [Generate random quiz](./routes.md#get-questionsrandom).

### **Attempts**
- **POST** `/attempts/start` - [Start a new quiz attempt](./routes.md#post-attemptsstart).
- **GET** `/attempts/:id/continue` - [Continue an in-progress quiz attempt](./routes.md#get-attemptsidcontinue).
- **PATCH** `/attempts/:id` - [Update a quiz attempt](./routes.md#patch-attemptsid).
- **POST** `/attempts/:id/submit` - [Submit answers for a quiz attempt](./routes.md#post-attemptsidsubmit).
- **GET** `/attempts/:id` - [Get details of a quiz attempt](./routes.md#get-attemptsid).
- **GET** `/attempts` - [Get all quiz attempts of the authenticated user](./routes.md#get-attempts).

---

## 📂 Folder Structure

```
qzify_backend/
├── src/
│   ├── features/
│   │   ├── auth/          # Authentication logic
│   │   ├── users/         # User management
│   │   ├── questions/     # Quiz questions
│   │   └── attempts/      # Quiz attempts
│   ├── shared/
│   │   ├── config/        # Configuration files
│   │   ├── middleware/    # Middleware functions
│   │   ├── swagger/       # Swagger API docs
│   │   └── utils/         # Utility functions
│   └── app.js             # Express app setup
├── .gitignore             # Ignored files for Git
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## 🌐 Environment Variables

| Variable               | Description                          |
|------------------------|--------------------------------------|
| `PORT`                 | Port number for the server.         |
| `DB_USER`              | MongoDB username.                   |
| `DB_PASSWORD`          | MongoDB password.                   |
| `DB_HOST`              | MongoDB host.                       |
| `DB_OPTIONS`           | MongoDB connection options.         |
| `ACCESS_TOKEN_SECRET`  | Secret for access tokens.           |
| `ACCESS_TOKEN_EXPIRY`  | Expiry time for access tokens.       |
| `REFRESH_TOKEN_SECRET` | Secret for refresh tokens.          |
| `REFRESH_TOKEN_EXPIRY` | Expiry time for refresh tokens.      |
| `SEND_GRID_API_KEY`    | API key for SendGrid email service.  |
| `USER_EMAIL`           | Sender email address.               |
| `FRONTEND_URL`         | URL of the frontend application.    |

---

By including the table of contents, users can now click directly on the section they want to explore, making the documentation even more user-friendly!