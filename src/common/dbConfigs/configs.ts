
'use strict';
import { databaseConfig,DatabaseConfig } from './dbConfiguration';

export class Configs {
    private _databaseConfig: DatabaseConfig;
    constructor() {
      this._databaseConfig = databaseConfig;
    }
  
    getDatabaseConfig(): DatabaseConfig {
      return this._databaseConfig;
    }
 
  }
  
  export const configs = new Configs();