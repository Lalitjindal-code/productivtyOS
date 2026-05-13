const axios = require('axios');

async function diagnose() {
  try {
    const response = await axios.post('http://localhost:5000/api/user/select-class', { charClass: 'Warrior' });
    console.log('Select Class Status:', response.status);
    console.log('Select Class Data:', response.data.character);
  } catch (error) {
    if (error.response) {
      console.log('Error Status:', error.response.status);
    } else {
      console.log('Error Message:', error.message);
    }
  }
}

diagnose();
