# API Routes

## **Authentication**
- **POST** `/auth/register`  
  - **Description**: Register a new user.  
  - **Request Body**:  
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
  - **Response**:  
    ```json
    {
      "code": 201,
      "message": "Verification email sent. Please check your inbox."
    }
    ```

- **POST** `/auth/login`  
  - **Description**: User login.  
  - **Request Body**:  
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:  
    ```json
    {
      "code": 200,
      "message": "User logged in successfully",
      "user": { ...userDetails },
      "accessToken": "string",
      "refreshToken": "string"
    }
    ```

- **POST** `/auth/forgot-password`  
  - **Description**: Request password reset.  
  - **Request Body**:  
    ```json
    {
      "email": "string"
    }
    ```
  - **Response**:  
    ```json
    {
      "message": "Password reset link has been sent to this email: user@example.com"
    }
    ```

- **PATCH** `/auth/reset-password/:token`  
  - **Description**: Reset user password.  
  - **Request Body**:  
    ```json
    {
      "newPassword": "string",
      "passwordConfirmation": "string"
    }
    ```
  - **Response**:  
    ```json
    {
      "message": "Password has been reset",
      "data": "access.token.example"
    }
    ```

- **POST** `/auth/change-password`  
  - **Description**: Change user password.  
  - **Request Body**:  
    ```json
    {
      "oldPassword": "string",
      "newPassword": "string"
    }
    ```
  - **Response**:  
    ```json
    {
      "code": 200,
      "message": "Password changed successfully"
    }
    ```

- **POST** `/auth/logout`  
  - **Description**: Logout the user by clearing the refresh token cookie.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "message": "User logged out successfully"
    }
    ```

---

## **Users**
- **GET** `/users`  
  - **Description**: Get all users (Admin only).  
  - **Response**:  
    ```json
    [
      { ...userDetails }
    ]
    ```

- **GET** `/users/:id`  
  - **Description**: Get user profile by ID.  
  - **Response**:  
    ```json
    { ...userDetails }
    ```

- **PUT** `/users/:id`  
  - **Description**: Update user profile.  
  - **Request Body**:  
    ```json
    {
      "first_name": "string (optional)",
      "last_name": "string (optional)",
      "email": "string (optional)",
      "password": "string (optional)",
      "image": "string (optional)"
    }
    ```
  - **Response**:  
    ```json
    {
      "code": 200,
      "message": "User updated successfully",
      "user": { ...updatedUserDetails }
    }
    ```

- **DELETE** `/users/:id`  
  - **Description**: Delete user profile (Admin only).  
  - **Response**:  
    ```json
    {
      "code": 200,
      "message": "User deleted successfully"
    }
    ```

---

## **Questions**
- **GET** `/questions`  
  - **Description**: Get all questions.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "count": "number",
      "questions": [ ...questions ]
    }
    ```

- **GET** `/questions/:id`  
  - **Description**: Get question by ID.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "question": { ...questionDetails }
    }
    ```

- **POST** `/questions`  
  - **Description**: Create a new question.  
  - **Request Body**:  
    ```json
    {
      "question": "string",
      "options": [
        { "text": "string", "isCorrect": "boolean" },
        ...
      ],
      "category": "string",
      "difficulty": "string",
      "points": "number"
    }
    ```
  - **Response**:  
    ```json
    {
      "code": 201,
      "message": "Question created successfully",
      "question": { ...createdQuestionDetails }
    }
    ```

- **PUT** `/questions/:id`  
  - **Description**: Update a question.  
  - **Request Body**:  
    ```json
    {
      "question": "string",
      "options": [
        { "text": "string", "isCorrect": "boolean" },
        ...
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
      "question": { ...updatedQuestionDetails }
    }
    ```

- **DELETE** `/questions/:id`  
  - **Description**: Delete a question.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "message": "Question deleted successfully"
    }
    ```

- **GET** `/questions/category`  
  - **Description**: Get all available categories.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "count": "number",
      "categories": [ "string", ... ]
    }
    ```

- **GET** `/questions/category/:category`  
  - **Description**: Get questions by category.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "count": "number",
      "questions": [ ...questions ]
    }
    ```

- **POST** `/questions/bulk`  
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
- **POST** `/attempts/start`  
  - **Description**: Start a new quiz attempt.  
  - **Request Query**:  
    ```
    difficulties=string (optional)&categories=string&count=number
    ```
  - **Response**:  
    ```json
    {
      "code": 200,
      "attempt": { ...attemptDetails }
    }
    ```

- **GET** `/attempts/:id`  
  - **Description**: Get details of a quiz attempt.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "attempt": { ...attemptDetails }
    }
    ```

- **POST** `/attempts/:id/submit`  
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
  - **Response**:  
    ```json
    {
      "code": 200,
      "attempt": { ...submittedAttemptDetails }
    }
    ```

- **PATCH** `/attempts/:id`  
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

- **GET** `/attempts`  
  - **Description**: Get all quiz attempts of the authenticated user.  
  - **Response**:  
    ```json
    {
      "code": 200,
      "count": "number",
      "attempts": [ ...attempts ]
    }
    ```
