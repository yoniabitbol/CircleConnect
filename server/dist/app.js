"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const decodeToken_1 = __importDefault(require("./middleware/decodeToken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(decodeToken_1.default);
app.use('/api/users', userRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Default Route');
});
app.all('*', (req, res) => {
    res.status(400).json({
        status: 'failure',
        message: `Cannot find ${req.originalUrl} on this server!`,
    });
});
exports.default = app;
