"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class UnauthenException extends HttpException_1.default {
    constructor(errors) {
        super();
        this.errors = errors;
        this.statusCode = 401;
        Object.setPrototypeOf(this, UnauthenException.prototype);
    }
    serializeErrors() {
        return this.errors.map((error) => ({
            message: error.msg,
            field: error.param,
        }));
    }
}
exports.default = UnauthenException;
