"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const http_1 = require("../utils/http");
const DEFAULT_ERR_MSG = 'something went wrong.';
const errorHandler = (error, req, res, next) => {
    console.log(error);
    if (error instanceof AppError_1.AppError) {
        const { message, code } = error;
        return res.status(code).json({ message, code });
    }
    return res.status(http_1.INTERNAL_SERVER_ERROR).json({ error: DEFAULT_ERR_MSG });
};
exports.default = errorHandler;
