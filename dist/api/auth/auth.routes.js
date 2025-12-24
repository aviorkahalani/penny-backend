"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = __importDefault(require("./auth.controller.js"));
const isAuthenticated_js_1 = __importDefault(require("../../middlewares/isAuthenticated.js"));
const router = (0, express_1.Router)();
router
    .get('/', isAuthenticated_js_1.default)
    .get('/me', isAuthenticated_js_1.default, auth_controller_js_1.default.me)
    .post('/register', auth_controller_js_1.default.register)
    .post('/login', auth_controller_js_1.default.login)
    .post('/logout', auth_controller_js_1.default.logout);
exports.default = router;
