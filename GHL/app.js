/* Production-ready Express Application for GHL Integration */
require('dotenv').config();

const express = require('express');
const GHLIntegration = require('./ghlIntegration');
const { logger, monitorAPICall } = require('./monitoring');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

// Production-grade middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(express.json());

// Rate limiting for production
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Endpoint to retrieve contacts via GoHighLevel API
app.get('/api/contacts', async (req, res) => {
  try {
    await monitorAPICall('/api/contacts', async () => {
      const contacts = await GHLIntegration.getContacts();
      res.json(contacts);
    });
  } catch (error) {
    logger.error('Failed to retrieve contacts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to create a new contact via GoHighLevel API
app.post('/api/contacts', async (req, res) => {
  try {
    await monitorAPICall('/api/contacts', async () => {
      const contactData = req.body;
      const newContact = await GHLIntegration.createContact(contactData);
      res.status(201).json(newContact);
    });
  } catch (error) {
    logger.error('Failed to create contact:', error);
    res.status(500).json({ error: error.message });
  }
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Basic home endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the GHL Integration API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  const server = app.listen(port, () => {
    logger.info(`Server listening on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received. Closing HTTP server...');
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  });
}

module.exports = app; 