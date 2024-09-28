"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let noteLabel = sequelize.define('NoteLabels', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        note_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        label_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    }, {
        tableName: 'note_labels',
        // freezeTableName: true,
        // indexes: [],
        timestamps: true,
        createdAt: 'ctd_date',
        updatedAt: 'udt_date'
    });
    return noteLabel;
}
exports.default = default_1;
