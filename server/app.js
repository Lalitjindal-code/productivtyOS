console.log('App.js is being loaded');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const taskRoutes = require('./routes/taskRoutes');
const goalRoutes = require('./routes/goalRoutes');
const pomodoroRoutes = require('./routes/pomodoroRoutes');
const userRoutes = require('./routes/userRoutes');
const rageRoutes = require('./routes/rageRoutes');
const memoryRoutes = require('./routes/memoryRoutes');
const journalRoutes = require('./routes/journalRoutes');
const aiRoutes = require('./routes/ai');
const gymRoutes = require('./routes/gymRoutes');

const app = express();

app.get('/health', (req, res) => res.send('OK'));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.get('/test', (req, res) => res.send('test'));

app.get('/api/user/feed', (req, res) => res.json({ message: 'Direct feed works' }));
app.use('/api/user', userRoutes);
app.use('/api/gym', gymRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/rage', rageRoutes);
app.use('/api/memory', memoryRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;
