# API Routes

## **Authentication**
- **POST** `/auth/register`                                  -- Register a new user
- **POST** `/auth/login`                                     -- User login
- **GET**  `/auth/me`                                        -- Get Logged in user info

## **Users**
- **GET** `/users`                                           -- Get users(admin only)
- **GET** `/users/:id`                                       -- Get user profile
- **PUT** `/users/:id`                                       -- Edit user profile
- **DELETE** `/users/:id`                                    -- Remove user profile

## **Quizzes**
- **GET** `/categories`                                      -- Get all quizzes Categories
- **POST** `/quizzes`                                        -- Create a new quiz (admin only)
- **GET** `/quizzes`                                         -- Get all quizzes
- **GET** `/quizzes/:id`                                     -- Get a specific quiz
- **PUT** `/quizzes/:id`                                     -- Update a quiz (admin only)
- **DELETE** `/quizzes/:id`                                  -- Delete a quiz (admin only)

## **Questions**
- **POST** `/quizzes/:quizId/questions`                      -- Add a question to a quiz (admin only)
- **GET** `/quizzes/:quizId/questions`                       -- Get all questions in a quiz (get random qs list with preferable size)
- **GET** `/quizzes/:quizId/questions/questionId/title`      -- Get all question title
- **PUT** `/quizzes/:quizId/questions/:questionId`           -- Update a question (admin only)
- **DELETE** `/quizzes/:quizId/questions/:questionId`        -- Remove a question (admin only)

## **Attempts**
- **POST** `/attempts/start/`                                -- Start a quiz (copy quiz snapshot & store user answers)
- **POST** `/attempts/:id/submit`                            -- Submit answers and calculate score
- **GET** `/attempts/:id`                                    -- Get details of a quiz attempt(answers/score)
- **GET** `/users/userId/attempts`                           -- Get all past exams for a user
- **GET** `/users/userId/attempts/:id`                       -- Get a specific exam attempt
- **GET** `/attempts/:id/score`                              -- Get the score of a specific exam attempt
- ***POST** `quizzes/generated`                              -- Create customized quiz from preferable categories