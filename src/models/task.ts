


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import category from './category';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type TaskModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): TaskModelStatic {

    let task = <TaskModelStatic>sequelize.define('Task', {
        task_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        sub_category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        task_priority_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        task_list: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        pin_order_number: {
            type: DataTypes.INTEGER,
            defaultValue: false
        },
        remainder_notify: {
            type: DataTypes.TEXT,
        },
        remainder_alarm: {
            type: DataTypes.TEXT,
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