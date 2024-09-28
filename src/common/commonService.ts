import { logger } from './logger';
import { sequelize } from '../models/models';
import * as Sequelize from 'sequelize';
// import { Transaction, Instance } from "sequelize";
const crypto = require('crypto');

export interface EntityAttributes { }

export class CommonService {

    create(entityAttributes: EntityAttributes, accessObject: any, callback: Function) {
        accessObject.create(entityAttributes).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    findAll(condition: any, accessObject: any, callback: Function) {
        accessObject.findAll(condition).then((entity: any) => {
            return callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            return callback(error, null);
        });
    }

    findAndCountAll(condition: any, accessObject: any, callback: Function) {
        accessObject.findAndCountAll(condition).then((entity: any) => {
            return callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            return callback(error, null);
        });
    }

    findByPk(id: Number, accessObject: any, callback: Function) {
        accessObject.findByPk(id).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    destroy(condition: EntityAttributes, accessObject: any, callback: Function) {
        accessObject.destroy(condition).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    update(entityAttributes: any, condition: EntityAttributes, accessObject: any, callback: Function) {
        accessObject.update(entityAttributes, condition).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    upsert(entityAttributes: EntityAttributes, condition: any, accessObject: any, callback: Function) {
        accessObject.upsert(entityAttributes, condition).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    findOne(condition: any, accessObject: any, callback: Function) {
        accessObject.findOne(condition).then((entity: any) => {
            return callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            return callback(error, null);
        });
    }

    findOrCreate(condition: any, entityAttributes: EntityAttributes, accessObject: any, callback: Function) {
        accessObject.findOrCreate({ where: condition, defaults: entityAttributes }).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    bulkCreate(entityAttributes: EntityAttributes, accessObject: any, callback: Function) {
        accessObject.bulkCreate(entityAttributes).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    multiUpdateOrCreate(entityAttributes: EntityAttributes, updateFields: any, accessObject: any, callback: Function) {
        accessObject.bulkCreate(entityAttributes, { updateOnDuplicate: updateFields }).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    count(condition: any, accessObject: any, callback: Function) {
        accessObject.count(condition).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    query(condition: any, queryParams: any, callback: Function) {
        var replacement = { replacements: queryParams, type: Sequelize.QueryTypes.SELECT };
        sequelize.query(condition, replacement).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    queryType(condition: any, queryParams: any, callback: Function) {
        var replacement = { replacements: queryParams.queryParams, type: queryParams.type };
        sequelize.query(condition, replacement).then((entity: any) => {
            callback(null, entity);
        }).catch((error: Error) => {
            logger.error(error.message);
            callback(error, null);
        });
    }

    // getMaxValue(conditionKeyString, condition: any, accessObject: any, callback: Function) {
    //     accessObject.max(conditionKeyString, condition).then((response: any) => {
    //         callback(response);
    //     }).catch((error: Error) => {
    //         logger.error(error.message);
    //         callback(error, null);
    //     });
    // }

    // getMinValue(conditionKeyString, condition: any, accessObject: any, callback: Function) {
    //     accessObject.min(conditionKeyString, condition).then((response: any) => {
    //         callback(response);
    //     }).catch((error: Error) => {
    //         logger.error(error.message);
    //         callback(error, null);
    //     });
    // }

    // groupByValue(condition, fieldName: any, accessObject: any, callback: Function) {
    //     condition.attributes = {
    //         include: [[Sequelize.fn('COUNT', Sequelize.col(fieldName)), 'count']]
    //         // exclude: []
    //     };

    //     condition.group = fieldName;

    //     accessObject.findAll(condition).then((response: any) => {
    //         callback(null, response);
    //     }).catch((error: Error) => {
    //         logger.error(error.message);
    //         callback(error, null);
    //     });
    // }

}

export const commonService = new CommonService();
export default commonService;