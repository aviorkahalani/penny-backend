"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_js_1 = require("../utils/AppError.js");
const http_js_1 = require("../utils/http.js");
const VALIDATION_ERR_MSG = 'validation failed';
const DEFAULT_ERR_MSG = 'something went wrong.';
const errorHandler = (error, req, res, next) => {
    let response = {
        success: false,
        code: http_js_1.INTERNAL_SERVER_ERROR,
        message: DEFAULT_ERR_MSG,
    };
    if (error instanceof AppError_js_1.AppError) {
        response.code = error.code;
        response.message = error.message;
    }
    if (error instanceof mongoose_1.MongooseError) {
        response.code = http_js_1.CONFLICT;
        response.details = [{ path: 'email', message: error.message }];
    }
    if (error instanceof mongoose_1.Error.ValidationError) {
        const errors = Object.values(error.errors);
        response.code = http_js_1.BAD_REQUEST;
        response.message = VALIDATION_ERR_MSG;
        response.details = errors.map(({ path, message }) => ({ path, message }));
    }
    return res.status(response.code).json(response);
};
exports.default = errorHandler;
