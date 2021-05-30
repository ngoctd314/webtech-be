"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authenticated = void 0;
const authenticated_1 = __importDefault(require("./authenticated"));
exports.authenticated = authenticated_1.default;
const authorization_1 = __importDefault(require("./authorization"));
exports.authorization = authorization_1.default;
