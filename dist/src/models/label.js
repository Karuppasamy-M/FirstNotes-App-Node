"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let label = sequelize.define('Label', {
        label_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        label_name: {
            type: sequelize_1.DataTypes.STRING(12),
            allowNull: false
        }
    }, {
        tableName: 'label',
        // freezeTableName: true,
        // indexes: [],
        timestamps: true,
        createdAt: 'ctd_date',
        updatedAt: 'udt_date'
    });
    return label;
}
exports.default = default_1;
