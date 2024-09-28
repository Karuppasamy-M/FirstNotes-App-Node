"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoryController_1 = __importDefault(require("../controller/subcategoryController"));
const subCategoryRouter = (0, express_1.Router)();
subCategoryRouter.get('/getall/:category_id', subcategoryController_1.default.getAllSubCategory);
subCategoryRouter.post('/getall/filter/:category_id', subcategoryController_1.default.getAllSubCategoryFilter);
subCategoryRouter.post('/create', subcategoryController_1.default.createSubCategory);
subCategoryRouter.put('/update', subcategoryController_1.default.updateSubCategory);
subCategoryRouter.delete('/delete/:sub_category_id', subcategoryController_1.default.deleteSubCategory);
exports.default = subCategoryRouter;
