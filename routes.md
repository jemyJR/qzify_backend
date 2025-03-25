# API Routes

## **Authentication**

### **POST** `/auth/register`
- **Description**: Register a new user.  
- **Request (req)**:  
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "image": "string (optional)",
    "role": "string (optional, default: student)"
  }
  ```
- **Response (res)**:  
  ```json
  {
    "code": 201,
    "message": "Verification email sent. Please check your inbox."
  }
  ```

---

### **POST** `/auth/login`
- **Description**: User login.  
- **Request (req)**:  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "message": "User logged in successfully",
    "user": {
      "id": "string",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "role": "string"
    },
    "accessToken": "string",
    "refreshToken": "string"
  }
  ```

---

### **POST** `/auth/forgot-password`
- **Description**: Request password reset.  
- **Request (req)**:  
  ```json
  {
    "email": "string"
  }
  ```
- **Response (res)**:  
  ```json
  {
    "message": "Password reset link has been sent to this email: user@example.com"
  }
  ```

---

### **PATCH** `/auth/reset-password/:token`
- **Description**: Reset user password.  
- **Request (req)**:  
  ```json
  {
    "newPassword": "string",
    "passwordConfirmation": "string"
  }
  ```
- **Response (res)**:  
  ```json
  {
    "message": "Password has been reset",
    "data": "access.token.example"
  }
  ```

---

### **POST** `/auth/change-password`
- **Description**: Change user password.  
- **Request (req)**:  
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "message": "Password changed successfully"
  }
  ```

---

### **POST** `/auth/logout`
- **Description**: Logout the user by clearing the refresh token cookie.  
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "message": "User logged out successfully"
  }
  ```

---

## **Users**

### **GET** `/users`
- **Description**: Get all users (Admin only).  
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "users": [
      {
        "id": "string",
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "role": "string"
      }
    ]
  }
  ```

---

### **GET** `/users/:id`
- **Description**: Get user profile by ID.  
- **Response (res)**:  
  ```json
  {
    "id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "role": "string"
  }
  ```

---

### **PUT** `/users/:id`
- **Description**: Update user profile.  
- **Request (req)**:  
  ```json
  {
    "first_name": "string (optional)",
    "last_name": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)",
    "image": "string (optional)"
  }
  ```
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "message": "User updated successfully",
    "user": {
      "id": "string",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```

---

### **DELETE** `/users/:id`
- **Description**: Delete user profile (Admin only).  
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "message": "User deleted successfully"
  }
  ```

---

## **Questions**

### **GET** `/questions`
- **Description**: Get all questions.  
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "count": "number",
    "questions": [
      {
        "id": "string",
        "question": "string",
        "options": [
          { "text": "string", "isCorrect": "boolean" }
        ],
        "category": "string",
        "difficulty": "string",
        "points": "number"
      }
    ]
  }
  ```

---

### **GET** `/questions/:id`
- **Description**: Get question by ID.  
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "question": {
      "id": "string",
      "question": "string",
      "options": [
        { "text": "string", "isCorrect": "boolean" }
      ],
      "category": "string",
      "difficulty": "string",
      "points": "number"
    }
  }
  ```

---

### **POST** `/questions`
- **Description**: Create a new question.  
- **Request (req)**:  
  ```json
  {
    "question": "string",
    "options": [
      { "text": "string", "isCorrect": "boolean" }
    ],
    "category": "string",
    "difficulty": "string",
    "points": "number"
  }
  ```
- **Response (res)**:  
  ```json
  {
    "code": 201,
    "message": "Question created successfully",
    "question": {
      "id": "string",
      "question": "string",
      "options": [
        { "text": "string", "isCorrect": "boolean" }
      ],
      "category": "string",
      "difficulty": "string",
      "points": "number"
    }
  }
  ```

---

### **PUT** `/questions/:id`
- **Description**: Update a question.  
- **Request Body**:  
  ```json
  {
    "question": "string",
    "options": [
      { "text": "string", "isCorrect": "boolean" }
    ],
    "category": "string",
    "difficulty": "string",
    "points": "number"
  }
  ```
- **Response**:  
  ```json
  {
    "code": 200,
    "message": "Question updated successfully",
    "question": {
      "id": "string",
      "question": "string",
      "options": [
        { "text": "string", "isCorrect": "boolean" }
      ],
      "category": "string",
      "difficulty": "string",
      "points": "number"
    }
  }
  ```

---

### **DELETE** `/questions/:id`
- **Description**: Delete a question.  
- **Response**:  
  ```json
  {
    "code": 200,
    "message": "Question deleted successfully"
  }
  ```

---

### **GET** `/questions/category`
- **Description**: Get all available categories.  
- **Response**:  
  ```json
  {
    "code": 200,
    "count": "number",
    "categories": [ "string", ... ]
  }
  ```

---

### **GET** `/questions/category/:category`
- **Description**: Get questions by category.  
- **Response**:  
  ```json
  {
    "code": 200,
    "count": "number",
    "questions": [ ...questions ]
  }
  ```

---

### **POST** `/questions/bulk`
- **Description**: Create multiple questions.  
- **Request Body**:  
  ```json
  {
    "questions": [
      { ...questionDetails },
      ...
    ]
  }
  ```
- **Response**:  
  ```json
  {
    "code": 201,
    "message": "Questions created successfully",
    "count": "number",
    "questions": [ ...createdQuestions ]
  }
  ```

---

## **Attempts**

### **POST** `/attempts/start`
- **Description**: Start a new quiz attempt.  
- **Request Query**:  
  ```
  difficulties=string (optional)&categories=string&count=number
  ```
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "attempt": {
      "id": "string",
      "title": "string",
      "questions": [
        {
          "id": "string",
          "question": "string",
          "options": [
            { "id": "string", "text": "string" }
          ],
          "category": "string",
          "difficulty": "string",
          "points": "number"
        }
      ],
      "categories": ["string"],
      "difficulties": ["string"],
      "status": "string",
      "score": "number",
      "totalPossibleScore": "number"
    }
  }
  ```

---

### **GET** `/attempts/:id`
- **Description**: Get details of a quiz attempt.  
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "attempt": {
      "id": "string",
      "title": "string",
      "questions": [
        {
          "id": "string",
          "question": "string",
          "options": [
            { "id": "string", "text": "string" }
          ],
          "category": "string",
          "difficulty": "string",
          "points": "number"
        }
      ],
      "categories": ["string"],
      "difficulties": ["string"],
      "status": "string",
      "score": "number",
      "totalPossibleScore": "number"
    }
  }
  ```

---

### **POST** `/attempts/:id/submit`
- **Description**: Submit answers for a quiz attempt.  
- **Request Body**:  
  ```json
  {
    "updates": [
      {
        "questionId": "string",
        "chosenOptionIds": [ "string", ... ],
        "isFlagged": "boolean"
      },
      ...
    ]
  }
  ```
- **Response (res)**:  
  ```json
  {
    "code": 200,
    "attempt": {
      "id": "string",
      "score": "number",
      "status": "completed"
    }
  }
  ```

---

### **PATCH** `/attempts/:id`
- **Description**: Update a quiz attempt (e.g., flag questions or save chosen answers).  
- **Request Body**:  
  ```json
  {
    "updates": [
      {
        "questionId": "string",
        "chosenOptionIds": [ "string", ... ],
        "isFlagged": "boolean"
      },
      ...
    ]
  }
  ```
- **Response**:  
  ```json
  {
    "code": 200,
    "attempt": { ...updatedAttemptDetails }
  }
  ```

---

### **GET** `/attempts`
- **Description**: Get all quiz attempts of the authenticated user.  
- **Response**:  
  ```json
  {
    "code": 200,
    "count": "number",
    "attempts": [ ...attempts ]
  }
  ```
