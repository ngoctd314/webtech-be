"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}
exports.default = HttpException;
