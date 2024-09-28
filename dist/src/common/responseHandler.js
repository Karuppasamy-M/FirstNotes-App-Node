"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
const loggerService_1 = __importDefault(require("../service/loggerService"));
const notifyService_1 = __importDefault(require("../service/notifyService"));
class ResponseHandler {
    handler(req, res, err) {
        var _a;
        var response = {};
        if (err) {
            response = {
                status: false,
                message: (err === null || err === void 0 ? void 0 : err.message) ? err.message : 'Internal Error',
                code: 202,
            };
            if (((_a = err === null || err === void 0 ? void 0 : err.name) === null || _a === void 0 ? void 0 : _a.search("Sequelize")) > -1)
                response.message = constants.err.other;
            if ((err === null || err === void 0 ? void 0 : err.name) === "SequelizeValidationError")
                response.data = err.message;
            notifyService_1.default.errorService(req, err);
        }
        else if (res) {
            response = {
                status: true,
                code: 200,
                message: (res === null || res === void 0 ? void 0 : res.msg) ? res.msg : 'Success',
                data: res
            };
        }
        else {
            response = {
                status: true,
                code: 201,
                message: 'Data Empty',
                data: res
            };
        }
        if (err) {
            response.full_error = err;
            loggerService_1.default.createErrorLog(req, res, err);
        }
        response === null || response === void 0 ? true : delete response.full_error;
        return response;
    }
}
exports.ResponseHandler = ResponseHandler;
const responseHandler = new ResponseHandler();
exports.default = responseHandler;
