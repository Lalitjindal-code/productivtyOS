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
const authRoutes = require('./routes/authRoutes');

const app = express();

app.get('/health', (req, res) => res.send('OK'));

app.use(cors());
app.use(helmet());
app.use(express.json());
const auth = require('./middleware/auth');

app.get('/test', (req, res) => res.send('test'));

app.get('/api/user/feed', (req, res) => res.json({ message: 'Direct feed works' }));
app.use('/api/auth', authRoutes);
app.use('/api/user', auth, userRoutes);
app.use('/api/gym', auth, gymRoutes);
app.use('/api/tasks', auth, taskRoutes);
app.use('/api/goals', auth, goalRoutes);
app.use('/api/pomodoro', auth, pomodoroRoutes);
app.use('/api/rage', auth, rageRoutes);
app.use('/api/memory', auth, memoryRoutes);
app.use('/api/journal', auth, journalRoutes);
app.use('/api/ai', auth, aiRoutes);

module.exports = app;
