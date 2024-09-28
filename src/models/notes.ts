

import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type NotesModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): NotesModelStatic {

  let notes = <NotesModelStatic>sequelize.define('Notes', {
    note_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
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
    note_priority_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    special_des: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attachments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    note_color: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    favourite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    bookmark: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    tableName: 'notes',
    // freezeTableName: true,
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

  return notes;
}