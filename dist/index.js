"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./db");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const auth_routes_js_1 = __importDefault(require("./api/auth/auth.routes.js"));
const budget_routes_js_1 = __importDefault(require("./api/budget/budget.routes.js"));
const category_routes_js_1 = __importDefault(require("./api/category/category.routes.js"));
const transaction_routes_js_1 = __importDefault(require("./api/transaction/transaction.routes.js"));
const dashboard_routes_js_1 = __importDefault(require("./api/dashboard/dashboard.routes.js"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3030;
const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
};
// middlewares
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello, world');
});
// routes
app.use('/api/auth', auth_routes_js_1.default);
app.use('/api/budget', budget_routes_js_1.default);
app.use('/api/category', category_routes_js_1.default);
app.use('/api/transaction', transaction_routes_js_1.default);
app.use('/api/dashboard', dashboard_routes_js_1.default);
// middlewares
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
});
