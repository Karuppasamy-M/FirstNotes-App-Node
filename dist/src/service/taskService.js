"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const commonService_1 = __importDefault(require("../common/commonService"));
const models_1 = require("../models/models");
const constants_1 = __importDefault(require("../common/constants"));
const sequelize_1 = require("sequelize");
const async_1 = __importDefault(require("async"));
class TaskService {
    getAllTask(req, callback) {
        const userId = req.headers.user_id;
        const subCategoryId = req.params.sub_category_id;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        const condition = {
            where: {
                user_id: userId,
                sub_category_id: subCategoryId,
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        commonService_1.default.findAll(condition, models_1.models.Task, function (err, task) {
            // if (!task) return callback(new Error("Task not found."), null);
            callback(err, task);
        });
    }
    getAllTaskFilter(req, callback) {
        const userId = req.headers.user_id;
        const data = req.body;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        const condition = {
            where: {
                user_id: userId,
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        if (data.title)
            condition.where.title = { [sequelize_1.Op.like]: `%${data.title}%` };
        if (data.from_date && data.to_date)
            condition.where.ctd_date = { [sequelize_1.Op.between]: [data.from_date, data.to_date] };
        if (data.priority_id)
            condition.where.note_priority_id = data.priority_id;
        commonService_1.default.findAll(condition, models_1.models.Task, function (err, task) {
            // if (!task) return callback(new Error("Task not found."), null);
            callback(err, task);
        });
    }
    createTask(req, callback) {
        const userId = req.headers.user_id;
        let createDate = req.body;
        createDate.user_id = userId;
        commonService_1.default.create(createDate, models_1.models.Task, function (err, task) {
            callback(err, task);
        });
    }
    updateTask(req, callback) {
        const userId = req.headers.user_id;
        const updateDate = req.body;
        async_1.default.waterfall([
            function (waterfallCallback) {
                if (updateDate.notify_data) {
                    updateDate.notify_data.user_id = userId;
                    commonService_1.default.create(updateDate.notify_data, models_1.models.Notify, function (err, notify) {
                        waterfallCallback(err, notify);
                    });
                }
                else {
                    waterfallCallback(null, null);
                }
            },
            function (waterfallCallback) {
                const condition = {
                    where: {
                        user_id: userId,
                        task_id: updateDate.task_id
                    }
                };
                commonService_1.default.update(updateDate, condition, models_1.models.Task, function (err, task) {
                    waterfallCallback(err, task);
                });
            },
        ], function (err, result) {
            callback(err, result);
        });
    }
    deleteTask(req, callback) {
        const userId = req.headers.user_id;
        const taskId = req.params.task_id;
        const condition = {
            where: {
                user_id: userId,
                task_id: taskId
            }
        };
        commonService_1.default.destroy(condition, models_1.models.Task, function (err, task) {
            callback(err, task);
        });
    }
}
exports.taskService = new TaskService();
exports.default = exports.taskService;
