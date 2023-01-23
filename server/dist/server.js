"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: './../.env' });
const DB = process.env.DB;
const connectionOptions = {
    dbName: process.env.NODE_ENV,
};
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(DB, connectionOptions).then(() => {
    console.log('Server-DB Connection Successful!');
});
const port = 4100;
app_1.default.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
