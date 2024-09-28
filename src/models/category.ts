


import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type CategoryModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): CategoryModelStatic {

  let category = <CategoryModelStatic>sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    category_name: {
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
      defaultValue: false,
      allowNull: false
    },
    trash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    tableName: 'category',
    // freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'category_name'],
      }
    ],
    timestamps: true,
    createdAt: 'ctd_date',
    updatedAt: 'udt_date'
  });


  return category;
}