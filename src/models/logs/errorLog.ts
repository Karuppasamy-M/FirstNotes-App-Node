


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type CommonErrorModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): CommonErrorModelStatic {

    let label = <CommonErrorModelStatic>sequelize.define('CommonError', {
        log_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        status_code: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        header: {
            type: DataTypes.TEXT
        },
        request: {
            type: DataTypes.TEXT
        },
        response: {
            type: DataTypes.TEXT
        },
        api_url: {
            type: DataTypes.STRING(30)
        },
        method: {
            type: DataTypes.STRING(5)
        },
        err_message: {
            type: DataTypes.TEXT
        },
        err: {
            type: DataTypes.TEXT
        },
    }, {
        tableName: 'common_error',
        // freezeTableName: true,
        // indexes: [],
        timestamps: true,
        createdAt: 'ctd_date',
        updatedAt: false
    });

    return label;
}