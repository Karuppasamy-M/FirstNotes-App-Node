


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type NotifyModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): NotifyModelStatic {

    let notify = <NotifyModelStatic>sequelize.define('Notify', {
        notify_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        note_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        task_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(25)
        },
        message: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.STRING(200)
        },
        sent_status: {
            type: DataTypes.ENUM('waiting', 'sent', 'failed'),
            defaultValue: 'waiting',
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('notification', 'alarm')
        },
        scheduled_at: {
            type: DataTypes.DATE
        },
        sent_at: {
            type: DataTypes.DATE
        },
        remainder_ref_id: {
            type: DataTypes.INTEGER
        },
        remainder_type: {
            type: DataTypes.ENUM('no repeat', 'daily', 'weekly', 'monthly'),
            defaultValue: 'no repeat'
        },
        remainder_date: {
            type: DataTypes.DATE,
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