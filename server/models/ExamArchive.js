const mongoose = require('mongoose');

const examArchiveSchema = new mongoose.Schema({
  archivedAt: {
    type: Date,
    default: Date.now
  },
  label: {
    type: String,
    default: ''
  },
  results: [{
    userName: String,
    userEmail: String,
    userCollege: String,
    totalCorrect: Number,
    totalQuestions: Number,
    accuracy: Number,
    timeTakenSeconds: Number,
    rank: Number
  }],
  totalParticipants: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('ExamArchive', examArchiveSchema);
