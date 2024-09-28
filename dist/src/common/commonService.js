"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonService = exports.CommonService = void 0;
const logger_1 = require("./logger");
const models_1 = require("../models/models");
const Sequelize = __importStar(require("sequelize"));
// import { Transaction, Instance } from "sequelize";
const crypto = require('crypto');
class CommonService {
    create(entityAttributes, accessObject, callback) {
        accessObject.create(entityAttributes).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    findAll(condition, accessObject, callback) {
        accessObject.findAll(condition).then((entity) => {
            return callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            return callback(error, null);
        });
    }
    findAndCountAll(condition, accessObject, callback) {
        accessObject.findAndCountAll(condition).then((entity) => {
            return callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            return callback(error, null);
        });
    }
    findByPk(id, accessObject, callback) {
        accessObject.findByPk(id).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    destroy(condition, accessObject, callback) {
        accessObject.destroy(condition).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    update(entityAttributes, condition, accessObject, callback) {
        accessObject.update(entityAttributes, condition).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    upsert(entityAttributes, condition, accessObject, callback) {
        accessObject.upsert(entityAttributes, condition).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    findOne(condition, accessObject, callback) {
        accessObject.findOne(condition).then((entity) => {
            return callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            return callback(error, null);
        });
    }
    findOrCreate(condition, entityAttributes, accessObject, callback) {
        accessObject.findOrCreate({ where: condition, defaults: entityAttributes }).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    bulkCreate(entityAttributes, accessObject, callback) {
        accessObject.bulkCreate(entityAttributes).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    multiUpdateOrCreate(entityAttributes, updateFields, accessObject, callback) {
        accessObject.bulkCreate(entityAttributes, { updateOnDuplicate: updateFields }).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    count(condition, accessObject, callback) {
        accessObject.count(condition).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    query(condition, queryParams, callback) {
        var replacement = { replacements: queryParams, type: Sequelize.QueryTypes.SELECT };
        models_1.sequelize.query(condition, replacement).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
    queryType(condition, queryParams, callback) {
        var replacement = { replacements: queryParams.queryParams, type: queryParams.type };
        models_1.sequelize.query(condition, replacement).then((entity) => {
            callback(null, entity);
        }).catch((error) => {
            logger_1.logger.error(error.message);
            callback(error, null);
        });
    }
}
exports.CommonService = CommonService;
exports.commonService = new CommonService();
exports.default = exports.commonService;
