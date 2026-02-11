const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  marks: {
    type: Number,
    default: 1
  }
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  semester: {
    type: Number,
    required: [true, 'Semester number is required'],
    min: 1,
    max: 7
  },
  timer: {
    type: Number,
    required: true,
    default: 10,
    comment: 'Timer in minutes'
  },
  totalMarks: {
    type: Number,
    default: 10
  },
  questions: [questionSchema],
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
