// Basic Express server setup to wire together the integration modules.

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: `./config/${process.env.NODE_ENV || 'development'}.env` });

// Import integration modules
const ghlIntegration = require('./api/ghlIntegration');
const supabaseIntegration = require('./api/supabaseIntegration');
const aiAssistant = require('./ai/aiAssistant');
const cursorIntegration = require('./ui/cursorIntegration');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to fetch information via GHL API
app.get('/api/ghl-data', async (req, res) => {
  try {
    const data = await ghlIntegration.fetchGHLData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to process AI prompt and return response
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await aiAssistant.getAIResponse(prompt);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for Cursor integration demo (could be extended)
app.get('/api/cursor-demo', (req, res) => {
  const demoData = cursorIntegration.getCursorDemoData();
  res.json(demoData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 