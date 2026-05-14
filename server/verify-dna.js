const mongoose = require('mongoose');
const Task = require('./models/Task');
const dnaService = require('./services/dnaService');
const dotenv = require('dotenv');

dotenv.config();

const TEMP_USER_ID = 'user_mvp_1';

const verifyAggregation = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/productivityos');
    console.log('Connected to MongoDB');

    // Create some test data if none exists
    const count = await Task.countDocuments({ userId: TEMP_USER_ID });
    if (count === 0) {
      console.log('Creating test tasks...');
      const categories = ['work', 'study', 'gym', 'personal'];
      const tasks = [];
      for (let i = 0; i < 20; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        tasks.push({
          userId: TEMP_USER_ID,
          title: `Test Task ${i}`,
          category: categories[Math.floor(Math.random() * categories.length)],
          status: Math.random() > 0.3 ? 'completed' : 'failed',
          completedAt: Math.random() > 0.3 ? date : null,
          createdAt: date,
          estimatedDuration: [15, 30, 45, 60][Math.floor(Math.random() * 4)]
        });
      }
      await Task.insertMany(tasks);
    }

    console.log('Aggregating 90-day data...');
    const aggregation = await dnaService.aggregateNinetyDayData(TEMP_USER_ID);
    console.log('Aggregation Results:');
    console.log(JSON.stringify(aggregation.stats, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
};

verifyAggregation();
