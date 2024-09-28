"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryService = void 0;
const commonService_1 = __importDefault(require("../common/commonService"));
const models_1 = require("../models/models");
const constants_1 = require("../common/constants");
const sequelize_1 = require("sequelize");
class SubCategoryService {
    getAllSubCategory(req, callback) {
        // const userId = req.headers.user_id;
        const categoryId = req.params.category_id;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.constants.limitNumber;
        const condition = {
            where: {
                // user_id: userId,
                category_id: categoryId
            },
            limit: constants_1.constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        commonService_1.default.findAll(condition, models_1.models.SubCategory, function (err, subCategory) {
            // if (!subCategory) return callback(new Error("SubCategory not found."), null);
            callback(err, subCategory);
        });
    }
    getAllSubCategoryFilter(req, callback) {
        const userId = req.headers.user_id;
        const categoryId = req.params.category_id;
        const data = req.body;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.constants.limitNumber;
        const condition = {
            where: {
                user_id: userId,
            },
            limit: constants_1.constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        if (data.category_id)
            condition.where.category_id = data.category_id;
        if (data.name)
            condition.where.sub_category_name = { [sequelize_1.Op.like]: `%${data.name}%` };
        if (data.from_date && data.to_date)
            condition.where.ctd_date = { [sequelize_1.Op.between]: [data.from_date, data.to_date] };
        commonService_1.default.findAll(condition, models_1.models.SubCategory, function (err, subCategory) {
            // if (!subCategory) return callback(new Error("SubCategory not found."), null);
            callback(err, subCategory);
        });
    }
    createSubCategory(req, callback) {
        const createDate = req.body;
        commonService_1.default.create(createDate, models_1.models.SubCategory, function (err, subCategory) {
            callback(err, subCategory);
        });
    }
    updateSubCategory(req, callback) {
        // const userId = req.headers.user_id;
        const updateDate = req.body;
        const condition = {
            where: {
                // user_id: userId,
                sub_category_id: updateDate.sub_category_id
            }
        };
        commonService_1.default.update(updateDate, condition, models_1.models.SubCategory, function (err, subCategory) {
            callback(err, subCategory);
        });
    }
    deleteSubCategory(req, callback) {
        // const userId = req.headers.user_id;
        const subCategoryId = req.params.sub_category_id;
        const condition = {
            where: {
                // user_id: userId,
                sub_category_id: subCategoryId
            }
        };
        commonService_1.default.destroy(condition, models_1.models.SubCategory, function (err, subCategory) {
            callback(err, subCategory);
        });
    }
}
exports.subCategoryService = new SubCategoryService();
exports.default = exports.subCategoryService;
