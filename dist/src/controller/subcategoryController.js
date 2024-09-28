"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryController = void 0;
const responseHandler_1 = __importDefault(require("../common/responseHandler"));
const subCategoryService_1 = __importDefault(require("../service/subCategoryService"));
class SubCategoryController {
    getAllSubCategory(req, res) {
        try {
            subCategoryService_1.default.getAllSubCategory(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    getAllSubCategoryFilter(req, res) {
        try {
            subCategoryService_1.default.getAllSubCategoryFilter(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    createSubCategory(req, res) {
        try {
            subCategoryService_1.default.createSubCategory(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    updateSubCategory(req, res) {
        try {
            subCategoryService_1.default.updateSubCategory(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    deleteSubCategory(req, res) {
        try {
            subCategoryService_1.default.deleteSubCategory(req, function (err, response) {
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
exports.subCategoryController = new SubCategoryController();
exports.default = exports.subCategoryController;
