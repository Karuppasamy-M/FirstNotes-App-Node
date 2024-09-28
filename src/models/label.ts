


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type LabelModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): LabelModelStatic {

    let label = <LabelModelStatic>sequelize.define('Label', {
        label_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        label_name: {
            type: DataTypes.STRING(12),
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