import db from '#db/client';
import { createUser } from '#db/queries/users';
import { categories } from '#db/seedData';

const XP_BY_DIFFICULTY = { easy: 10, medium: 20, hard: 30 };
const VISIBLE_TESTS = 2;

await db.connect();
await seed();
await db.end();
console.log('🌱 Database seeded.');

async function seed() {
  await createUser('foo', 'bar');
  for (const [categoryIndex, category] of categories.entries()) {
    const categoryId = await insertCategory(category, categoryIndex);
    for (const [problemIndex, problem] of category.problems.entries()) {
      await insertProblem(
        problem,
        categoryId,
        category.difficulty,
        problemIndex,
      );
    }
  }
}

async function insertCategory(category, position) {
  const sql = `
  INSERT INTO categories (name, description, difficulty, group_name, icon_name, position)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id
  `;
  const {
    rows: [{ id }],
  } = await db.query(sql, [
    category.name,
    category.description,
    category.difficulty,
    category.group_name,
    category.icon_name,
    position,
  ]);
  return id;
}

async function insertProblem(problem, categoryId, difficulty, position) {
  const [, name, params] = problem.solution.match(/^function (\w+)\(([^)]*)\)/);
  const starterCode = `function ${name}(${params}) {\n\n}`;
  const sql = `
  INSERT INTO problems
    (name, description, category_id, difficulty, xp_points, starter_code, solution_code, position)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING id
  `;
  const {
    rows: [{ id }],
  } = await db.query(sql, [
    name,
    problem.description,
    categoryId,
    difficulty,
    XP_BY_DIFFICULTY[difficulty],
    starterCode,
    problem.solution,
    position,
  ]);

  const solve = new Function(`${problem.solution}\nreturn ${name};`)();
  for (const [testIndex, input] of problem.tests.entries()) {
    await db.query(
      `INSERT INTO test_cases (problem_id, input, output, is_visible, position)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        id,
        JSON.stringify(input),
        JSON.stringify(solve(...input)),
        testIndex < VISIBLE_TESTS,
        testIndex,
      ],
    );
  }
}
