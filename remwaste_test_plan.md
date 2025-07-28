# REMWASTE User Management Application - Test Plan & Strategy

## 1. Introduction

This document outlines the test plan and strategy for automated testing of the REMWASTE User Management Application. The app includes a React frontend and a Node.js backend API that manages user data with CRUD operations and login capabilities.

---

## 2. Scope of Testing

### 2.1. Functional UI Automation (React Frontend)

Tests focus on simulating user interactions with the UI.

**Login Functionality:**

- Successful login with valid credentials
- Unsuccessful login with invalid credentials
- Handling empty username/password submissions (client-side validation)

**User Management (CRUD Operations):**

- Create a user with valid data
- Edit existing user details
- Delete a user
- Verify data presence/absence after actions
- Negative tests: missing fields, duplicate emails
- Cancel add/delete actions

### 2.2. API Test Automation (Node.js Backend)

Tests validate backend endpoints independently of UI.

**Authentication API (POST /login):**

- Valid login → token generation
- Invalid login attempts
- Missing credentials

**User Management API (/items - GET, POST, PUT, DELETE):**

- Get all users (GET /items)
- Create a new user (POST /items)
- Update a user (PUT /items/\:id)
- Delete a user (DELETE /items/\:id)
- Positive/negative test cases for CRUD (e.g., missing fields, duplicate emails, invalid IDs, unauthorized requests)

---

## 3. Tools Used & Rationale

| Category        | Tool(s)                             | Rationale                                                   |
| --------------- | ----------------------------------- | ----------------------------------------------------------- |
| Frontend        | React, Vite, Tailwind CSS           | Modern, component-based UI framework                        |
| Backend         | Node.js, Express, Body-Parser, CORS | Lightweight RESTful API stack                               |
| UI Automation   | Playwright                          | Fast, reliable, cross-browser E2E testing                   |
| UI Test Design  | Page Object Model (POM)             | Improves reusability and maintainability of UI tests        |
| Visual Testing  | Playwright `toHaveScreenshot()`     | Visual regression testing via snapshot comparisons          |
| API Automation  | Supertest, Mocha, Chai              | Fluent API assertions and readable test cases for REST APIs |
| Version Control | Git, GitHub                         | Code collaboration and CI/CD integration                    |

---

## 4. How to Run the Tests

### Prerequisites

- Node.js (v18+)
- npm

### 4.1. Clone the Repo

```bash
git clone https://github.com/ByiringiroYves/QA-automation-challenge.git
cd QA-automation-challenge
git checkout develop
```

### 4.2. Install Dependencies

```bash
# Root project deps
npm install

# Backend deps
cd node-backend
npm install
cd ..

# Install Playwright browser dependencies
sudo npx playwright install-deps
```

### 4.3. Start the Application

```bash
# Backend
cd node-backend
node server.js

# Frontend (in a separate terminal)
cd react-app
npm run dev
```

### 4.4. Run Tests

```bash
# UI tests
npm run test:ui
# With snapshot update (on first run or after UI change)
npm run test:ui -- --update-snapshots

# API tests
npm run test:api

# Optionally run both
npm run test:ui && npm run test:api
```

UI test results will auto-open in an HTML report.

---

## 5. Assumptions & Limitations

### 5.1. Assumptions

- Node.js (v18+) and npm installed
- Playwright system dependencies installed via `npx playwright install-deps`
- Frontend runs at `http://localhost:5173`
- Backend runs at `http://localhost:3001`
- Network is stable
- Test data is in-memory and resets with each server restart

### 5.2. Limitations

- **No Database Integration:** All data is in-memory
- **Limited UI Error Handling:** Minimal client-side validation
- **No Auth Integration:** Frontend does not use actual backend auth
- **No Performance Testing:** Not covered in this plan
- **No Security Testing:** No penetration or vulnerability tests
- **No Accessibility Testing**
- **Limited Cross-Browser Testing:** Only basic functional checks across major browsers

---

**End of Document**

