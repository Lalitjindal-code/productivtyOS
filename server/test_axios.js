const axios = require('axios');
async function test() {
  try {
    const res = await axios.get('http://localhost:5002/health');
    console.log('Status:', res.status, 'Data:', res.data);
  } catch (err) {
    console.log('Error:', err.message);
    if (err.response) console.log('Response:', err.response.data);
  }
}
test();
