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
    VALUES ('Warmup-1', 'Simple warmup problems', 'easy', 'Fundamentals', 'flame')`,
  );
}
