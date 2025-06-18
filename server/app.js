const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const awardRoutes = require('./routes/awardRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],  // 👈 React dev server CRA and Vite
  credentials: true                 // 👈 Allow cookies/sessions
}));

app.use('/api/users', userRoutes);
app.use('/api/awards', awardRoutes);
app.use(errorHandler);

module.exports = app;