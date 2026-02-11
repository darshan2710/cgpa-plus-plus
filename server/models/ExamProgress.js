const mongoose = require('mongoose');

const examProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answeredCount: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 78
  },
  currentSection: {
    type: String,
    default: ''
  },
  currentRound: {
    type: Number,
    default: 1
  },
  startedAt: {
    type: Date,
    required: true
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// One progress entry per user
examProgressSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('ExamProgress', examProgressSchema);
