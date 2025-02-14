# API Routes

## **User Authentication**
- **POST** `/users/register`                          -- Register a new user
- **GET** `/users`                                    -- Get users(admin only)
- **GET** `/users/:id`                                -- Get user profile
- **PUT** `/users/:id`                                -- Edit user profile
- **DELETE** `/users/:id`                             -- Remove user profile

## **Quizzes Management**
- **POST** `/quizzes`                                 -- Create a new quiz (admin only)
- **GET** `/quizzes`                                  -- Get all quizzes
- **GET** `/quizzes/:id`                              -- Get a specific quiz
- **PUT** `/quizzes/:id`                              -- Update a quiz (admin only)
- **DELETE** `/quizzes/:id`                           -- Delete a quiz (admin only)

## **Questions Management**
- **POST** `/quizzes/:quizId/questions`               -- Add a question to a quiz
- **GET** `/quizzes/:quizId/questions`                -- Get all questions in a quiz
- **PUT** `/quizzes/:quizId/questions/:questionId`    -- Update a question
- **DELETE** `/quizzes/:quizId/questions/:questionId` -- Remove a question

## **Exams Management**
- **POST** `/exams/start/:quizId`                     -- Start a quiz (copy quiz snapshot & store user answers)
- **POST** `/exams/submit/:examId`                    -- Submit answers and calculate score
- **GET** `/exams/user/:userId`                       -- Get all past exams for a user
- **GET** `/exams/:examId`                            -- Get a specific exam attempt
- **GET** `/exams/:examId/score`                      -- Get the score of a specific exam attempt
