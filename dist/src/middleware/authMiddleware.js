"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthMiddleware {
    sessionVerifyMiddleware(req, next) {
        next();
    }
}
const authMiddleware = new AuthMiddleware();
exports.default = authMiddleware;
