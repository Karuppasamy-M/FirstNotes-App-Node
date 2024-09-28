"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const responseHandler_1 = __importDefault(require("../common/responseHandler"));
const taskService_1 = __importDefault(require("../service/taskService"));
class TaskController {
    getAllTask(req, res, next) {
        try {
            taskService_1.default.getAllTask(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    getAllTaskFilter(req, res, next) {
        try {
            taskService_1.default.getAllTaskFilter(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    createTask(req, res) {
        try {
            taskService_1.default.createTask(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    updateTask(req, res) {
        try {
            taskService_1.default.updateTask(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    deleteTask(req, res) {
        try {
            taskService_1.default.deleteTask(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
}
exports.taskController = new TaskController();
exports.default = exports.taskController;
