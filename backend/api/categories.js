import express from 'express';
const router = express.Router();
export default router;

import { getCategories } from '#db/queries/categories';
import { getProblemsByCategoryId } from '#db/queries/problems';

// GETS categories and sends all categories//
router.get('/', async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

router.get('/:id/problems', async (req, res) => {
  const problems = await getProblemsByCategoryId(req.params.id);
  res.send(problems);
});
