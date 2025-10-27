"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../db/models/user");
async function register(credentials) {
    const isUserExist = await user_1.User.findOne({ email: credentials.email });
    if (isUserExist) {
        throw new Error('user already exist');
    }
    const user = new user_1.User(credentials);
    await user.save();
    const token = _generate_token(user._id);
    return { user, token };
}
async function login(credentials) {
    const { email, password } = credentials;
    const user = await user_1.User.findOne({ email });
    if (!user) {
        throw new Error('user does not exist');
    }
    const isMatchedPassword = await user.comparePasswords(password);
    if (!isMatchedPassword) {
        throw new Error('invalid user password');
    }
    const token = _generate_token(user._id);
    return { user, token };
}
async function me(id) {
    const user = await user_1.User.findById(id).select('-password');
    if (!user) {
        throw new Error('user does not exist');
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
