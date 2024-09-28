

import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import constants from '../common/constants';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model { }

// Need to declare the static model so `findOne` etc. use correct types.
export type UserModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): MyModel;
};


export default function (sequelize: Sequelize): UserModelStatic {

  let user = <UserModelStatic>sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: {
        name: "email",
        msg: "User already exist"
      }
    },
    mobile_number: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    fcm_token: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    user_icon: {
      type: DataTypes.STRING(20),
    },
    security_pin: {
      type: DataTypes.STRING(4),
    },
    screen_lock_pin: {
      type: DataTypes.STRING(4),
    },
    hide_all_data: {
      type: DataTypes.BOOLEAN(),
    },
    current_app_version: {
      type: DataTypes.STRING(10),
    },
    last_login_os: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    last_login_date: {
      type: DataTypes.DATE,
    },
    last_logout_date: {
      type: DataTypes.DATE,
    },
    last_sync_date: {
      type: DataTypes.DATE,
    },
    last_backup_date: {
      type: DataTypes.DATE,
    },
    offline_db_sync_date: {
      type: DataTypes.DATE,
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