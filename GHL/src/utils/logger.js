// YOLO Mode - Quick Logging Implementation
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.printf(({ timestamp, level, message, ...meta }) => {
            return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
        })
    ),
    transports: [
        new transports.Console(),
        // You can add file transports here for production
        // new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

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