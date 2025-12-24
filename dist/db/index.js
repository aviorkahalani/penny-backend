"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const main = async () => {
    const uri = process.env.NODE_ENV === 'development'
        ? process.env.MONGO_LOCAL_URI
        : process.env.MONGO_REMOTE_URI;
    await mongoose_1.default.connect(uri);
};
main()
    .then(() => {
    console.log('✔︎ connected to db');
})
    .catch((_) => {
    console.error('✗ failed to connect to db');
});
