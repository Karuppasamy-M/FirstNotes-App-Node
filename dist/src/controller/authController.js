"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authService_1 = __importDefault(require("../service/authService"));
const responseHandler_1 = __importDefault(require("../common/responseHandler"));
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                authService_1.default.signup(req, function (err, response) {
                    const result = responseHandler_1.default.handler(req, response, err);
                    res.send(result);
                });
            }
            catch (err) {
                const result = responseHandler_1.default.handler(req, null, err);
                res.send(result);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                authService_1.default.login(req, function (err, response) {
                    const result = responseHandler_1.default.handler(req, response, err);
                    res.send(result);
                });
            }
            catch (err) {
                const result = responseHandler_1.default.handler(req, null, err);
                res.send(result);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                authService_1.default.logout(req, function (err, response) {
                    const result = responseHandler_1.default.handler(req, response, err);
                    res.send(result);
                });
            }
            catch (err) {
                const result = responseHandler_1.default.handler(req, null, err);
                res.send(result);
            }
        });
    }
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                authService_1.default.deleteAccount(req, function (err, response) {
                    const result = responseHandler_1.default.handler(req, response, err);
                    res.send(result);
                });
            }
            catch (err) {
                const result = responseHandler_1.default.handler(req, null, err);
                res.send(result);
            }
        });
    }
}
exports.authController = new AuthController();
exports.default = exports.authController;
