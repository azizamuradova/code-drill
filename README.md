# Code Drill

Code Drill is a coding practice platform where users can practice and improve their coding skills. Users pick a problem, write JavaScript in the browser, run it against test cases, and earn points for every problem they solve. Problems are grouped into categories and difficulty levels, so the app works for both beginners and more advanced learners.

> Capstone project — work in progress.

## Features (MVP)

- Sign up and log in
- Browse problems by category
- Write code, run it, and see test results
- Earn points for solved problems
- See progress and points on a dashboard

## Tech Stack

- **Frontend:** React, Vite, React Router
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
│   │   └── seed.js     # sample data
│   └── middleware/     # auth helpers
└── frontend/
    ├── src/
    │   └── pages/      # React pages
    └── prototype/      # original HTML/CSS design
```

## Database

Six tables: `users`, `categories`, `problems`, `test_cases`, `submissions`, `user_problems`.

## API Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| POST | `/users/register` | Create an account | ✅ |
| POST | `/users/login` | Log in, returns a token | ✅ |
| GET | `/users/me` | Get the logged-in user | ✅ |
| GET | `/categories` | Get all categories | ✅ |
| GET | `/categories/:id/problems` | Get the problems in a category | ✅ |
| GET | `/problems/:id` | Get one problem with its visible test cases | ✅ |
| POST | `/problems/:id/submissions` | Submit code and run the tests | ⬜ |
| GET | `/users/me/submissions` | Get the user's past submissions | ⬜ |
| GET | `/users/me/progress` | Get solved problems and points | ⬜ |

## Progress

- [x] Project pitch and HTML/CSS design prototype
- [x] Database schema and seed data
- [x] Backend setup with register and login
- [x] Category and problem endpoints
- [x] React setup and Login page connected to the backend
- [ ] Categories, Category, and Problem pages
- [ ] Code submission and test runner
- [ ] Dashboard
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
