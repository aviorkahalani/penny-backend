"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const handler_1 = require("../../utils/handler");
const AppError_1 = require("../../utils/AppError");
const http_1 = require("../../utils/http");
const auth_service_1 = __importDefault(require("./auth.service"));
const ONE_HOUR = 1000 * 60 * 60;
const register = (0, handler_1.handler)(async (req, res) => {
    const { email, name, password } = req.body;
    const { user, token } = await auth_service_1.default.register({
        email,
        name,
        password,
    });
    _createCookie(res, token);
    return res.status(http_1.CREATED).json(user);
});
const login = (0, handler_1.handler)(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await auth_service_1.default.login({ email, password });
    _createCookie(res, token);
    return res.status(http_1.OK).json(user);
});
const logout = (0, handler_1.handler)(async (req, res) => {
    req.userId = null;
    res.clearCookie('access_token');
    return res.status(http_1.OK).json({});
});
const me = (0, handler_1.handler)(async (req, res) => {
    if (!req.userId) {
        throw new AppError_1.AppError(http_1.UNAUTHORIZED, 'unauthorized');
    }
    if (!(0, mongoose_1.isValidObjectId)(req.userId)) {
        throw new AppError_1.AppError(http_1.BAD_REQUEST, 'invalid user id');
    }
    const id = new mongoose_1.Types.ObjectId(req.userId);
    const user = await auth_service_1.default.me(id);
    return res.status(http_1.OK).json(user);
});
function _createCookie(res, token) {
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: ONE_HOUR,
    });
}
exports.default = {
    register,
    login,
    logout,
    me,
};
