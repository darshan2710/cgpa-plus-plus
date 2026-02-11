const Subject = require('../models/Subject');
const Result = require('../models/Result');
const User = require('../models/User');

// @desc    Create a subject
// @route   POST /api/admin/subjects
exports.createSubject = async (req, res) => {
  try {
    const { name, semester, timer, totalMarks, questions, order } = req.body;
    const subject = await Subject.create({ name, semester, timer, totalMarks, questions, order });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all subjects
// @route   GET /api/admin/subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ semester: 1, order: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a subject
// @route   PUT /api/admin/subjects/:id
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a subject
// @route   DELETE /api/admin/subjects/:id
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add questions to a subject
// @route   POST /api/admin/subjects/:id/questions
exports.addQuestions = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    subject.questions.push(...req.body.questions);
    await subject.save();
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all participants
// @route   GET /api/admin/participants
exports.getParticipants = async (req, res) => {
  try {
    const participants = await User.find({ role: 'participant' }).select('-password');
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all results with user info
// @route   GET /api/admin/results
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('user', 'name email college')
      .sort({ cgpa: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Calculate and update ranks
// @route   POST /api/admin/calculate-ranks
exports.calculateRanks = async (req, res) => {
  try {
    const results = await Result.find({ isComplete: true }).sort({ cgpa: -1 });
    
    for (let i = 0; i < results.length; i++) {
      results[i].rank = i + 1;
      await results[i].save();
    }

    res.json({ message: `Ranks calculated for ${results.length} participants`, results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export leaderboard as JSON (CSV-ready)
// @route   GET /api/admin/export-leaderboard
exports.exportLeaderboard = async (req, res) => {
  try {
    const results = await Result.find({ isComplete: true })
      .populate('user', 'name email college')
      .sort({ rank: 1 });

    const leaderboard = results.map(r => ({
      rank: r.rank,
      name: r.user.name,
      email: r.user.email,
      college: r.user.college,
      cgpa: r.cgpa,
      semesterSGPAs: r.semesterSGPAs
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const totalParticipants = await User.countDocuments({ role: 'participant' });
    const totalSubjects = await Subject.countDocuments();
    const completedQuizzes = await Result.countDocuments({ isComplete: true });
    const results = await Result.find({ isComplete: true }).sort({ cgpa: -1 }).limit(1);
    const topCGPA = results.length > 0 ? results[0].cgpa : 0;

    res.json({
      totalParticipants,
      totalSubjects,
      completedQuizzes,
      topCGPA
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
