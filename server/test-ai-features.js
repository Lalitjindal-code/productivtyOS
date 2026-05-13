require('dotenv').config();

const aiService = require('./services/aiService');

console.log('=== Testing Fixed AI Functions ===\n');

// Test 1: Check all functions exist
console.log('✓ All functions exported:');
['generateTaskQuiz', 'generateRoast', 'generateWeeklyMemoryInsight', 'generateDNAReport', 'generateJournalSummary', 'chatWithBrain', 'suggestTaskSchedule', 'generateShameReport'].forEach(fn => {
  console.log(`  ${typeof aiService[fn] === 'function' ? '✅' : '❌'} ${fn}`);
});

// Test 2: Test generateShameReport with Groq
console.log('\n=== Testing generateShameReport with Groq ===\n');

const testGenerateShameReport = async () => {
  const mockFailedTasks = [
    { title: 'Complete project report', category: 'work' },
    { title: 'Study physics chapter 5', category: 'study' },
    { title: 'Gym session - cardio', category: 'gym' }
  ];

  console.log('Generating shame report...\n');
  const result = await aiService.generateShameReport(mockFailedTasks, 3, 5);
  
  console.log('✅ Shame Report Generated:');
  console.log('---');
  console.log(result.report);
  console.log('---\n');
  
  return result;
};

// Test 3: Test generateRoast with new signature
console.log('=== Testing generateRoast with Groq ===\n');

const testGenerateRoast = async () => {
  const mockTask = { 
    title: 'Complete project deadline',
    category: 'work',
    description: 'Submit final project report'
  };

  console.log('Generating roast...\n');
  const result = await aiService.generateRoast(mockTask, 3, 'hard', []);
  
  console.log('✅ Roast Generated:');
  console.log('---');
  console.log(`${result.emoji} ${result.title}`);
  console.log(result.roast);
  console.log('---\n');
  
  return result;
};

// Run tests
(async () => {
  try {
    await testGenerateShameReport();
    await testGenerateRoast();
    
    console.log('✅ All tests passed! Groq AI is working correctly.\n');
    console.log('🎉 You can now use AI features:');
    console.log('  📍 Wall of Shame - /api/rage/wall');
    console.log('  🔥 Generate Shame Report - POST /api/rage/shame-report');
    console.log('  😡 Generate Roast - POST /api/rage/roast/:taskId');
    console.log('  🧠 AI Memory - /api/memory/insights');
    console.log('  💬 Ask Your Brain - POST /api/memory/chat');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
})();
