import express from 'express';
const router = express.Router();
export default router;
import { getProblemById, getVisibleTestCases } from '#db/queries/problems';

router.get('/:id', async (req, res) => {
  const problem = await getProblemById(req.params.id);
  if (!problem) return res.status(404).send('Problem not found.');
  const testCases = await getVisibleTestCases(problem.id);
  res.send({ ...problem, testCases });
});
