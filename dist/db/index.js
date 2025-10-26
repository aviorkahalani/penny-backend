"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const main = async () => {
    await mongoose_1.default.connect(process.env.MONGO_LOCAL_URI);
};
main()
    .then(() => {
    console.log('✔︎ connected to db');
})
    .catch((_) => {
    console.error('✗ failed to connect to db');
});
