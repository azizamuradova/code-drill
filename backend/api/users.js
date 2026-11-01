import express from 'express';
const router = express.Router();
export default router;

import { createUser, getUserByUsernameAndPassword } from '#db/queries/users';
import requireBody from '#middleware/requireBody';
import { createToken } from '#utils/jwt';
import requireUser from '#middleware/requireUser';
import {
  getSubmissionsByUserId,
  getSubmissionCounts,
  getSolvedByDifficulty,
  getCategoryProgress,
} from '#db/queries/submissions';

router
  .route('/register')
  .post(requireBody(['username', 'password']), async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);

    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  });

router
  .route('/login')
  .post(requireBody(['username', 'password']), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send('Invalid username or password.');

    const token = await createToken({ id: user.id });
    res.send(token);
  });

router.get('/me', requireUser, async (req, res) => {
  delete req.user.password;
  res.send(req.user);
});
// GETS the user's latest submissions//
router.get('/me/submissions', requireUser, async (req, res) => {
  const submissions = await getSubmissionsByUserId(req.user.id);
  res.send(submissions);
});

// GETS solved problems, XP and category progress for the dashboard//
router.get('/me/progress', requireUser, async (req, res) => {
  const counts = await getSubmissionCounts(req.user.id);
  const difficultyRows = await getSolvedByDifficulty(req.user.id);
  const categories = await getCategoryProgress(req.user.id);

  const byDifficulty = { easy: 0, medium: 0, hard: 0 };
  let solved = 0;
  let xp = 0;
  for (const row of difficultyRows) {
    byDifficulty[row.difficulty] = row.solved;
    solved += row.solved;
    xp += row.xp;
  }

  res.send({
    solved,
    xp,
    submissions: counts.total,
    acceptedSubmissions: counts.solved,
    byDifficulty,
    categories,
  });
});
