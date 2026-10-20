import express from 'express';
const router = express.Router();
export default router;

import { getCategories } from '#db/queries/categories';

router.get('/', async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});
