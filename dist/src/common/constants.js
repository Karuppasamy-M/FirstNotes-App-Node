"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
class Constants {
    constructor() {
        this.jwtKey = {
            secretKey: 'notesApp17',
            exp_time: '30d'
        };
        this.limitNumber = 10;
    }
}
exports.constants = new Constants();
exports.default = exports.constants;
