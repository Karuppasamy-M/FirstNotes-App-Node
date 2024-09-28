"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerService = void 0;
const commonService_1 = __importDefault(require("../common/commonService"));
const models_1 = require("../models/models");
class LoggerService {
    createErrorLog(req, res, err) {
        var _a;
        const createData = {
            user_id: (_a = req.headers) === null || _a === void 0 ? void 0 : _a.user_id,
            status_code: req.status_code,
            server_status_code: req.code,
            header: req === null || req === void 0 ? void 0 : req.headers,
            request: req,
            response: res,
            api_url: req === null || req === void 0 ? void 0 : req.originalUrl,
            method: req.method,
            err_message: res === null || res === void 0 ? void 0 : res.message,
            err: err
        };
        commonService_1.default.create(createData, models_1.models.CommonError, function () { });
    }
}
exports.loggerService = new LoggerService();
exports.default = exports.loggerService;
