import express from 'express';
import { createSubmission, markProblemSolved } from '#db/queries/submissions';
import requireUser from '#middleware/requireUser';

const router = express.Router();
export default router;
import {
  getProblemById,
  getAllTestCases,
  getVisibleTestCases,
} from '#db/queries/problems';
import { executeCode } from '#services/runner';

// GETS problems by id and sends one problem with test cases and no solution//
router.get('/:id', async (req, res) => {
  const problem = await getProblemById(req.params.id);
  if (!problem) return res.status(404).send('Problem not found.');
  const testCases = await getVisibleTestCases(problem.id);
  delete problem.solution_code;
  res.send({ ...problem, testCases });
});

router.post('/:id/run', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid problem id.' });

  const problem = await getProblemById(id);
  if (!problem) return res.status(404).json({ error: 'Problem not found.' });

  const { code } = req.body;
  if (!code) return res.status(404).json({ error: 'Code not found.' });
  const testCases = await getAllTestCases(id);
  const formattedTests = testCases.map((tc) => ({
    input: tc.input,
    expectedOutput: tc.output,
  }));

  let result;
  try {
    result = await executeCode({
      code,
      methodName: problem.name,
      testCases: formattedTests,
    });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  // Redact hidden test details
  const results = result.results.map((r, idx) => {
    const tc = testCases[r.index] ?? testCases[idx];
    if (tc && !tc.is_visible) {
      return { index: r.index, passed: r.passed };
    }
    return r;
  });

  res.json({
    status: result.status,
    testsPassed: result.passed,
    testsTotal: result.total,
    errorMessage: result.errorMessage,
    results,
  });
});

router.post('/:id/submissions', requireUser, async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid problem id.' });

  const problem = await getProblemById(id);
  if (!problem) return res.status(404).json({ error: 'Problem not found.' });

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code not found.' });

  let result;
  try {
    result = await runTests(problem, code);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  await createSubmission({
    userId: req.user.id,
    problemId: problem.id,
    code,
    status: result.status,
    testPassed: result.testsPassed,
    testTotal: result.testsTotal,
  });

  let xpEarned = 0;
  if (result.status === 'solved') {
    const isFirstSolve = await markProblemSolved(req.user.id, problem.id);
    if (isFirstSolve) xpEarned = problem.xp_points;
  }

  res.status(201).json({ ...result, xpEarned });
});

async function runTests(problem, code) {
  const testCases = await getAllTestCases(problem.id);
  const formattedTests = testCases.map((tc) => ({
    input: tc.input,
    expectedOutput: tc.output,
  }));

  const result = await executeCode({
    code,
    methodName: problem.name,
    testCases: formattedTests,
  });

  const results = result.results.map((r) => {
    const tc = testCases[r.index];
    if (tc && !tc.is_visible) {
      return { index: r.index, passed: r.passed };
    }
    return r;
  });

  return {
    status: result.status,
    testsPassed: result.passed,
    testsTotal: result.total,
    errorMessage: result.errorMessage,
    results,
  };
}
