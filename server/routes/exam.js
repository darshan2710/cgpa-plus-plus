const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  submitExam,
  getExamLeaderboard,
  getExamStatus,
  updateProgress,
  getLiveProgress,
  resetExam,
  getExamHistory,
  deleteArchive
} = require('../controllers/examController');

// Admin-only routes
router.get('/leaderboard', protect, adminOnly, getExamLeaderboard);
router.get('/live', protect, adminOnly, getLiveProgress);
router.post('/reset', protect, adminOnly, resetExam);
router.get('/history', protect, adminOnly, getExamHistory);
router.delete('/history/:id', protect, adminOnly, deleteArchive);

// Protected routes (all authenticated users)
router.use(protect);

router.post('/submit', submitExam);
router.post('/progress', updateProgress);
router.get('/status', getExamStatus);

module.exports = router;
