"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _errors_1 = require("@errors");
function handleError(err, req, res, next) {
    if (err instanceof _errors_1.HttpException) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors(),
        });
    }
    if (err.errors) {
        const errors = [];
        const list = Object.values(err.errors);
        for (const value of list) {
            if (value instanceof mongoose_1.default.Error.ValidatorError) {
                const { message, path } = value;
                errors.push({ message, field: path });
            }
            else {
                break;
            }
        }
        if (errors.length > 0) {
            return res.status(400).json({
                errors,
            });
        }
    }
    if (err.name === 'MongoError') {
        const field = Object.keys(err.keyValue);
        if (err.code === 11000) {
            const message = 'Duplicate field';
            if (field.length > 0) {
                return res.status(400).json({ errors: [{ message, field }] });
            }
        }
    }
    if (err.name === 'CastError') {
        const errors = [{ message: 'Cast error', field: err.path }];
        return res.status(400).json({ errors });
    }
    console.log(err);
    return res.status(500).json({
        message: 'Something went wrong',
        errors: err,
    });
}
exports.default = handleError;
