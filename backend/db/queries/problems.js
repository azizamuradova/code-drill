import db from '#db/client';

export async function getProblemsByCategoryId(categoryId) {
  const sql = `
  SELECT * FROM problems WHERE category_id = $1
  `;
  const { rows: problems } = await db.query(sql, [categoryId]);
  return problems;
}
