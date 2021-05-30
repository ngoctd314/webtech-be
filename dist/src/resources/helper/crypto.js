"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = exports.sha256Hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
function genToken(length) {
    return crypto_1.default.randomBytes(length).toString('hex');
}
exports.genToken = genToken;
function sha256Hash(token) {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
}
exports.sha256Hash = sha256Hash;
