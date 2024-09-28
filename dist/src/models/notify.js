"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let notify = sequelize.define('Notify', {
        notify_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        note_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        task_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING(25)
        },
        message: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        description: {
            type: sequelize_1.DataTypes.STRING(200)
        },
        sent_status: {
            type: sequelize_1.DataTypes.ENUM('waiting', 'sent', 'failed'),
            defaultValue: 'waiting',
            allowNull: false
        },
        type: {
            type: sequelize_1.DataTypes.ENUM('notification', 'alarm')
        },
        scheduled_at: {
            type: sequelize_1.DataTypes.DATE
        },
        sent_at: {
            type: sequelize_1.DataTypes.DATE
        },
        remainder_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
    }, {
        indexes: [],
        timestamps: true,
        // freezeTableName: true,
        tableName: 'notify',
        createdAt: 'ctd_date',
        updatedAt: 'udt_date'
    });
    return notify;
}
exports.default = default_1;
