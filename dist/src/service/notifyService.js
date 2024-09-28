"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyService = void 0;
const sequelize_1 = require("sequelize");
const commonService_1 = __importDefault(require("../common/commonService"));
const models_1 = require("../models/models");
const constants_1 = __importDefault(require("../common/constants"));
const commonEntity_1 = __importDefault(require("../common/commonEntity"));
class NotifyService {
    getAllNotifications(req, callback) {
        const userId = req.headers.user_id;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        let condition = {
            where: {
                user_id: userId,
                sent_status: req.params.status
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['scheduled_at', 'ASC']]
        };
        commonService_1.default.findAll(condition, models_1.models.Notify, function (err, notifys) {
            callback(err, notifys);
        });
    }
    getAllNotificationsByDate(req, callback) {
        const userId = req.headers.user_id;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        let condition = {
            where: {
                user_id: userId,
                sent_status: "waiting"
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['scheduled_at', 'ASC']]
        };
        if (req.params.date_status) {
            const result = commonEntity_1.default.getDateRange(req.params.date_status);
            condition.where.status = { [sequelize_1.Op.between]: [result.from_date, result.to_date] };
        }
        commonService_1.default.findAll(condition, models_1.models.Notify, function (err, notifys) {
            callback(err, notifys);
        });
    }
    createNotify(req, callback) {
        const userId = req.headers.user_id;
        const createDate = req.body;
        createDate.user_id = req.headers.user_id;
        commonService_1.default.create(createDate, models_1.models.Notify, function (err, notifys) {
            callback(err, notifys);
        });
    }
    errorService(req, err) {
        const createData = {
            user_id: req.headers.user_id,
            err: err
        };
        commonService_1.default.create(createData, models_1.models.CommonError, function () { });
    }
}
exports.notifyService = new NotifyService();
exports.default = exports.notifyService;
