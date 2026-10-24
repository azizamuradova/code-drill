import db from '#db/client';

// Returns all problems by their category//
export async function getProblemsByCategoryId(categoryId) {
  const sql = `
  SELECT * FROM problems WHERE category_id = $1
  `;
  const { rows: problems } = await db.query(sql, [categoryId]);
  return problems;
}

// Returns one problem by its id//
export async function getProblemById(id) {
  const sql = `
  SELECT * FROM problems WHERE id = $1
  `;
  const {
    rows: [problem],
  } = await db.query(sql, [id]);
  return problem;
}

// Returns allowed test cases of the problem//
export async function getVisibleTestCases(problemId) {
  const sql = `
  SELECT * FROM test_cases WHERE problem_id = $1 AND is_visible = true
  `;
  const { rows: testCases } = await db.query(sql, [problemId]);
  return testCases;
}
