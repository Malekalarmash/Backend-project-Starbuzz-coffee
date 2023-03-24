const winston = require('winston');

// Add Winston logger
const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: {service: 'signup'},
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'combined.log'})
    ]
})

module.exports = logger;