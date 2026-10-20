import db from '#db/client';
import { createUser } from '#db/queries/users';

await db.connect();
await seed();
await db.end();
console.log('🌱 Database seeded.');

async function seed() {
  await createUser('foo', 'bar');
  await db.query(
    `INSERT INTO categories (name, description, difficulty, group_name, icon_name)
    VALUES
      ('Warmup-1', 'Simple warmup problems', 'easy', 'Fundamentals', 'flame'),
      ('String-1', 'Basic string problems', 'easy', 'Strings & Arrays', 'text'),
      ('Array-1', 'Basic array problems', 'easy', 'Strings & Arrays', 'list')`,
  );
  await db.query(
    `INSERT INTO problems (name, description, category_id, difficulty, status)
    VALUES
      ('sleepIn', 'Return true if we sleep in: it is not a weekday, or we are on vacation.', 1, 'easy', 'published'),
      ('sumDouble', 'Return the sum of two numbers. If they are the same, return double the sum.', 1, 'easy', 'published'),
      ('helloName', 'Return Hello name! If name is given', 2, 'easy', 'published'),
      ('firstLast6', 'Return true if the first or last number in array is 6', 3, 'easy', 'published')`,
  );
  await db.query(
    `INSERT INTO problem_code (problem_id, language, starter_code, solution_code)
    VALUES
      (1, 'javascript',
        'function sleepIn(weekday, vacation) {\n\n}',
        'function sleepIn(weekday, vacation) {\n  return !weekday || vacation;\n}'),
      (2, 'javascript',
        'function sumDouble(a, b) {\n\n}',
        'function sumDouble(a, b) {\n  return a === b ? (a + b) * 2 : a + b;\n}'),
      (3, 'javascript',
        'function helloName(name) {\n\n}',
        'function helloName(name) {\n  return "Hello " + name + "!";\n}'),
      (4, 'javascript',
        'function firstLast6(nums) {\n\n}',
        'function firstLast6(nums) {\n  return nums[0] === 6 || nums[nums.length - 1] === 6;\n}')`,
  );
  await db.query(
    `INSERT INTO test_cases (problem_id, input, output, is_visible)
    VALUES
      (1, '[false, false]', 'true', true),
      (1, '[true, false]', 'false', true),
      (1, '[false, true]', 'true', false),
      (2, '[1, 2]', '3', true),
      (2, '[2, 2]', '8', true),
      (3, '["Bob"]', '"Hello Bob!"', true),
      (3, '["Alice"]', '"Hello Alice!"', true),
      (4, '[[1, 2, 6]]', 'true', true),
      (4, '[[3, 2, 1]]', 'false', true)`,
  );
}
