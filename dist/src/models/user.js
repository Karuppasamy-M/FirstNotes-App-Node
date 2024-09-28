"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    let user = sequelize.define('User', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_name: {
            type: sequelize_1.DataTypes.STRING(15),
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        mobile_number: {
            type: sequelize_1.DataTypes.STRING(12),
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false,
        },
        token: {
            type: sequelize_1.DataTypes.STRING(250),
            allowNull: true,
        },
        fcm_token: {
            type: sequelize_1.DataTypes.STRING(250),
            allowNull: true,
        },
        user_icon: {
            type: sequelize_1.DataTypes.STRING(20),
        },
        security_pin: {
            type: sequelize_1.DataTypes.STRING(4),
        },
        screen_lock_pin: {
            type: sequelize_1.DataTypes.STRING(4),
        },
        hide_all_data: {
            type: sequelize_1.DataTypes.BOOLEAN(),
        },
        current_app_version: {
            type: sequelize_1.DataTypes.STRING(10),
        },
        last_login_os: {
            type: sequelize_1.DataTypes.STRING(4),
            allowNull: true
        },
        last_login_date: {
            type: sequelize_1.DataTypes.DATE,
        },
        last_logout_date: {
            type: sequelize_1.DataTypes.DATE,
        },
        last_sync_date: {
            type: sequelize_1.DataTypes.DATE,
        },
        last_backup_date: {
            type: sequelize_1.DataTypes.DATE,
        },
        offline_db_sync_date: {
            type: sequelize_1.DataTypes.DATE,
        },
    }, {
        tableName: 'user',
        // freezeTableName: true,
        // indexes: [],
        timestamps: true,
        createdAt: 'ctd_date',
        updatedAt: 'udt_date'
    });
    return user;
}
exports.default = default_1;
