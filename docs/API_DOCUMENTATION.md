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
  "password": "mypassword123"
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
| Code | Reason                          |
|------|---------------------------------|
| 400  | Missing required fields         |
| 400  | Password less than 6 characters |
| 409  | Email already registered        |
| 500  | Server error                    |

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
| Code | Reason                    |
|------|---------------------------|
| 400  | Missing email or password |
| 401  | Invalid email or password |
| 500  | Server error              |

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
  },
  ...
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
    { "id": 1, "course_id": "awarenesstraining", "title": "What is Disability?", "content_url": "...", "lesson_order": 1 }
  ]
}
```

**Error Responses:**
| Code | Reason           |
|------|------------------|
| 404  | Course not found |
| 500  | Server error     |  

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
| Code | Reason           |
|------|------------------|
| 400  | Missing courseId |
| 401  | Not logged in    |
| 404  | Course not found |
| 500  | Server error     |

---

## 3. Progress Endpoints

### GET /api/progress
**Purpose:** Get all enrolled courses and progress for the logged-in user

**Authentication:** Required

**Success Response (200):**
```json
[
  {
    "course_id": "awarenesstraining",
    "title": "Disability Awareness Training",
    "lessons_completed": 3,
    "total_lessons": 8,
    "is_enrolled": true,
    "enrolled_at": "2026-05-15T00:00:00.000Z"
  }
]
```

**Error Responses:**
| Code | Reason        |
|------|---------------|
| 401  | Not logged in |
| 500  | Server error  |

---

### POST /api/progress/update
**Purpose:** Update the number of lessons completed for a course

**Authentication:** Required

**Request Body:**
```json
{
  "courseId": "awarenesstraining",
  "lessonsCompleted": 4
}
```

**Success Response (200):**
```json
{
  "message": "Progress updated."
}
```

**Error Responses:**
| Code | Reason                               |
|------|--------------------------------------|
| 400  | Missing courseId or lessonsCompleted |
| 400  | User not enrolled in this course     |
| 401  | Not logged in                        |
| 500  | Server error                         |

---

## 4. Chatbot Endpoints

### POST /api/chatbot/message
**Purpose:** Send a message to the chatbot and receive a reply. Message and reply are saved to the database.

**Authentication:** Not required (userId optional)

**Request Body:**
```json
{
  "message": "How do I join a sport group?",
  "userId": 1
}
```

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
| Code | Reason        |
|------|---------------|
| 400  | Empty message |
| 500  | Server error  |

---

## Database Tables

| Table          | Purpose                                                          |
|----------------|------------------------------------------------------------------|
| `users`        | Stores registered user accounts with hashed passwords            |
| `courses`      | Stores all available courses                                     |
| `lessons`      | Stores individual lessons linked to courses                      |
| `progress`     | Tracks which courses each user is enrolled in and their progress |
| `chatbot_faqs` | Stores FAQ questions, answers and keywords for chatbot matching  |
| `chatbot_logs` | Logs all chatbot conversations                                   |

---

## Security

- Passwords are hashed using **bcrypt** (10 salt rounds) before storing in the database
- Authentication uses **JWT tokens** that expire after 7 days
- Protected routes verify the JWT token via middleware before processing the request
- All database queries use **parameterised queries** to prevent SQL injection
