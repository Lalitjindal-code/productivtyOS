const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({ url: REDIS_URL });

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

let isConnected = false;

const connect = async () => {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
    } catch (err) {
      console.warn('Redis connection failed, falling back to no-cache mode.');
    }
  }
};

const get = async (key) => {
  if (!isConnected) await connect();
  if (!isConnected) return null;
  try {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    return null;
  }
};

const set = async (key, value, ttlSeconds = 300) => {
  if (!isConnected) await connect();
  if (!isConnected) return;
  try {
    await client.set(key, JSON.stringify(value), {
      EX: ttlSeconds
    });
  } catch (err) {
    // Fail silently
  }
};

const del = async (key) => {
  if (!isConnected) await connect();
  if (!isConnected) return;
  try {
    await client.del(key);
  } catch (err) {
    // Fail silently
  }
};

module.exports = {
  get,
  set,
  del,
  client
};
