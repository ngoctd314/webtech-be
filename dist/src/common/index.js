"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.handleError = void 0;
const errors_handle_1 = __importDefault(require("./errors.handle"));
exports.handleError = errors_handle_1.default;
const database_1 = require("./database");
Object.defineProperty(exports, "connectDB", { enumerable: true, get: function () { return database_1.connect; } });
