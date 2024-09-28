


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';


// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type PriorityModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MyModel;
};

export default function (sequelize: Sequelize): PriorityModelStatic {

    let priority = <PriorityModelStatic>sequelize.define('Priority', {
        priority_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false
        }

    }, {
        tableName: 'priority',
        // indexes: [],
        timestamps: true,
        createdAt: 'ctd_date',
        // updatedAt: false
    });

    return priority;
}