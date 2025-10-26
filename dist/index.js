"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
require("dotenv/config");
require("./db");
const app = (0, express_1.default)();
const port = process.env.PORT;
// middlewares
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello, world');
});
// routes
app.use('/api/auth', auth_routes_1.default);
app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
});
