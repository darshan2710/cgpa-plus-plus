const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env vars
dotenv.config({ path: require('path').resolve(__dirname, '../server/.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (with caching for serverless)
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  const conn = await mongoose.connect(process.env.MONGO_URI);
  cachedDb = conn;
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn;
};

// Connect before handling routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/admin', require('../server/routes/admin'));
app.use('/api/quiz', require('../server/routes/quiz'));
app.use('/api/exam', require('../server/routes/exam'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CGPA++ Server is running on Vercel' });
});

module.exports = app;
