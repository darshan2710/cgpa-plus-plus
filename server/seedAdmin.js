// ── Seed Admin User ─────────────────────────────────────────────────────────
// Run once:  node seedAdmin.js
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const ADMIN = {
  name: 'Jash (Admin)',
  email: 'ui23cs29@iiitsurat.ac.in',
  college: 'IIIT Surat',
  password: 'Jash$1708',
  role: 'admin'
};

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: ADMIN.email });
    if (existing) {
      console.log('Admin user already exists:', existing.email);
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save();
        console.log('Updated role to admin');
      }
    } else {
      await User.create(ADMIN);
      console.log('Admin user created:', ADMIN.email);
    }

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

seedAdmin();
