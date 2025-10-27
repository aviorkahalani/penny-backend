"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const http_1 = require("../../utils/http");
const mongoose_1 = __importDefault(require("mongoose"));
async function register(req, res) {
    try {
        const { email, name, password } = req.body;
        const { user, token } = await auth_service_1.default.register({
            email,
            name,
            password,
        });
        _createCookie(res, token);
        return res.status(http_1.CREATED).json(user);
    }
    catch (error) {
        return res.status(http_1.BAD_REQUEST).json({ error });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { user, token } = await auth_service_1.default.login({ email, password });
        _createCookie(res, token);
        return res.status(http_1.OK).json(user);
    }
    catch (error) {
        return res.status(http_1.BAD_REQUEST).json({ error });
    }
}
async function logout(req, res) {
    try {
        req.userId = null;
        res.clearCookie('access_token');
        return res.status(http_1.OK).json({});
    }
    catch (error) {
        return res.status(http_1.BAD_REQUEST).json({ error });
    }
}
async function me(req, res) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(http_1.UNAUTHORIZED).json({ message: 'unauthorized' });
        }
        if (!mongoose_1.default.isValidObjectId(userId)) {
            return res.status(http_1.BAD_REQUEST).json({ message: 'invalid id' });
        }
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const user = await auth_service_1.default.me(id);
        return res.status(http_1.OK).json(user);
    }
    catch (error) {
        return res.status(http_1.BAD_REQUEST).json({ error });
    }
}
function _createCookie(res, token) {
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
    });
}
exports.default = {
    register,
    login,
    logout,
    me,
};
