<div align="center">

# 🤖 Interview AI

### AI-Powered Interview Preparation Platform

An intelligent full-stack web application that analyzes your resume and the target job description using **Google Gemini AI** to generate a personalized interview strategy — complete with technical & behavioral questions, skill gap analysis, a day-wise preparation roadmap, and an ATS-optimized resume PDF.

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture & Data Flow](#-architecture--data-flow)
- [API Reference](#-api-reference)
- [Database Models](#-database-models)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Interview AI** is a full-stack MERN application that leverages the power of Google Gemini's generative AI to give job seekers a competitive edge. By combining your resume (PDF upload), a short self-description, and the target job description, the platform instantly produces a comprehensive, role-specific interview preparation report — all from a clean, intuitive UI.


---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **JWT Auth** | Secure register / login / logout with cookie-based tokens and a blacklist for invalidation |
| 📄 **Resume Upload** | Upload your resume as a PDF (up to 3 MB); text is extracted server-side via `pdf-parse` |
| 🤖 **AI Report Generation** | Google Gemini analyzes your profile against the job description and returns a structured JSON report |
| 🎯 **Match Score** | A 0–100 score indicating how well your profile matches the role |
| ❓ **Technical Questions** | Predicted interview questions with interviewer intent and a model answer for each |
| 💬 **Behavioral Questions** | Soft-skill & situational questions with structured guidance on how to respond |
| 📉 **Skill Gap Analysis** | Identified missing skills with severity levels (`low` / `medium` / `high`) |
| 🗓️ **Day-wise Preparation Roadmap** | A personalized day-by-day study plan with focused topics and actionable tasks |
| 📑 **AI Resume PDF Generator** | Generates an ATS-friendly, tailored resume in PDF format using Puppeteer |
| 📂 **Report History** | View all your previously generated interview plans from the dashboard |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **Google Gemini AI** (`@google/genai`) | Generative AI for report & resume generation |
| **Puppeteer** | Headless browser for HTML → PDF conversion |
| **pdf-parse** | PDF text extraction from uploaded resumes |
| **Multer** | Multipart file upload handling (memory storage) |
| **JWT + bcryptjs** | Authentication & password hashing |
| **Zod + zod-to-json-schema** | Structured AI output schema validation |
| **dotenv** | Environment variable management |
| **cookie-parser + cors** | Cookie handling & cross-origin support |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI component framework |
| **Vite 7** | Build tool & dev server |
| **React Router 7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **SCSS** | Component-level styling |
| **Context API** | Global state management (Auth & Interview) |

---

## 📁 Project Structure

```
interview-ai-yt/
├── Backend/
│   ├── server.js                   # Entry point — starts server & connects DB
│   ├── package.json
│   └── src/
│       ├── app.js                  # Express app setup (middleware, routes)
│       ├── config/
│       │   └── database.js         # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js  # Register, Login, Logout, GetMe
│       │   └── interview.controller.js  # Generate report, fetch reports, generate PDF
│       ├── middlewares/
│       │   ├── auth.middleware.js  # JWT verification + blacklist check
│       │   └── file.middleware.js  # Multer config (memory, 3 MB limit)
│       ├── models/
│       │   ├── user.model.js           # User schema
│       │   ├── interviewReport.model.js # Full report schema
│       │   └── blacklist.model.js      # Invalidated JWT tokens
│       ├── routes/
│       │   ├── auth.routes.js      # /api/auth/*
│       │   └── interview.routes.js # /api/interview/*
│       └── services/
│           └── ai.service.js       # Gemini AI calls + Puppeteer PDF generation
│
└── Frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx                 # Root — wraps providers & RouterProvider
        ├── app.routes.jsx          # Route definitions
        ├── style.scss / style/     # Global & shared styles
        └── features/
            ├── auth/
            │   ├── auth.context.jsx        # Auth state provider
            │   ├── hooks/useAuth.js        # Auth hook
            │   ├── services/auth.api.js    # Axios calls for auth
            │   ├── pages/
            │   │   ├── Login.jsx
            │   │   └── Register.jsx
            │   └── components/
            │       └── Protected.jsx       # Route guard component
            └── interview/
                ├── interview.context.jsx   # Interview state provider
                ├── hooks/useInterview.js   # Interview hook
                ├── services/interview.api.js # Axios calls for interview APIs
                ├── style/                  # Page-specific SCSS
                └── pages/
                    ├── Home.jsx            # Report creation form + report list
                    └── Interview.jsx       # Full report viewer (questions, roadmap, gaps)
```

---

## 🏗️ Architecture & Data Flow

```
User (Browser)
     │
     │  1. Upload resume PDF + job description + self-description
     ▼
React Frontend (Vite + React 19)
     │
     │  2. POST /api/interview  (multipart/form-data)
     ▼
Express Backend
     │
     ├─ auth.middleware  → verify JWT cookie
     ├─ file.middleware  → Multer stores PDF in memory
     ├─ interview.controller
     │      ├─ pdf-parse  → extract plain text from PDF
     │      └─ ai.service → call Google Gemini
     │               │
     │               ├─ Structured JSON schema (Zod → JSON Schema)
     │               └─ Gemini returns validated report JSON
     │
     │  3. Save report to MongoDB
     │  4. Return report to frontend
     ▼
React Frontend
     │
     └─ Renders: Match Score · Technical Qs · Behavioral Qs · Skill Gaps · Roadmap
                 + "Download Resume" → POST /api/interview/resume/pdf/:id
                                          └─ Gemini generates HTML → Puppeteer → PDF
```

---

## 📡 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Create a new user account |
| `POST` | `/login` | Public | Authenticate and receive a JWT cookie |
| `GET` | `/logout` | Public | Clear JWT cookie and blacklist the token |
| `GET` | `/get-me` | 🔒 Private | Get the currently logged-in user's details |

#### Register / Login — Request Body
```json
// POST /api/auth/register
{ "username": "john_doe", "email": "john@example.com", "password": "secret123" }

// POST /api/auth/login
{ "email": "john@example.com", "password": "secret123" }
```

---

### Interview Routes — `/api/interview`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/` | 🔒 Private | Generate a new AI interview report |
| `GET` | `/` | 🔒 Private | Get all reports for the logged-in user |
| `GET` | `/report/:interviewId` | 🔒 Private | Get a specific report by ID |
| `POST` | `/resume/pdf/:interviewReportId` | 🔒 Private | Generate & download a tailored resume PDF |

#### Generate Report — Request (multipart/form-data)
```
resume         → PDF file (required if no selfDescription)
jobDescription → string (required)
selfDescription→ string (required if no resume)
```

#### Generate Report — Response
```json
{
  "message": "Interview report generated successfully.",
  "interviewReport": {
    "_id": "...",
    "title": "Senior Frontend Engineer",
    "matchScore": 78,
    "technicalQuestions": [
      { "question": "...", "intention": "...", "answer": "..." }
    ],
    "behavioralQuestions": [
      { "question": "...", "intention": "...", "answer": "..." }
    ],
    "skillGaps": [
      { "skill": "System Design", "severity": "high" }
    ],
    "preparationPlan": [
      { "day": 1, "focus": "Data Structures", "tasks": ["Revise arrays and linked lists", "..."] }
    ],
    "createdAt": "2025-06-01T10:00:00.000Z"
  }
}
```

---

## 🗄️ Database Models

### User
```
username  String  unique, required
email     String  unique, required
password  String  bcrypt hashed, required
```

### InterviewReport
```
user              ObjectId → users
title             String (AI-generated job title)
jobDescription    String
resume            String (extracted PDF text)
selfDescription   String
matchScore        Number (0–100)
technicalQuestions  [{ question, intention, answer }]
behavioralQuestions [{ question, intention, answer }]
skillGaps           [{ skill, severity: low|medium|high }]
preparationPlan     [{ day, focus, tasks[] }]
timestamps          createdAt, updatedAt
```

### TokenBlacklist
```
token   String (invalidated JWT on logout)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [MongoDB](https://www.mongodb.com/) — local instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A **Google Gemini API Key** — get one at [Google AI Studio](https://aistudio.google.com/app/apikey)

---

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/avik-raj/ai-interview-prep.git
cd interview-ai-yt/Backend

# 2. Install dependencies
npm install

# 3. Create .env file (see Environment Variables section below)
cp .gitignore .env   # or manually create .env

# 4. Start the development server
npm run dev
```

The backend server starts on **http://localhost:3000**.

---

### Frontend Setup

```bash
# From the repo root
cd Frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

The frontend runs on **http://localhost:5173** and proxies API calls to the backend at port 3000.

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` directory:

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/interview-ai
# or for Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interview-ai

# JSON Web Token secret (use a long, random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Google Gemini API Key
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 💡 How It Works

1. **User registers / logs in** — credentials are validated, a JWT is set as an `httpOnly` cookie.

2. **User fills the form** on the Home page:
   - Pastes the **job description**
   - Uploads their **resume PDF** and/or writes a **self-description**

3. **Backend processes the request**:
   - Multer stores the PDF in memory
   - `pdf-parse` extracts raw text from the PDF
   - The text, job description, and self-description are injected into a structured **Gemini prompt**
   - Zod schema is converted to JSON Schema and passed as `responseSchema` to enforce structured output
   - Gemini returns a fully validated JSON interview report

4. **The report is saved** to MongoDB and sent back to the frontend.

5. **Interview Report Page** displays:
   - **Match Score** ring with colour-coded severity
   - **Technical Questions** — expandable cards with intent + model answer
   - **Behavioral Questions** — same accordion layout
   - **Preparation Roadmap** — day-by-day plan with tasks
   - **Skill Gaps** — colour-coded tags by severity

6. **Download Resume** button hits the `/resume/pdf/:id` endpoint, which:
   - Retrieves the original report from MongoDB
   - Calls Gemini again to generate an HTML resume tailored to the job
   - Puppeteer renders the HTML headlessly and exports a PDF
   - The PDF streams back to the browser as a file download

---

