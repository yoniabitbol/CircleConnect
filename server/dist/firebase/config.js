"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './../.env' });
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(JSON.parse(process.env.FIREBASE_SA)),
});
