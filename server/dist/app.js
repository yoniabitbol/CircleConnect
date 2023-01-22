"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// eslint-disable-next-line import/no-extraneous-dependencies
const userController_1 = __importDefault(require("./controllers/userController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('api/users', userController_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.all('*', (req, res) => {
    res.status(400).json({
        status: 'failure',
        message: `Cannot find ${req.originalUrl} on this server!`,
    });
});
exports.default = app;
