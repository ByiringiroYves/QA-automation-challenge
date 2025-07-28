# REMWASTE User Management Automation Challenge

This repository contains a solution for the QA Engineer (Automation Specialist) Challenge. It features a simple React frontend, a Node.js Express backend API, and comprehensive automated tests covering both UI and API functionalities, integrated with a CI/CD pipeline.

## Features

### React Frontend

A simple User Management application with Login, Create, Read, Update, and Delete (CRUD) operations for users.

### Node.js Backend API

A RESTful API providing authentication and user management endpoints, with in-memory data storage.

### Functional UI Automation

End-to-end tests for the React application using Playwright, covering login and CRUD flows, including visual snapshot testing.

### API Test Automation

Direct API tests for the Node.js backend using Supertest, Mocha, and Chai, covering all CRUD endpoints and authentication scenarios (positive and negative).

### CI/CD Integration

Automated test execution via GitHub Actions on every push to develop and main branches, including code coverage reporting.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm (Node Package Manager, comes with Node.js)
- Git

## Setup Instructions (1-2 minutes to get running)

### Clone the repository:

```bash
git clone https://github.com/ByiringiroYves/QA-automation-challenge.git
cd QA-automation-challenge
```

### Switch to the develop branch (where active development occurs):

```bash
git checkout develop
```

### Install all project dependencies:

This command installs dependencies for the root project (testing frameworks), the node-backend, and the react-app.

```bash
npm install
cd node-backend && npm install && cd ..
cd react-app && npm install && cd ..
```

### Install Playwright browser dependencies (system-level):

```bash
sudo npx playwright install-deps
```

## How to Run

### Start the Backend API Server:

Open a new terminal window, navigate to the project root, and run:

```bash
cd node-backend
node server.js
```

Keep this terminal open and the server running. The API will be available at [http://localhost:3001](http://localhost:3001).

### Start the React Frontend Application:

Open another new terminal window, navigate to the project root, and run:

```bash
cd react-app
npm run dev
```

Keep this terminal open and the app running. The frontend will be available at [http://localhost:5173](http://localhost:5173).

### Run the Automated Tests:

Open a third terminal window, navigate to the project root, and run the tests.

#### Run UI Automation Tests (Playwright):

```bash
npm run test:ui
```

(On the very first run, or after UI changes, run `npm run test:ui -- --update-snapshots` once to generate/update visual snapshots.) An HTML report will open automatically upon completion.

#### Run API Automation Tests (Mocha/Supertest):

```bash
npm run test:api
```

#### Generate Code Coverage Report (for API tests):

```bash
npm run coverage
```

## Project Structure

```
.
├── .github/                 # GitHub Actions CI/CD workflows
│   └── workflows/
│       └── ci-pipeline.yml  # CI/CD pipeline definition
├── api-tests/               # API automation tests (Mocha/Supertest)
│   ├── login.test.js
│   └── items.test.js
├── node-backend/            # Node.js Express Backend API
│   └── server.js
│   └── package.json
├── playwright-tests/        # UI automation tests (Playwright)
│   ├── page-objects/
│   │   ├── AuthPage.js
│   │   └── UserListPage.js
│   └── tests/
│       ├── login.spec.js
│       └── user-management.spec.js
├── react-app/               # React Frontend Application
│   ├── src/
│   │   └── App.jsx
│   │   └── main.jsx
│   └── index.html
│   └── package.json
├── package.json             # Root project dependencies and scripts
└── TEST_PLAN.md             # This document
```

## Test Plan / Strategy

For a detailed overview of the testing scope, strategy, tools, and limitations, please refer to the `TEST_PLAN.md` document.

## Bonus Features Implemented

- **CI/CD Pipeline:** Automated testing integrated with GitHub Actions.
- **Visual Test Snapshots:** Implemented in Playwright UI tests for visual regression.
- **Code Coverage Reporting:** Integrated using `nyc` for the Node.js backend API tests.

