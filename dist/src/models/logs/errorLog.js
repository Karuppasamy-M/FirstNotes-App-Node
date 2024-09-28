"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let label = sequelize.define('CommonError', {
        log_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        status_code: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        header: {
            type: sequelize_1.DataTypes.TEXT
        },
        request: {
            type: sequelize_1.DataTypes.TEXT
        },
        response: {
            type: sequelize_1.DataTypes.TEXT
        },
        api_url: {
            type: sequelize_1.DataTypes.STRING(30)
        },
        method: {
            type: sequelize_1.DataTypes.STRING(5)
        },
        err_message: {
            type: sequelize_1.DataTypes.TEXT
        },
        err: {
            type: sequelize_1.DataTypes.TEXT
        },
    }, {
        tableName: 'common_error',
        // freezeTableName: true,
        // indexes: [],
        timestamps: true,
        createdAt: 'ctd_date',
        updatedAt: false
    });
    return label;
}
exports.default = default_1;
