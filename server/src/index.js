const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), override: true });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false
  }
);

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// simple root to avoid "Cannot GET /"
app.get('/', (_req, res) => res.send('API OK'));

// health
app.get('/api/health', async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', db: 'connected', time: new Date().toISOString() });
  } catch (e) {
    console.error('DB connection failed:', e.message);
    res.status(500).json({ status: 'error', db: 'disconnected', message: e.message });
  }
});

// auth routes
app.use('/api/auth', authRoutes);

const PORT = Number(process.env.PORT || 5000);
const HOST = '127.0.0.1'; // bind IPv4 explicitly
app.listen(PORT, HOST, () => console.log(`API running on http://${HOST}:${PORT}`));
