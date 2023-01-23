"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: [true, 'User ID required.'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name required.'],
    },
    email: {
        type: String,
        required: [true, 'Email required.'],
        // unique: true,
        lowercase: true,
    },
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
