"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('notes_app_node', 'root', '12345678Mm', {
    dialect: 'mysql',
    host: 'localhost',
});
exports.default = sequelize;
