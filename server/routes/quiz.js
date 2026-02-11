const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getSubjects,
  getQuestions,
  submitAnswers,
  getResult,
  getLeaderboard,
  getProgress
} = require('../controllers/quizController');

// Public route (no auth required)
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.use(protect);

router.get('/subjects', getSubjects);
router.get('/subjects/:id/questions', getQuestions);
router.post('/subjects/:id/submit', submitAnswers);
router.get('/result', getResult);
router.get('/progress', getProgress);

module.exports = router;
