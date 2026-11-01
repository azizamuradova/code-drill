import db from '#db/client';

// Returns all categories//
export async function getCategories() {
  const sql = `
  SELECT categories.*, COUNT(problems.id)::int AS problem_count
FROM categories
LEFT JOIN problems ON problems.category_id = categories.id
GROUP BY categories.id
ORDER BY categories.id
  `;
  const { rows: categories } = await db.query(sql);
  return categories;
}
export async function getCategory(id) {
  const sql = `
  SELECT * FROM categories WHERE id = $1
  `;
  const {
    rows: [category],
  } = await db.query(sql, [id]);
  return category;
}
