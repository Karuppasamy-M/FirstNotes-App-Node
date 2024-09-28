"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let notes = sequelize.define('Notes', {
        note_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
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
        note_priority_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        special_des: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        notes: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        attachments: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        label: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        note_color: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        pin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        favourite: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bookmark: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        archive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        trash: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        tableName: 'notes',
        // freezeTableName: true,
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
    return notes;
}
exports.default = default_1;
