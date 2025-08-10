const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Added axios
const bodyParser = require('body-parser'); // Added body-parser
const app = express();
const port = process.env.PORT || 3000;

// IMPORTANT: Replace 'chrome-extension://YOUR_EXTENSION_ID' with your actual extension ID.
// You can find your extension ID in chrome://extensions
const corsOptions = {
  origin: 'chrome-extension://jpfhhhilbgphfpboemobmnjejaojgmcg', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Use body-parser to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser to parse URL-encoded requests

// IMPORTANT: Replace with your actual Reddit Client ID and Client Secret
const CLIENT_ID = '1X-1i_wfkj2WkhucarxvFw';
const CLIENT_SECRET = 't4CVp_1qaUG_Hu0_2T1C-9q4p6iMoA'; // <<< REPLACE THIS WITH YOUR ACTUAL CLIENT SECRET
const REDIRECT_URI = 'https://jpfhhhilbgphfpboemobmnjejaojgmcg.chromiumapp.org';

app.get('/config', (req, res) => {
  res.json({ clientId: CLIENT_ID });
});

// New endpoint to handle token exchange
app.post('/exchange-token', async (req, res) => {
  const { code, code_verifier } = req.body;

  if (!code || !code_verifier) {
    return res.status(400).json({ error: 'Missing code or code_verifier' });
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
          'User-Agent': 'chrome-extension:readdit-later:v1.0.3 (by /u/Appropriate-Look-875)' // Use a descriptive User-Agent
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