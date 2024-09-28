'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.Configs = void 0;
const dbConfiguration_1 = require("./dbConfiguration");
class Configs {
    constructor() {
        this._databaseConfig = dbConfiguration_1.databaseConfig;
    }
    getDatabaseConfig() {
        return this._databaseConfig;
    }
}
exports.Configs = Configs;
exports.configs = new Configs();
