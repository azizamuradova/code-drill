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
}
