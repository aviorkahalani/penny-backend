"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_1 = require("../utils/http");
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(http_1.UNAUTHORIZED).json({ message: 'unauthorized' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(http_1.INTERNAL_SERVER_ERROR).json({ error });
    }
};
exports.default = isAuthenticated;
