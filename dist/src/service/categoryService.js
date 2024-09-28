"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const commonService_1 = __importDefault(require("../common/commonService"));
const models_1 = require("../models/models");
const constants_1 = __importDefault(require("../common/constants"));
const sequelize_1 = require("sequelize");
class CategoryService {
    getAllCategory(req, callback) {
        const userId = req.headers.user_id;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        const condition = {
            where: {
                user_id: userId
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        commonService_1.default.findAll(condition, models_1.models.Category, function (err, category) {
            if (!category)
                return callback(new Error("Category not found."), null);
            callback(err, category);
        });
    }
    getAllCategoryFilter(req, callback) {
        const userId = req.headers.user_id;
        const data = req.body;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        const condition = {
            where: {
                user_id: userId
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        if (data.name)
            condition.where.category_name = { [sequelize_1.Op.like]: `%${data.name}%` };
        if (data.from_date && data.to_date)
            condition.where.ctd_date = { [sequelize_1.Op.between]: [data.from_date, data.to_date] };
        commonService_1.default.findAll(condition, models_1.models.Category, function (err, category) {
            // if (!category) return callback(new Error("Category not found."), null);
            callback(err, category);
        });
    }
    createCategory(req, callback) {
        const createDate = req.body;
        createDate.user_id = req.headers.user_id;
        commonService_1.default.create(createDate, models_1.models.Category, function (err, category) {
            callback(err, category);
        });
    }
    updateCategory(req, callback) {
        const userId = req.headers.user_id;
        const updateDate = req.body;
        updateDate.user_id = userId;
        const condition = {
            where: {
                user_id: userId,
                category_id: updateDate.category_id
            }
        };
        commonService_1.default.update(updateDate, condition, models_1.models.Category, function (err, category) {
            callback(err, category);
        });
    }
    deleteCategory(req, callback) {
        const userId = req.headers.user_id;
        const categoryId = req.params.category_id;
        const condition = {
            where: {
                user_id: userId,
                category_id: categoryId
            }
        };
        commonService_1.default.destroy(condition, models_1.models.Category, function (err, category) {
            callback(err, category);
        });
    }
}
exports.categoryService = new CategoryService();
exports.default = exports.categoryService;
