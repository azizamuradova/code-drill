DROP TABLE IF EXISTS user_achievements;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS user_problems;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS test_cases;
DROP TABLE IF EXISTS problem_code;
DROP TABLE IF EXISTS problems;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  full_name text NOT NULL,
  is_admin boolean NOT NULL DEFAULT false,
  password text NOT NULL
);

CREATE TABLE categories (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  difficulty text NOT NULL CHECK(difficulty IN ('easy', 'medium', 'hard')),
  group_name text NOT NULL,
  icon_name text NOT NULL,
  position integer NOT NULL DEFAULT 0
);

CREATE TABLE problems (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  category_id integer NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  difficulty text NOT NULL CHECK(difficulty IN ('easy', 'medium','hard')),
  xp_points integer NOT NULL DEFAULT 10,
  status text NOT NULL CHECK(status IN ('draft','pending', 'published')),
  hint text,
  author_id integer REFERENCES users(id) ON DELETE SET NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE problem_code (
  id serial PRIMARY KEY,
  problem_id integer NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  language text NOT NULL CHECK(language IN('javascript', 'python')),
  starter_code text NOT NULL,
  solution_code text NOT NULL
);

CREATE TABLE test_cases (
  id serial PRIMARY KEY,
  problem_id integer NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  input jsonb NOT NULL,
  output jsonb NOT NULL,
  is_visible boolean NOT NULL DEFAULT false,
  position integer NOT NULL DEFAULT 0
);


CREATE TABLE submissions (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id integer NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  language text NOT NULL CHECK (language IN ('javascript', 'python')),
  code text NOT NULL,
  status text NOT NULL CHECK (status IN ('solved', 'failed', 'error')),
  test_passed integer NOT NULL DEFAULT 0,
  test_total integer NOT NULL default 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE user_problems (
user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
problem_id integer NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
solved_at timestamptz,
solution_revealed boolean NOT NULL DEFAULT false
);

CREATE TABLE achievements (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text NOT NULL
);

CREATE TABLE user_achievements (
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id integer NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz NOT NULL DEFAULT now()
);