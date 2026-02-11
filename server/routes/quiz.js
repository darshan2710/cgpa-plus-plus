const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getSubjects,
  getQuestions,
  submitAnswers,
  getResult,
  getLeaderboard,
  getProgress
} = require('../controllers/quizController');

// Admin-only leaderboard
router.get('/leaderboard', protect, adminOnly, getLeaderboard);

// Protected routes
router.use(protect);

router.get('/subjects', getSubjects);
router.get('/subjects/:id/questions', getQuestions);
router.post('/subjects/:id/submit', submitAnswers);
router.get('/result', getResult);
router.get('/progress', getProgress);

module.exports = router;
