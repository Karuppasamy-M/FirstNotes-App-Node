


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type NoteLabelsModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): NoteLabelsModelStatic {

    let noteLabel = <NoteLabelsModelStatic>sequelize.define('NoteLabels', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        note_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        label_id: {
            type: DataTypes.INTEGER.UNSIGNED,
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