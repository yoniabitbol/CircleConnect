"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Get all users not implemented yet',
    });
};
const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Get user not implemented yet',
    });
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // maybe add some better handling for duplicate users
        const newUser = yield userModel_1.default.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
        // }
    }
    catch (err) {
        res.status(400).json({
            status: `ERROR: ${err}`,
            message: 'error adding user',
        });
    }
});
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Edit user not implemented yet',
    });
};
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Delete user not implemented yet',
    });
};
exports.default = {
    getAllUsers, getUser, createUser, updateUser, deleteUser,
};
