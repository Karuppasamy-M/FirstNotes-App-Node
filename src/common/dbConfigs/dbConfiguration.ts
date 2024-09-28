

const config = require('config');
const dbConfig = config.get('test');

export interface DatabaseConfig {

    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging: boolean | Function;
    force: boolean;
    dialectOptions: any;
    timezone: string;
  };



export const databaseConfig : DatabaseConfig = {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    logging: false,
    // logging: console.log,
    force: true,
    dialectOptions: {
      dateStrings: true,
      typeCast: function (field:any, next:any) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      }
    },
    timezone: '+00:00'
};