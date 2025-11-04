"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../db/models/user");
const AppError_1 = require("../../utils/AppError");
const http_1 = require("../../utils/http");
async function register(credentials) {
    const user = new user_1.User(credentials);
    await user.save();
    const token = _generate_token(user._id);
    const { password: pwd, ...safeUser } = user.toObject();
    return { user: safeUser, token };
}
async function login(credentials) {
    const { email, password } = credentials;
    const user = await user_1.User.findOne({ email }).select('+password');
    if (!user) {
        throw new AppError_1.AppError(http_1.NOT_FOUND, 'user not found');
    }
    const isMatchedPassword = await user.comparePasswords(password);
    if (!isMatchedPassword) {
        throw new AppError_1.AppError(http_1.BAD_REQUEST, 'incorrect password');
    }
    const token = _generate_token(user._id);
    const { password: pwd, ...safeUser } = user.toObject();
    return { user: safeUser, token };
}
async function me(id) {
    const user = await user_1.User.findById(id);
    if (!user) {
        throw new AppError_1.AppError(http_1.NOT_FOUND, 'user not found');
    }
    return user;
}
function _generate_token(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
exports.default = {
    register,
    login,
    me,
};
