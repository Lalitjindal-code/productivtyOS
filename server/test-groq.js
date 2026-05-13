require('dotenv').config();
const Groq = require('groq-sdk');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL_NAME = 'llama-3.3-70b-versatile';

console.log('=== Testing Groq AI ===\n');

if (!GROQ_API_KEY) {
  console.error('❌ ERROR: GROQ_API_KEY is not set in .env file');
  process.exit(1);
}

console.log('✅ GROQ_API_KEY found');
console.log(`API Key (first 20 chars): ${GROQ_API_KEY.substring(0, 20)}...`);
console.log(`Model: ${GROQ_MODEL_NAME}\n`);

const groq = new Groq({ apiKey: GROQ_API_KEY });

const testGroq = async () => {
  try {
    console.log('🚀 Sending test request to Groq...\n');
    
    const startTime = Date.now();
    
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL_NAME,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Respond with a short, concise answer.'
        },
        {
          role: 'user',
          content: 'Say hello in one sentence.'
        }
      ],
      temperature: 0.7,
      max_tokens: 256,
    }, {
      timeout: 8000,
    });

    const responseTime = Date.now() - startTime;
    const response = completion?.choices?.[0]?.message?.content || '';
    const tokens = completion?.usage?.total_tokens || 0;

    console.log('✅ SUCCESS! Groq AI is working\n');
    console.log('--- Response ---');
    console.log(response);
    console.log('\n--- Metrics ---');
    console.log(`Response Time: ${responseTime}ms`);
    console.log(`Tokens Used: ${tokens}`);
    console.log(`Input Tokens: ${completion?.usage?.prompt_tokens}`);
    console.log(`Output Tokens: ${completion?.usage?.completion_tokens}`);
    
  } catch (error) {
    console.error('❌ ERROR: Failed to call Groq AI\n');
    console.error('Error Message:', error.message);
    console.error('Error Code:', error.code);
    console.error('Error Status:', error.status);
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error('\n💡 Suggestion: Your API key might be invalid or expired.');
    } else if (error.message.includes('timeout') || error.message.includes('TIMEOUT')) {
      console.error('\n💡 Suggestion: Request timed out. Check your internet connection.');
    } else if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Suggestion: Network error. Check your internet connection.');
    }
    
    process.exit(1);
  }
};

testGroq();
