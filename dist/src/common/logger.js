"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggingConfig = void 0;
const winston_1 = require("winston");
const path = __importStar(require("path"));
exports.loggingConfig = {
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
let config = exports.loggingConfig;
config.file.filename = `${path.join(config.directory, '../logs')}/${config.file.filename}`;
exports.logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.File(config.file),
        new winston_1.transports.Console(config.console)
    ],
    exceptionHandlers: [
        new winston_1.transports.Console({ level: 'error' }),
        new winston_1.transports.File({ filename: path.join(__dirname + '../logs/exceptions.log'), level: 'error' })
    ],
    exitOnError: false
});
