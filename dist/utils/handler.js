"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = (fn) => {
    return async (req, res, next) => {
        try {
            return await fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.handler = handler;
