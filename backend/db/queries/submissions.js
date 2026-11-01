import db from '#db/client';

// Saves one submission (the code and how many tests passed)//
export async function createSubmission({
  userId,
  problemId,
  code,
  status,
  testPassed,
  testTotal,
}) {
  const sql = `
  INSERT INTO submissions
    (user_id, problem_id, code, status, test_passed, test_total)
  VALUES
    ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `;
  const {
    rows: [submission],
  } = await db.query(sql, [
    userId,
    problemId,
    code,
    status,
    testPassed,
    testTotal,
  ]);
  return submission;
}

// Marks the problem as solved for the user. Returns true only the first time//
export async function markProblemSolved(userId, problemId) {
  const sql = `
  INSERT INTO user_problems
    (user_id, problem_id, solved_at)
  VALUES
    ($1, $2, now())
  ON CONFLICT (user_id, problem_id)
  DO UPDATE SET solved_at = now() WHERE user_problems.solved_at IS NULL
  RETURNING *
  `;
  const { rows } = await db.query(sql, [userId, problemId]);
  return rows.length > 0;
}

// Returns the user's latest submissions with the problem and category names//
export async function getSubmissionsByUserId(userId, limit = 10) {
  const sql = `
  SELECT
    submissions.id,
    submissions.problem_id,
    submissions.status,
    submissions.test_passed,
    submissions.test_total,
    submissions.created_at,
    problems.name AS problem_name,
    categories.name AS category_name
  FROM submissions
  JOIN problems ON problems.id = submissions.problem_id
  JOIN categories ON categories.id = problems.category_id
  WHERE submissions.user_id = $1
  ORDER BY submissions.created_at DESC
  LIMIT $2
  `;
  const { rows: submissions } = await db.query(sql, [userId, limit]);
  return submissions;
}

// Returns how many submissions the user made and how many were solved//
export async function getSubmissionCounts(userId) {
  const sql = `
  SELECT
    count(*)::int AS total,
    count(*) FILTER (WHERE status = 'solved')::int AS solved
  FROM submissions
  WHERE user_id = $1
  `;
  const {
    rows: [counts],
  } = await db.query(sql, [userId]);
  return counts;
}

// Returns solved problems and XP grouped by difficulty//
export async function getSolvedByDifficulty(userId) {
  const sql = `
  SELECT
    problems.difficulty,
    count(*)::int AS solved,
    sum(problems.xp_points)::int AS xp
  FROM user_problems
  JOIN problems ON problems.id = user_problems.problem_id
  WHERE user_problems.user_id = $1 AND user_problems.solved_at IS NOT NULL
  GROUP BY problems.difficulty
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

// Returns every category with how many of its problems the user solved//
export async function getCategoryProgress(userId) {
  const sql = `
  SELECT
    categories.id,
    categories.name,
    count(problems.id)::int AS total,
    count(user_problems.solved_at)::int AS solved
  FROM categories
  LEFT JOIN problems ON problems.category_id = categories.id
  LEFT JOIN user_problems
    ON user_problems.problem_id = problems.id AND user_problems.user_id = $1
  GROUP BY categories.id
  ORDER BY categories.position, categories.id
  `;
  const { rows: categories } = await db.query(sql, [userId]);
  return categories;
}
