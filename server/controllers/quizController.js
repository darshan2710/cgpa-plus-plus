const Subject = require('../models/Subject');
const Result = require('../models/Result');
const User = require('../models/User');

// @desc    Get all subjects (without correct answers for participants)
// @route   GET /api/quiz/subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ semester: 1, order: 1 });
    
    // Remove correct answers from response
    const sanitized = subjects.map(sub => ({
      _id: sub._id,
      name: sub.name,
      semester: sub.semester,
      timer: sub.timer,
      totalMarks: sub.totalMarks,
      questionCount: sub.questions.length,
      order: sub.order
    }));

    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get questions for a specific subject (without correct answers)
// @route   GET /api/quiz/subjects/:id/questions
exports.getQuestions = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Check if user already completed this subject
    const result = await Result.findOne({ user: req.user._id });
    if (result) {
      const alreadyDone = result.subjectResults.find(
        sr => sr.subject.toString() === req.params.id
      );
      if (alreadyDone) {
        return res.status(400).json({ message: 'You have already completed this subject' });
      }
    }

    const questions = subject.questions.map((q, index) => ({
      index,
      questionText: q.questionText,
      options: q.options
    }));

    res.json({
      _id: subject._id,
      name: subject.name,
      semester: subject.semester,
      timer: subject.timer,
      totalMarks: subject.totalMarks,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit answers for a subject
// @route   POST /api/quiz/subjects/:id/submit
exports.submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // [{questionIndex, selectedOption}]
    const subject = await Subject.findById(req.params.id);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Calculate score
    let correctCount = 0;
    answers.forEach(ans => {
      const question = subject.questions[ans.questionIndex];
      if (question && question.correctAnswer === ans.selectedOption) {
        correctCount++;
      }
    });

    const score = correctCount; // Each question = 1 mark
    const maxScore = subject.totalMarks;

    // Find or create result
    let result = await Result.findOne({ user: req.user._id });
    if (!result) {
      result = new Result({ user: req.user._id, subjectResults: [] });
    }

    // Check if already submitted
    const existingIndex = result.subjectResults.findIndex(
      sr => sr.subject.toString() === req.params.id
    );
    if (existingIndex >= 0) {
      return res.status(400).json({ message: 'Already submitted for this subject' });
    }

    // Add subject result
    result.subjectResults.push({
      subject: subject._id,
      subjectName: subject.name,
      semester: subject.semester,
      answers,
      correctCount,
      totalQuestions: subject.questions.length,
      score,
      maxScore
    });

    // Update user's completed subjects
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { completedSubjects: subject._id },
      $inc: { currentSubjectIndex: 1 }
    });

    // Calculate SGPAs for completed semesters
    const allSubjects = await Subject.find().sort({ semester: 1, order: 1 });
    const totalSubjectsCount = allSubjects.length;
    
    // Group subject results by semester
    const semesterResults = {};
    result.subjectResults.forEach(sr => {
      if (!semesterResults[sr.semester]) {
        semesterResults[sr.semester] = [];
      }
      semesterResults[sr.semester].push(sr);
    });

    // Calculate SGPA for each completed semester (score on 10-point scale)
    result.semesterSGPAs = [];
    for (const [sem, results_arr] of Object.entries(semesterResults)) {
      // Get total subjects for this semester
      const semSubjects = allSubjects.filter(s => s.semester === parseInt(sem));
      if (results_arr.length === semSubjects.length) {
        const totalScore = results_arr.reduce((sum, r) => sum + (r.score / r.maxScore) * 10, 0);
        const sgpa = parseFloat((totalScore / results_arr.length).toFixed(2));
        result.semesterSGPAs.push({ semester: parseInt(sem), sgpa });
      }
    }

    // Check if all subjects are complete
    if (result.subjectResults.length === totalSubjectsCount) {
      result.isComplete = true;
      result.completedAt = new Date();
      
      // Calculate CGPA (average of all SGPAs)
      if (result.semesterSGPAs.length > 0) {
        const totalSGPA = result.semesterSGPAs.reduce((sum, s) => sum + s.sgpa, 0);
        result.cgpa = parseFloat((totalSGPA / result.semesterSGPAs.length).toFixed(2));
      }
    }

    await result.save();

    res.json({
      subjectName: subject.name,
      score,
      maxScore,
      correctCount,
      totalQuestions: subject.questions.length,
      semesterSGPAs: result.semesterSGPAs,
      cgpa: result.cgpa,
      isComplete: result.isComplete
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's result
// @route   GET /api/quiz/result
exports.getResult = async (req, res) => {
  try {
    const result = await Result.findOne({ user: req.user._id })
      .populate('user', 'name email college');

    if (!result) {
      return res.json({ started: false, subjectResults: [] });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leaderboard
// @route   GET /api/quiz/leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const results = await Result.find({ isComplete: true })
      .populate('user', 'name email college')
      .sort({ cgpa: -1 });

    // Assign ranks
    const leaderboard = results.map((r, index) => ({
      rank: index + 1,
      name: r.user.name,
      college: r.user.college,
      cgpa: r.cgpa,
      semesterSGPAs: r.semesterSGPAs,
      completedAt: r.completedAt
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's progress
// @route   GET /api/quiz/progress
exports.getProgress = async (req, res) => {
  try {
    const result = await Result.findOne({ user: req.user._id });
    const totalSubjects = await Subject.countDocuments();
    const completedCount = result ? result.subjectResults.length : 0;

    res.json({
      totalSubjects,
      completedCount,
      completedSubjects: result ? result.subjectResults.map(sr => sr.subject) : [],
      isComplete: result ? result.isComplete : false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
