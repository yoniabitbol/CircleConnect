"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 4000;
dotenv_1.default.config({ path: './../.env' });
const DB = process.env.DB;
mongoose_1.default.connect(DB).then(() => {
    console.log('Server-DB Connection Successful!');
});
console.log(process.env.FIREBASE_SA);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
