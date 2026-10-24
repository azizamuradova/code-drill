import db from '#db/client';

// Returns all categories//
export async function getCategories() {
  const sql = `
  SELECT * FROM categories ORDER BY id
  `;
  const { rows: categories } = await db.query(sql);
  return categories;
}
