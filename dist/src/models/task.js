"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let task = sequelize.define('Task', {
        task_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        sub_category_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        task_priority_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING(15),
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true
        },
        task_list: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        pin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        pin_order_number: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: false
        },
        remainder_notify: {
            type: sequelize_1.DataTypes.TEXT,
        },
        remainder_alarm: {
            type: sequelize_1.DataTypes.TEXT,
        },
    }, {
        tableName: 'task',
        indexes: [
            {
                unique: true,
                fields: ['sub_category_id', 'title'],
            },
        ],
        timestamps: true,
        createdAt: 'ctd_date',
        updatedAt: 'udt_date'
    });
    return task;
}
exports.default = default_1;
