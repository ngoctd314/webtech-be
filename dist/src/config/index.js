"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const development_1 = __importDefault(require("./development"));
const production_1 = __importDefault(require("./production"));
const { NODE_ENV } = process.env;
function config() {
    switch (NODE_ENV) {
        case 'development': {
            return development_1.default;
        }
        case 'production':
            return production_1.default;
        default:
            return development_1.default;
    }
}
exports.default = config();
