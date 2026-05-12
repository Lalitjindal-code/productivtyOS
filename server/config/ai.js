const Groq = require('groq-sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GROQ_MODEL_NAME = 'llama-3.3-70b-versatile';
const GEMINI_MODEL_NAME = 'gemini-2.0-flash';
const AI_TIMEOUT_MS = 8000;
const GROQ_MAX_RETRIES = 2;

const groqApiKey = process.env.GROQ_API_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;
const gemini = new GoogleGenerativeAI(geminiApiKey || '');

const sleep = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const getUsageCount = (usage) => {
  if (!usage) {
    return 0;
  }

  return usage.total_tokens
    || usage.totalTokenCount
    || usage.promptTokenCount
    || usage.candidatesTokenCount
    || 0;
};

const logAiResult = (model, responseTimeMs, tokensUsed) => {
  console.log(`[AI] model=${model} responseTimeMs=${responseTimeMs} tokensUsed=${tokensUsed}`);
};

const normalizeText = (text) => {
  if (typeof text !== 'string') {
    return '';
  }

  return text.replace(/```json|```|`json/gi, '').trim();
};

const runGroqAttempt = async (prompt, systemPrompt, options = {}) => {
  if (!groq) {
    throw new Error('GROQ_API_KEY missing');
  }

  const startedAt = Date.now();
  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL_NAME,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1024,
    response_format: options.jsonMode ? { type: 'json_object' } : undefined,
  }, {
    timeout: AI_TIMEOUT_MS,
  });

  const text = completion?.choices?.[0]?.message?.content || '';
  const responseTimeMs = Date.now() - startedAt;
  const tokensUsed = getUsageCount(completion?.usage);

  logAiResult(GROQ_MODEL_NAME, responseTimeMs, tokensUsed);

  return {
    text,
    model: GROQ_MODEL_NAME,
    tokensUsed,
    responseTimeMs,
  };
};

const runGeminiFallback = async (prompt, systemPrompt, options = {}) => {
  if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY missing');
  }

  const startedAt = Date.now();
  const model = gemini.getGenerativeModel({
    model: GEMINI_MODEL_NAME,
    systemInstruction: systemPrompt,
  });

  const generation = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.7,
      maxOutputTokens: options.maxTokens ?? 1024,
    },
  });

  const response = generation.response;
  const text = response?.text?.() || '';
  const responseTimeMs = Date.now() - startedAt;
  const tokensUsed = getUsageCount(response?.usageMetadata);

  logAiResult(GEMINI_MODEL_NAME, responseTimeMs, tokensUsed);

  return {
    text,
    model: GEMINI_MODEL_NAME,
    tokensUsed,
    responseTimeMs,
  };
};

/**
 * Unified AI call with Groq primary and Gemini fallback.
 * @param {string} prompt
 * @param {string} systemPrompt
 * @param {Object} [options]
 * @param {number} [options.temperature]
 * @param {number} [options.maxTokens]
 * @param {boolean} [options.jsonMode]
 * @returns {Promise<{text: string, model: string, tokensUsed: number, responseTimeMs: number}>}
 */
const callAI = async (prompt, systemPrompt, options = {}) => {
  let lastError = null;

  for (let attempt = 0; attempt <= GROQ_MAX_RETRIES; attempt += 1) {
    try {
      return await runGroqAttempt(prompt, systemPrompt, options);
    } catch (error) {
      lastError = error;
      console.error(`[AI] Groq attempt ${attempt + 1} failed: ${error.message}`);

      if (attempt < GROQ_MAX_RETRIES) {
        await sleep(300 * (attempt + 1));
      }
    }
  }

  try {
    console.log('[AI] Falling back to Gemini.');
    return await runGeminiFallback(prompt, systemPrompt, options);
  } catch (error) {
    console.error(`[AI] Gemini fallback failed: ${error.message}`);
    throw new Error(lastError?.message || 'AI services are currently unavailable.');
  }
};

module.exports = {
  callAI,
  GROQ_MODEL_NAME,
  GEMINI_MODEL_NAME,
  AI_TIMEOUT_MS,
};
