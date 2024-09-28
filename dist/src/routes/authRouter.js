"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', authController_1.default.signup);
authRouter.post('/login', authController_1.default.login);
authRouter.get('/logout', authController_1.default.logout);
authRouter.delete('/delete', authController_1.default.deleteAccount);
exports.default = authRouter;
