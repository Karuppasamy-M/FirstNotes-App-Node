"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelService = void 0;
const commonService_1 = __importDefault(require("../common/commonService"));
const models_1 = require("../models/models");
class LabelService {
    getAllLabel(req, callback) {
        const userId = req.headers.user_id;
        const condition = {
            where: {
                user_id: userId
            }
        };
        commonService_1.default.findAll(condition, models_1.models.Label, function (err, label) {
            if (!label)
                return callback(new Error("Label not found."), null);
            callback(err, label);
        });
    }
    createLabel(req, callback) {
        const userId = req.headers.user_id;
        let createDate = req.body;
        createDate.user_id = userId;
        commonService_1.default.create(createDate, models_1.models.Label, function (err, label) {
            callback(err, label);
        });
    }
    updateLabel(req, callback) {
        const userId = req.headers.user_id;
        const updateDate = req.body;
        const condition = {
            where: {
                user_id: userId,
                label_id: updateDate.label_id
            }
        };
        commonService_1.default.update(updateDate, condition, models_1.models.Label, function (err, label) {
            callback(err, label);
        });
    }
    deleteLabel(req, callback) {
        const userId = req.headers.user_id;
        const labelId = req.params.label_id;
        const condition = {
            where: {
                user_id: userId,
                label_id: labelId
            }
        };
        commonService_1.default.destroy(condition, models_1.models.Label, function (err, label) {
            callback(err, label);
        });
    }
}
exports.labelService = new LabelService();
exports.default = exports.labelService;
