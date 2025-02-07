const winston = require('winston');
const { format } = winston;

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Add console logging in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

// API Performance monitoring
const monitorAPICall = async (endpoint, operation) => {
  const start = Date.now();
  try {
    await operation();
    const duration = Date.now() - start;
    logger.info({
      message: 'API Call completed',
      endpoint,
      duration,
      status: 'success'
    });
  } catch (error) {
    const duration = Date.now() - start;
    logger.error({
      message: 'API Call failed',
      endpoint,
      duration,
      error: error.message,
      status: 'error'
    });
    throw error;
  }
};

module.exports = {
  logger,
  monitorAPICall
}; 