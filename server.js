require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes'); // declare once

const app = express();
app.use(express.json());
app.use(cors());

// Health check
app.get('/api/health', (req, res) => {
  db.ping(err => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        db: 'disconnected',
        time: new Date().toISOString()
      });
    }
    res.json({
      status: 'ok',
      db: 'connected',
      time: new Date().toISOString()
    });
  });
});

// Routes
app.use('/api/auth', authRoutes); // mount ONCE (covers /auth/signup, /auth/login, /profile, etc.)

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
