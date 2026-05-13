const axios = require('axios');

async function diagnose() {
  const endpoints = [
    '/api/user/profile',
    '/api/user/test-rpg',
    '/api/user/rpg-status'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`http://localhost:5000${endpoint}`);
      console.log(`[${endpoint}] Status:`, response.status, 'Data:', response.data);
    } catch (error) {
      if (error.response) {
        console.log(`[${endpoint}] Error Status:`, error.response.status);
      } else {
        console.log(`[${endpoint}] Error Message:`, error.message);
      }
    }
  }
}

diagnose();
