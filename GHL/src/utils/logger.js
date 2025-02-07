// YOLO Mode - Quick Logging Implementation
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const logAPIRequest = (req, res, next) => {
    logger.info({
        type: 'API_REQUEST',
        method: req.method,
        path: req.path,
        params: req.params,
        query: req.query,
        body: req.body
    });
    next();
};

const logAPIResponse = (req, res, next) => {
    const originalSend = res.send;
    res.send = function(data) {
        logger.info({
            type: 'API_RESPONSE',
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            responseData: data
        });
        originalSend.apply(res, arguments);
    };
    next();
};

const errorHandler = (err, req, res, next) => {
    logger.error({
        type: 'ERROR',
        method: req.method,
        path: req.path,
        error: {
            message: err.message,
            stack: err.stack
        }
    });
    
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            code: err.code || 'INTERNAL_SERVER_ERROR'
        }
    });
};

module.exports = {
    logger,
    logAPIRequest,
    logAPIResponse,
    errorHandler
}; 