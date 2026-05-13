const express = require('express');
const app = express();
app.get('/api/user/rpg-status', (req, res) => res.json({ success: true, message: 'IS WORK' }));
app.listen(5001, () => console.log('Test server on 5001'));
