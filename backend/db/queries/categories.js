import db from '#db/client';

export async function getCategories() {
  const sql = `
  SELECT * FROM categories ORDER BY id
  `;
  const { rows: categories } = await db.query(sql);
  return categories;
}
