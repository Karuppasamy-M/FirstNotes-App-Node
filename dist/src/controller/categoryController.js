"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const responseHandler_1 = __importDefault(require("../common/responseHandler"));
const categoryService_1 = __importDefault(require("../service/categoryService"));
class CategoryController {
    getAllCategory(req, res, next) {
        try {
            categoryService_1.default.getAllCategory(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    getAllCategoryerFilter(req, res, next) {
        try {
            categoryService_1.default.getAllCategoryFilter(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    createCategory(req, res) {
        try {
            categoryService_1.default.createCategory(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    updateCategory(req, res) {
        try {
            categoryService_1.default.updateCategory(req, function (err, response) {
                const result = responseHandler_1.default.handler(req, response, err);
                res.send(result);
            });
        }
        catch (err) {
            const result = responseHandler_1.default.handler(req, null, err);
            res.send(result);
        }
    }
    deleteCategory(req, res) {
        try {
            categoryService_1.default.deleteCategory(req, function (err, response) {
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
exports.categoryController = new CategoryController();
exports.default = exports.categoryController;
