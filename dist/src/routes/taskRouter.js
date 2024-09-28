"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../controller/taskController"));
const taskRouter = (0, express_1.Router)();
taskRouter.get("/getAll/:sub_category_id", taskController_1.default.getAllTask);
taskRouter.post("/getAll/filter", taskController_1.default.getAllTaskFilter);
taskRouter.post("/create", taskController_1.default.createTask);
taskRouter.put("/update", taskController_1.default.updateTask);
taskRouter.delete("/delete/:task_id", taskController_1.default.deleteTask);
exports.default = taskRouter;
