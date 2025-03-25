# 🎓 Qzify Online Examination System

Qzify is a robust and feature-rich online examination system designed specifically for **programming quizzes**. It allows users to generate **general quizzes** or **specific quizzes** based on selected categories, difficulty levels, and the desired number of questions. The platform provides a seamless experience for both administrators and students, ensuring a secure and efficient environment for online assessments.

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

[https://onlineexamsystem-staging.up.railway.app](https://onlineexamsystem-staging.up.railway.app)

---

## 🛠️ Installation

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd qzify_backend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
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

### **4. Start the Server**
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
Refer to the [API Documentation](#api-documentation) section for detailed information about available endpoints.

### **Swagger Docs**
Access the interactive API documentation at `/api/docs`.

---

## 📚 API Documentation

### **Authentication**
- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - User login.
- **POST** `/auth/forgot-password` - Request password reset.
- **PATCH** `/auth/reset-password/:token` - Reset user password.
- **POST** `/auth/change-password` - Change user password.
- **POST** `/auth/logout` - Logout the user.

### **Users**
- **GET** `/users` - Get all users (Admin only).
- **GET** `/users/:id` - Get user profile.
- **PUT** `/users/:id` - Update user profile.
- **DELETE** `/users/:id` - Delete user profile (Admin only).

### **Questions**
- **POST** `/questions` - Create a new question.
- **GET** `/questions` - Get all questions.
- **GET** `/questions/:id` - Get question by ID.
- **PUT** `/questions/:id` - Update a question.
- **DELETE** `/questions/:id` - Delete a question.
- **GET** `/questions/category` - Get all available categories.
- **GET** `/questions/category/:category` - Get questions by category.
- **POST** `/questions/bulk` - Create multiple questions.

### **Attempts**
- **POST** `/attempts/start` - Start a new quiz attempt.
- **GET** `/attempts/:id` - Get details of a quiz attempt.
- **POST** `/attempts/:id/submit` - Submit answers for a quiz attempt.
- **PATCH** `/attempts/:id` - Update a quiz attempt.
- **GET** `/attempts` - Get all quiz attempts of the authenticated user.

---

## 📂 Folder Structure

```
online_exam_system/
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

## 📜 Scripts

- **`npm run dev`**: Start the server in development mode.
- **`npm start`**: Start the server in production mode.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
