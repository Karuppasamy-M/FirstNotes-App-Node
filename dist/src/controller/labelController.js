"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelController = void 0;
const responseHandler_1 = __importDefault(require("../common/responseHandler"));
const labelService_1 = __importDefault(require("../service/labelService"));
class LabelController {
    getAllLabel(req, res) {
        try {
            labelService_1.default.getAllLabel(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    createLabel(req, res) {
        try {
            labelService_1.default.createLabel(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    updateLabel(req, res) {
        try {
            labelService_1.default.updateLabel(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    deleteLabel(req, res) {
        try {
            labelService_1.default.deleteLabel(req, function (err, response) {
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
exports.labelController = new LabelController();
exports.default = exports.labelController;
