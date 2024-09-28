"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = __importDefault(require("../common/responseHandler"));
const notifyService_1 = __importDefault(require("../service/notifyService"));
class NotifyController {
    getAllNotifications(req, res) {
        try {
            notifyService_1.default.getAllNotifications(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    getAllNotificationsByDate(req, res) {
        try {
            notifyService_1.default.getAllNotificationsByDate(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    createNotify(req, res) {
        try {
            notifyService_1.default.createNotify(req, function (err, response) {
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
const notifyController = new NotifyController();
exports.default = notifyController;
