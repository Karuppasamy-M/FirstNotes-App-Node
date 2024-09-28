


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type SubCategoryModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): SubCategoryModelStatic {

    let category = <SubCategoryModelStatic>sequelize.define('SubCategory', {
        sub_category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        sub_category_name: {
            type: DataTypes.STRING(12),
            allowNull: false
        },
        pin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        archive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        trash: {
            type: DataTypes.BOOLEAN,
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