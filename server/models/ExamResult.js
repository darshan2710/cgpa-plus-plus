const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionId: String,
    selectedOption: String   // A, B, C, or D
  }],
  totalCorrect: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 78
  },
  accuracy: {
    type: Number,
    default: 0
  },
  timeTakenSeconds: {
    type: Number,
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// One exam result per user
examResultSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('ExamResult', examResultSchema);
