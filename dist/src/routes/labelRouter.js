"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const labelController_1 = __importDefault(require("../controller/labelController"));
const labelRouter = (0, express_1.Router)();
labelRouter.get("/getall", labelController_1.default.getAllLabel);
labelRouter.post("/create", labelController_1.default.createLabel);
labelRouter.put("/update", labelController_1.default.updateLabel);
labelRouter.delete("/delete/:label_id", labelController_1.default.deleteLabel);
exports.default = labelRouter;
