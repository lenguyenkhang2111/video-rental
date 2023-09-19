const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.configure({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
            winston.format.metadata()
        ),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: 'logfile.log',
                handleExceptions: true,
                handleRejections: true,
            }),
            new winston.transports.MongoDB({ db: 'mongodb://127.0.0.1:27017/vidly', options: { useUnifiedTopology: true } })
        ]
    });
}