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
const config_1 = __importDefault(require("../firebase/config"));
function decodeToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                status: 'failure',
                message: 'You are not authorized to access this route',
            });
        }
        const token = authorization.split(' ')[1];
        try {
            const decodedToken = yield config_1.default.auth().verifyIdToken(token);
            req.body.uid = decodedToken.uid;
            return next();
        }
        catch (err) {
            return res.status(401).json({
                status: 'failure',
                message: 'You are not authorized to access this route',
            });
        }
    });
}
exports.default = decodeToken;
