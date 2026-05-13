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

app.get('/api/test-gym', (req, res) => res.json({ message: 'Gym test works' }));
app.use('/api/gym', gymRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/user', userRoutes);
app.use('/api/rage', rageRoutes);
app.use('/api/memory', memoryRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;
