const ExamResult = require('../models/ExamResult');
const ExamProgress = require('../models/ExamProgress');
const ExamArchive = require('../models/ExamArchive');

// ── Master Answer Key ─────────────────────────────────────────────────────────
const ANSWER_KEY = {
  // Round 1
  R1_FCP_P1_Q1: 'C', R1_FCP_P1_Q2: 'C', R1_FCP_P1_Q3: 'B',
  R1_FCP_P2_Q1: 'B', R1_FCP_P2_Q2: 'C', R1_FCP_P2_Q3: 'B',
  R1_OOPS_P1_Q1: 'C', R1_OOPS_P1_Q2: 'C', R1_OOPS_P1_Q3: 'B',
  R1_OOPS_P2_Q1: 'B', R1_OOPS_P2_Q2: 'C', R1_OOPS_P2_Q3: 'B',
  // Round 2
  R2_DSA_P1_Q1: 'C', R2_DSA_P1_Q2: 'B', R2_DSA_P1_Q3: 'C',
  R2_DSA_P2_Q1: 'A', R2_DSA_P2_Q2: 'B', R2_DSA_P2_Q3: 'C',
  R2_DD_P1_Q1: 'C', R2_DD_P1_Q2: 'B', R2_DD_P1_Q3: 'C',
  R2_DD_P2_Q1: 'B', R2_DD_P2_Q2: 'C', R2_DD_P2_Q3: 'B',
  R2_COA_P1_Q1: 'B', R2_COA_P1_Q2: 'B', R2_COA_P1_Q3: 'B',
  R2_COA_P2_Q1: 'B', R2_COA_P2_Q2: 'B', R2_COA_P2_Q3: 'A',
  // Round 3
  R3_OS_P1_Q1: 'C', R3_OS_P1_Q2: 'B', R3_OS_P1_Q3: 'A',
  R3_OS_P2_Q1: 'B', R3_OS_P2_Q2: 'A', R3_OS_P2_Q3: 'C',
  R3_DBMS_P1_Q1: 'B', R3_DBMS_P1_Q2: 'B', R3_DBMS_P1_Q3: 'C',
  R3_DBMS_P2_Q1: 'B', R3_DBMS_P2_Q2: 'B', R3_DBMS_P2_Q3: 'B',
  R3_CN_P1_Q1: 'C', R3_CN_P1_Q2: 'B', R3_CN_P1_Q3: 'B',
  R3_CN_P2_Q1: 'B', R3_CN_P2_Q2: 'C', R3_CN_P2_Q3: 'C',
  R3_SE_P1_Q1: 'B', R3_SE_P1_Q2: 'B', R3_SE_P1_Q3: 'B',
  R3_SE_P2_Q1: 'A', R3_SE_P2_Q2: 'C', R3_SE_P2_Q3: 'A',
  // Round 4
  R4_DAA_P1_Q1: 'C', R4_DAA_P1_Q2: 'B', R4_DAA_P1_Q3: 'C',
  R4_DAA_P2_Q1: 'B', R4_DAA_P2_Q2: 'C', R4_DAA_P2_Q3: 'B',
  R4_ML_P1_Q1: 'B', R4_ML_P1_Q2: 'C', R4_ML_P1_Q3: 'B',
  R4_ML_P2_Q1: 'B', R4_ML_P2_Q2: 'B', R4_ML_P2_Q3: 'B',
  R4_HPC_P1_Q1: 'C', R4_HPC_P1_Q2: 'C', R4_HPC_P1_Q3: 'B',
  R4_HPC_P2_Q1: 'B', R4_HPC_P2_Q2: 'B', R4_HPC_P2_Q3: 'B',
};

const TOTAL_QUESTIONS = Object.keys(ANSWER_KEY).length; // 78

// @desc    Submit exam answers — grades server-side
// @route   POST /api/exam/submit
exports.submitExam = async (req, res) => {
  try {
    const { answers, startedAt } = req.body;

    if (!answers || !Array.isArray(answers) || !startedAt) {
      return res.status(400).json({ message: 'Answers array and startedAt timestamp are required' });
    }

    const existing = await ExamResult.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'You have already submitted the CS Exam' });
    }

    let totalCorrect = 0;
    answers.forEach(ans => {
      if (ANSWER_KEY[ans.questionId] && ANSWER_KEY[ans.questionId] === ans.selectedOption) {
        totalCorrect++;
      }
    });

    const completedAt = new Date();
    const started = new Date(startedAt);
    const timeTakenSeconds = Math.round((completedAt - started) / 1000);
    const accuracy = parseFloat(((totalCorrect / TOTAL_QUESTIONS) * 100).toFixed(1));

    const examResult = new ExamResult({
      user: req.user._id,
      answers,
      totalCorrect,
      totalQuestions: TOTAL_QUESTIONS,
      accuracy,
      timeTakenSeconds,
      startedAt: started,
      completedAt
    });

    await examResult.save();

    // Mark live progress as inactive
    await ExamProgress.findOneAndUpdate(
      { user: req.user._id },
      { isActive: false, answeredCount: TOTAL_QUESTIONS, lastUpdatedAt: new Date() }
    );

    res.json({
      totalCorrect,
      totalQuestions: TOTAL_QUESTIONS,
      accuracy,
      timeTakenSeconds,
      message: 'Exam submitted successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already submitted the CS Exam' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update live progress — called on each answer
// @route   POST /api/exam/progress
exports.updateProgress = async (req, res) => {
  try {
    const { answeredCount, currentSection, currentRound, startedAt } = req.body;

    await ExamProgress.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        answeredCount: answeredCount || 0,
        totalQuestions: TOTAL_QUESTIONS,
        currentSection: currentSection || '',
        currentRound: currentRound || 1,
        startedAt: startedAt ? new Date(startedAt) : new Date(),
        lastUpdatedAt: new Date(),
        isActive: true
      },
      { upsert: true, new: true }
    );

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get live progress for admin — all active + completed participants
// @route   GET /api/exam/live
exports.getLiveProgress = async (req, res) => {
  try {
    // Active participants (currently taking the exam)
    const activeProgress = await ExamProgress.find({ isActive: true })
      .populate('user', 'name email college')
      .sort({ answeredCount: -1 });

    const active = activeProgress.map(p => {
      const elapsed = Math.round((Date.now() - new Date(p.startedAt).getTime()) / 1000);
      return {
        name: p.user.name,
        email: p.user.email,
        college: p.user.college,
        answeredCount: p.answeredCount,
        totalQuestions: p.totalQuestions,
        currentSection: p.currentSection,
        currentRound: p.currentRound,
        elapsedSeconds: elapsed,
        progress: parseFloat(((p.answeredCount / p.totalQuestions) * 100).toFixed(1)),
        status: 'active'
      };
    });

    // Completed participants
    const completedResults = await ExamResult.find()
      .populate('user', 'name email college')
      .sort({ totalCorrect: -1, timeTakenSeconds: 1 });

    const completed = completedResults.map((r, idx) => ({
      rank: idx + 1,
      name: r.user.name,
      email: r.user.email,
      college: r.user.college,
      totalCorrect: r.totalCorrect,
      totalQuestions: r.totalQuestions,
      accuracy: r.accuracy,
      timeTakenSeconds: r.timeTakenSeconds,
      status: 'completed'
    }));

    res.json({ active, completed, activeCount: active.length, completedCount: completed.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get exam leaderboard — sorted by score (desc), then speed (asc)
// @route   GET /api/exam/leaderboard
exports.getExamLeaderboard = async (req, res) => {
  try {
    const results = await ExamResult.find()
      .populate('user', 'name email college')
      .sort({ totalCorrect: -1, timeTakenSeconds: 1 });

    const leaderboard = results.map((r, index) => ({
      rank: index + 1,
      name: r.user.name,
      college: r.user.college,
      totalCorrect: r.totalCorrect,
      totalQuestions: r.totalQuestions,
      accuracy: r.accuracy,
      timeTakenSeconds: r.timeTakenSeconds,
      completedAt: r.completedAt
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if user already took exam
// @route   GET /api/exam/status
exports.getExamStatus = async (req, res) => {
  try {
    const existing = await ExamResult.findOne({ user: req.user._id });
    res.json({
      taken: !!existing,
      result: existing ? {
        totalCorrect: existing.totalCorrect,
        totalQuestions: existing.totalQuestions,
        accuracy: existing.accuracy,
        timeTakenSeconds: existing.timeTakenSeconds
      } : null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset exam — archive current results and clear for next batch
// @route   POST /api/exam/reset
exports.resetExam = async (req, res) => {
  try {
    const { label } = req.body; // optional label like "Batch 1 — Feb 2026"

    // Get current results sorted
    const results = await ExamResult.find()
      .populate('user', 'name email college')
      .sort({ totalCorrect: -1, timeTakenSeconds: 1 });

    if (results.length === 0) {
      return res.status(400).json({ message: 'No results to archive' });
    }

    // Create archive snapshot
    const archive = new ExamArchive({
      label: label || `Session ${new Date().toLocaleDateString()}`,
      results: results.map((r, idx) => ({
        userName: r.user.name,
        userEmail: r.user.email,
        userCollege: r.user.college,
        totalCorrect: r.totalCorrect,
        totalQuestions: r.totalQuestions,
        accuracy: r.accuracy,
        timeTakenSeconds: r.timeTakenSeconds,
        rank: idx + 1
      })),
      totalParticipants: results.length
    });

    await archive.save();

    // Clear current results and progress
    await ExamResult.deleteMany({});
    await ExamProgress.deleteMany({});

    res.json({
      message: `Archived ${results.length} results and reset for next batch`,
      archiveId: archive._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get exam history — list all archived sessions
// @route   GET /api/exam/history
exports.getExamHistory = async (req, res) => {
  try {
    const archives = await ExamArchive.find()
      .sort({ archivedAt: -1 });
    res.json(archives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a specific archive
// @route   DELETE /api/exam/history/:id
exports.deleteArchive = async (req, res) => {
  try {
    const archive = await ExamArchive.findByIdAndDelete(req.params.id);
    if (!archive) {
      return res.status(404).json({ message: 'Archive not found' });
    }
    res.json({ message: 'Archive deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
