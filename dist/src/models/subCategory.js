"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let category = sequelize.define('SubCategory', {
        sub_category_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        category_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        sub_category_name: {
            type: sequelize_1.DataTypes.STRING(12),
            allowNull: false
        },
        pin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
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
        tableName: 'sub_category',
        // freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['category_id', 'sub_category_name'],
            },
        ],
        timestamps: true,
        createdAt: 'ctd_date',
        updatedAt: 'udt_date'
    });
    return category;
}
exports.default = default_1;
