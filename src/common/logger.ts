import { transports, createLogger } from 'winston';
import * as path from 'path';


export interface LoggingConfig {
    file: {
        level: string,
        filename: string,
        handleExceptions: boolean,
        json: boolean,
        maxsize: number,
        maxFiles: number,
        colorize: boolean
    };
    console: {
        level: string,
        handleExceptions: boolean,
        json: boolean,
        colorize: boolean
    };
    directory: string;
}

export const loggingConfig: LoggingConfig = {
    file: {
        level: 'error',
        filename: 'exceptions.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 100,
        colorize: false
    },
    console: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: true
    },
    directory: __dirname
};

let config = loggingConfig;
config.file.filename = `${path.join(config.directory, '../logs')}/${config.file.filename}`;

export const logger = createLogger({
    transports: [
        new transports.File(config.file),
        new transports.Console(config.console)
    ],
    exceptionHandlers: [
        new transports.Console({ level: 'error' }),
        new transports.File({ filename: path.join(__dirname + '../logs/exceptions.log'), level: 'error' })
    ],
    exitOnError: false
});