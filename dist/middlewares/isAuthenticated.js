"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_js_1 = require("../utils/http.js");
const handler_js_1 = require("../utils/handler.js");
const AppError_js_1 = require("../utils/AppError.js");
const isAuthenticated = (0, handler_js_1.handler)(async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        throw new AppError_js_1.AppError(http_js_1.UNAUTHORIZED, 'unauthorized');
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
});
exports.default = isAuthenticated;
