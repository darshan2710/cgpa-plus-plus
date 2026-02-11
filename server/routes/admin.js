const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  addQuestions,
  getParticipants,
  getAllResults,
  calculateRanks,
  exportLeaderboard,
  getStats
} = require('../controllers/adminController');

router.use(protect, adminOnly);

router.get('/stats', getStats);
router.route('/subjects').get(getSubjects).post(createSubject);
router.route('/subjects/:id').put(updateSubject).delete(deleteSubject);
router.post('/subjects/:id/questions', addQuestions);
router.get('/participants', getParticipants);
router.get('/results', getAllResults);
router.post('/calculate-ranks', calculateRanks);
router.get('/export-leaderboard', exportLeaderboard);

module.exports = router;
