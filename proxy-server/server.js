const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/flights', (req, res) => {
  const url = 'http://api.aviationstack.com/v1/flights';
  const apiKey = '19ffa78ceba6b270fc4bdbdd461be967';

  request({ url: `${url}?access_key=${apiKey}` }, (error, response, body) => {
    if (error) {
      console.error('Proxy server error:', error);
      return res.status(500).json({ type: 'error', message: error.message });
    }
    res.send(body);
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
