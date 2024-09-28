"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const commonService_1 = __importDefault(require("../common/commonService"));
const models_1 = require("../models/models");
const jwt = __importStar(require("jsonwebtoken"));
const async = __importStar(require("async"));
const constants_1 = require("../common/constants");
const commonEntity_1 = __importDefault(require("../common/commonEntity"));
class AuthService {
    signup(req, callback) {
        const data = req.body;
        async.waterfall([
            function (waterfallCallback) {
                const condition = {
                    where: {
                        mobile_number: data.mobile_number
                    }
                };
                commonService_1.default.findOne(condition, models_1.models.User, function (err, user) {
                    if (err)
                        return waterfallCallback(new Error(constants.err.other), null);
                    if (user)
                        return waterfallCallback(new Error("user already exist."), null);
                    waterfallCallback(err, user);
                });
            }, function (user, waterfallCallback) {
                const token = jwt.sign({ userId: 1 }, constants_1.constants.jwtKey.secretKey, { algorithm: 'HS512' });
                data.token = token;
                const createData = data;
                commonService_1.default.create(createData, models_1.models.User, function (err, user) {
                    if (err)
                        return waterfallCallback(new Error(constants.err.other));
                    waterfallCallback(err, user);
                });
            }
        ], function (err, result) {
            callback(err, result);
        });
    }
    login(req, callback) {
        const data = req.body;
        async.waterfall([
            function (waterfallCallback) {
                const condition = {
                    where: {
                        mobile_number: data.mobile_number
                    }
                };
                commonService_1.default.findOne(condition, models_1.models.User, function (err, user) {
                    if (err)
                        return waterfallCallback(new Error(constants.err.other), null);
                    if (!user)
                        return waterfallCallback(new Error("user doesn't exist."), null);
                    if (user.password != data.password)
                        return waterfallCallback(new Error("Wrong password"), null);
                    waterfallCallback(null, user);
                });
            }, function (user, waterfallCallback) {
                const token = jwt.sign({ userId: user.id }, constants_1.constants.jwtKey.secretKey, { algorithm: 'HS512' });
                const condition = {
                    where: {
                        id: user.id
                    }
                };
                const updateData = {
                    token: token,
                    last_login_date: commonEntity_1.default.currentTime()
                };
                commonService_1.default.update(updateData, condition, models_1.models.User, function (err, token) {
                    if (err)
                        return waterfallCallback(new Error(constants.err.other), null);
                    waterfallCallback(null, user);
                });
            }
        ], function (err, result) {
            callback(err, result);
        });
    }
    logout(req, callback) {
        const userId = req.headers.user_id;
        const condition = {
            where: {
                id: userId
            }
        };
        const updateData = {
            token: null,
            last_logout_date: Date.now()
        };
        commonService_1.default.update(updateData, condition, models_1.models.User, function (err, user) {
            callback(err, user);
        });
    }
    deleteAccount(req, callback) {
        const userId = req.headers.user_id;
        const condition = {
            where: {
                id: userId
            }
        };
        commonService_1.default.destroy(condition, models_1.models.User, function (err, user) {
            callback(err, user);
        });
    }
}
exports.authService = new AuthService();
exports.default = exports.authService;
