# Code Drill

Code Drill is a coding practice platform where users can practice and improve their coding skills. Users pick a problem, write JavaScript in the browser, run it against test cases, and earn points for every problem they solve. Problems are grouped into categories and difficulty levels, so the app works for both beginners and more advanced learners.

> Fullstack capstone project for Fullstack Academy.

## Features (MVP)

- Sign up and log in
- Browse problems by category
- Write code, run it, and see test results
- Earn points for solved problems
- See progress and points on a dashboard
- Dark and light mode

## Tech Stack

- **Frontend:** React, Vite, React Router, CodeMirror (code editor)
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Auth:** bcrypt (password hashing), JSON Web Tokens

## Project Structure

```
code-drill/
├── backend/
│   ├── api/            # Express routes
│   ├── db/
│   │   ├── queries/    # SQL query functions
│   │   ├── schema.sql  # database tables
│   │   ├── seed.js     # inserts the sample data
│   │   └── seedData.js # 10 categories, 100 problems
│   ├── middleware/     # auth helpers
│   └── services/       # code runner (runs user code against tests)
└── frontend/
    └── src/
        ├── auth/       # AuthContext (login state)
        ├── components/ # Header, Footer, CodeEditor, TestResults…
        └── pages/      # React pages
```

## Database

Six tables: `users`, `categories`, `problems`, `test_cases`, `submissions`, `user_problems`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Create an account |
| POST | `/users/login` | Log in, returns a token |
| GET | `/users/me` | Get the logged-in user |
| GET | `/users/me/submissions` | Get the user's latest submissions |
| GET | `/users/me/progress` | Get solved problems, XP, and progress per category |
| GET | `/categories` | Get all categories with their problem counts |
| GET | `/categories/:id` | Get one category |
| GET | `/categories/:id/problems` | Get the problems in a category |
| GET | `/problems/:id` | Get one problem with its visible test cases |
| POST | `/problems/:id/run` | Run code against the tests (nothing is saved) |
| POST | `/problems/:id/submissions` | Submit code, save the result, and earn XP (login required) |

## Progress

- [x] Project pitch and HTML/CSS design prototype
- [x] Database schema and seed data (10 categories, 100 problems)
- [x] Register and login with JWT
- [x] Categories, Category, and Problem pages
- [x] Code runner with Run and Submit
- [x] Dashboard with XP and progress
- [x] Dark and light mode
- [ ] Deployment

## Getting Started

Requires Node.js 22+ and PostgreSQL.

**Backend**

```bash
cd backend
npm install
cp example.env .env      # then fill in DATABASE_URL and JWT_SECRET
createdb code_drill
npm run db:reset         # create tables and add sample data
npm run dev              # http://localhost:3000
```

**Frontend** (in a second terminal)

```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

Sample user: `foo` / `bar`

## Credits

- Backend started from the Fullstack Academy capstone backend template.
- Practice problems are inspired by [CodingBat](https://codingbat.com).
