require('dotenv').config();

console.log('=== Diagnosing "Ask Your Brain" Issues ===\n');

// Check 1: Frontend endpoint
console.log('Issue 1: Frontend aiService endpoint');
console.log('  Frontend calls: POST /api/ai/chat');
console.log('  With params: { message, conversationHistory }');
console.log('  ❌ But backend endpoint is at: POST /api/memory/chat');
console.log('  ❌ Params should be: { messages: Array }');
console.log('  ❌ Response should be: { reply: string }\n');

// Check 2: Response format
console.log('Issue 2: Response format');
console.log('  Frontend expects: res.data.reply');
console.log('  Backend returns: { reply: string }');
console.log('  ✅ This should work IF endpoint is correct\n');

// Check 3: Test the backend endpoint
const testBackendEndpoint = async () => {
  const aiService = require('./services/aiService');
  
  console.log('Issue 3: Testing chatWithBrain function');
  
  const testMessage = 'When am I most productive?';
  const testHistory = [];
  const testContext = {
    streak: 5,
    goals: [],
    weekCompletion: { completed: 3 },
    pomodorosToday: 2,
    personalNotes: []
  };

  try {
    console.log('Calling: aiService.chatWithBrain(message, history, context)');
    console.log(`  Message: "${testMessage}"`);
    console.log('  Response: ', await aiService.chatWithBrain(testMessage, testHistory, testContext));
  } catch (error) {
    console.error('  ❌ Error:', error.message);
  }
};

testBackendEndpoint();
