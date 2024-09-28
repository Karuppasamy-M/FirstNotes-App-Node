"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controller/categoryController"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/getall", categoryController_1.default.getAllCategory);
categoryRouter.post("/getall/filter", categoryController_1.default.getAllCategoryerFilter);
categoryRouter.post("/create", categoryController_1.default.createCategory);
categoryRouter.put("/update", categoryController_1.default.updateCategory);
categoryRouter.delete("/delete/:category_id", categoryController_1.default.deleteCategory);
exports.default = categoryRouter;
