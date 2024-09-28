"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let priority = sequelize.define('Priority', {
        priority_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        tableName: 'priority',
        // indexes: [],
        timestamps: true,
        createdAt: 'ctd_date',
        // updatedAt: false
    });
    return priority;
}
exports.default = default_1;
