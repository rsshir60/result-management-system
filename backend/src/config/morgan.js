const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });

// Custom token for response time in milliseconds
morgan.token('response-time-ms', function (req, res) {
    return res.responseTime ? `${res.responseTime} ms` : '-';
});

// Custom format string
const morganFormat = ':method :url :status :response-time-ms - :res[content-length] :date[web]';

// Setup the logger
const setupMorgan = () => {
    const responseTimeMiddleware = (req, res, next) => {
        const startHrTime = process.hrtime();
        
        res.on('finish', () => {
            const elapsedHrTime = process.hrtime(startHrTime);
            const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
            res.responseTime = elapsedTimeInMs.toFixed(3);
        });

        next();
    };

    return [
        responseTimeMiddleware,
        morgan(morganFormat),
        morgan(morganFormat, { stream: accessLogStream })
    ];
};

module.exports = setupMorgan;