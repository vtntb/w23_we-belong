# We Belong - API Documentation

**Base URL:** `http://localhost:3000`  
**Version:** 1.0  
**Authentication:** JWT Bearer Token (include in Authorization header for protected routes)

---

## Authentication

Protected routes require a JWT token in the request header:

```
Authorization: Bearer <token>
```

The token is returned when you register or log in.

---

## 1. Auth Endpoints

### POST /api/auth/register

**Purpose:** Create a new user account

**Authentication:** Not required

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "password": "mypassword123",
  "backupQuestion": "What is your pet's name?",
  "backupAnswer": "fluffy"
}
```

**Success Response (201):**

```json
{
  "message": "Account created successfully.",
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing required fields |
| 400 | Password less than 6 characters |
| 409 | Email already registered |
| 500 | Server error |

---

### POST /api/auth/login

**Purpose:** Log in to an existing account

**Authentication:** Not required

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "mypassword123"
}
```

**Success Response (200):**

```json
{
  "message": "Login successful.",
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing email or password |
| 401 | Invalid email or password |
| 500 | Server error |

---

### POST /api/auth/check-reset-email

**Purpose:** Verify that an email exists and retrieve the backup security question

**Authentication:** Not required

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**

```json
{
  "message": "Email verified.",
  "email": "john@example.com",
  "backupQuestion": "What is your pet's name?"
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing email |
| 400 | Account has no backup question set |
| 404 | No account found with that email |
| 500 | Server error |

---

### POST /api/auth/reset-password

**Purpose:** Reset a user's password using their backup security answer

**Authentication:** Not required

**Request Body:**

```json
{
  "email": "john@example.com",
  "backupAnswer": "fluffy",
  "newPassword": "newpassword123"
}
```

**Success Response (200):**

```json
{
  "message": "Password reset successful."
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing required fields |
| 400 | Password less than 6 characters |
| 401 | Backup answer is incorrect |
| 404 | No account found with that email |
| 500 | Server error |

---

## 2. Course Endpoints

### GET /api/courses

**Purpose:** Get a list of all available courses

**Authentication:** Not required

**Success Response (200):**

```json
[
  {
    "id": "awarenesstraining",
    "title": "Disability Awareness Training",
    "description": "Learn to understand and support people with disabilities.",
    "category": "Awareness",
    "course_url": "/LearningHub/awarenesstraining.html",
    "total_lessons": 8
  }
]
```

---

### GET /api/courses/:id

**Purpose:** Get a single course with its lessons

**Authentication:** Not required

**URL Parameter:** `id` — the course ID (e.g. `awarenesstraining`)

**Success Response (200):**

```json
{
  "id": "awarenesstraining",
  "title": "Disability Awareness Training",
  "description": "...",
  "category": "Awareness",
  "course_url": "/LearningHub/awarenesstraining.html",
  "total_lessons": 8,
  "lessons": [
    {
      "id": 1,
      "course_id": "awarenesstraining",
      "title": "What is Disability?",
      "content_url": "...",
      "lesson_order": 1
    }
  ]
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 404 | Course not found |
| 500 | Server error |

---

### POST /api/courses/enroll

**Purpose:** Enrol the logged-in user in a course

**Authentication:** Required

**Request Body:**

```json
{
  "courseId": "awarenesstraining"
}
```

**Success Response (200):**

```json
{
  "message": "Enrolled successfully."
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing courseId |
| 401 | Not logged in |
| 404 | Course not found |
| 500 | Server error |

---

## 3. Progress Endpoints

### GET /api/progress

**Purpose:** Get all enrolled courses and progress for the logged-in user

**Authentication:** Required

**Success Response (200):**

```json
[
  {
    "courseId": "awarenesstraining",
    "title": "Disability Awareness Training",
    "description": "Learn to understand and support people with disabilities.",
    "courseUrl": "/LearningHub/awarenesstraining.html",
    "totalLessons": 8,
    "completedLessons": 3,
    "percent": 37,
    "isEnrolled": true
  }
]
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 401 | Not logged in |
| 500 | Server error |

---

### GET /api/progress/:courseId

**Purpose:** Get detailed progress for a single course

**Authentication:** Required

**URL Parameter:** `courseId` — the course ID (e.g. `awarenesstraining`)

**Success Response (200):**

```json
{
  "courseId": "awarenesstraining",
  "title": "Disability Awareness Training",
  "courseUrl": "/LearningHub/awarenesstraining.html",
  "isEnrolled": true,
  "completedLessons": [1, 2, 3],
  "completedCount": 3,
  "totalLessons": 8,
  "percent": 37
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 401 | Not logged in |
| 404 | Course not found |
| 500 | Server error |

---

### POST /api/progress/enrol

**Purpose:** Enrol the logged-in user in a course

**Authentication:** Required

**Request Body:**

```json
{
  "courseId": "awarenesstraining"
}
```

**Success Response (200):**

```json
{
  "message": "Enrolled successfully."
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing courseId |
| 401 | Not logged in |
| 500 | Server error |

---

### POST /api/progress/complete-lesson

**Purpose:** Mark a lesson as completed for the logged-in user

**Authentication:** Required

**Request Body:**

```json
{
  "courseId": "awarenesstraining",
  "lessonNumber": 3
}
```

**Success Response (200):**

```json
{
  "message": "Lesson completed."
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing courseId or lessonNumber |
| 400 | User not enrolled in this course |
| 401 | Not logged in |
| 500 | Server error |

---

## 4. Chatbot Endpoint

### POST /api/chatbot/message

**Purpose:** Send a message to the chatbot and receive a reply. Message and reply are saved to the database.

**Authentication:** Not required

**Request Body:**

```json
{
  "message": "How do I join a sport group?",
  "userId": 1
}
```

> `userId` is optional.

**Success Response (200):**

```json
{
  "reply": "To join, first choose an activity, then read the group details, and use the contact form or sign-up button."
}
```

**How it works:**

1. Checks for emergency keywords first (e.g. "urgent", "crisis") — returns safety message
2. Matches against FAQ keywords in the database
3. Falls back to rule-based responses if no FAQ match
4. Saves message and response to `chatbot_logs` table

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Empty message |
| 500 | Server error |

---

## 5. Contact Endpoint

### POST /api/contact

**Purpose:** Submit a contact form message

**Authentication:** Not required

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "0412345678",
  "email": "john@example.com",
  "program": "IncluSport",
  "message": "I would like to find out more."
}
```

> `program` and `message` are optional.

**Success Response (200):**

```json
{
  "message": "Contact message saved successfully."
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| 400 | Missing firstName, lastName, phone, or email |
| 500 | Server error |

---

## Database Tables

| Table              | Purpose                                                                             |
| ------------------ | ----------------------------------------------------------------------------------- |
| `users`            | Stores registered user accounts with hashed passwords and backup security questions |
| `courses`          | Stores all available courses                                                        |
| `progress`         | Tracks which courses each user is enrolled in                                       |
| `lesson_progress`  | Tracks which individual lessons each user has completed                             |
| `chatbot_faqs`     | Stores FAQ questions, answers and keywords for chatbot matching                     |
| `chatbot_logs`     | Logs all chatbot conversations                                                      |
| `contact_messages` | Stores contact form submissions                                                     |

---

## Security

- Passwords are hashed using **bcrypt** (10 salt rounds) before storing in the database
- Backup security answers are also hashed using **bcrypt** before storing
- Authentication uses **JWT tokens** that expire after 7 days
- Protected routes verify the JWT token via middleware before processing the request
- All database queries use **parameterised queries** to prevent SQL injection
