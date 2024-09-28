"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifyController_1 = __importDefault(require("../controller/notifyController"));
const notifyRouter = (0, express_1.Router)();
notifyRouter.get("/getall/:status", notifyController_1.default.getAllNotifications);
notifyRouter.get("/getall/bydate/:date_status", notifyController_1.default.getAllNotificationsByDate);
notifyRouter.post("/create", notifyController_1.default.createNotify);
exports.default = notifyRouter;
