const mongoose = require('mongoose');

const subjectResultSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  subjectName: String,
  semester: Number,
  answers: [{
    questionIndex: Number,
    selectedOption: Number
  }],
  correctCount: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 10
  },
  score: {
    type: Number,
    default: 0
  },
  maxScore: {
    type: Number,
    default: 10
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjectResults: [subjectResultSchema],
  semesterSGPAs: [{
    semester: Number,
    sgpa: Number
  }],
  cgpa: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
