"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const config = require('config');
const dbConfig = config.get('test');
;
exports.databaseConfig = {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    logging: false,
    // logging: console.log,
    force: true,
    dialectOptions: {
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next();
        }
    },
    timezone: '+00:00'
};
