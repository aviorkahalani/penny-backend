"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    _code;
    constructor(code, message) {
        super(message);
        this._code = code;
    }
    get code() {
        return this._code;
    }
}
exports.AppError = AppError;
