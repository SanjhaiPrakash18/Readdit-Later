const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Read from environment variables
const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI || 'https://jpfhhhilbgphfpboemobmnjejaojgmcg.chromiumapp.org';
const EXTENSION_ID = process.env.CHROME_EXTENSION_ID || 'jpfhhhilbgphfpboemobmnjejaojgmcg';

const corsOptions = {
  origin: `chrome-extension://${EXTENSION_ID}`,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/config', (req, res) => {
  if (!CLIENT_ID) {
    console.error('REDDIT_CLIENT_ID environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error: Client ID not set.' });
  }
  res.json({ clientId: CLIENT_ID });
});

app.post('/exchange-token', async (req, res) => {
  const { code, code_verifier } = req.body;

  if (!code || !code_verifier) {
    return res.status(400).json({ error: 'Missing code or code_verifier' });
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('REDDIT_CLIENT_ID or REDDIT_CLIENT_SECRET environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error: Client ID or Secret not set.' });
  }

  try {
    const tokenResponse = await axios.post('https://www.reddit.com/api/v1/access_token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: code_verifier
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
          'User-Agent': 'chrome-extension:readdit-later:v1.0.3 (by /u/Appropriate-Look-875)'
        }
      }
    );

    res.json(tokenResponse.data);
  } catch (error) {
    console.error('Token exchange error on server:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      message: 'Token exchange failed',
      error: error.response ? error.response.data : error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
