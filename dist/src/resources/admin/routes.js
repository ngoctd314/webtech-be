"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const _middleware_1 = require("@middleware");
const router = express_1.default.Router();
router.get('/users', _middleware_1.authenticated, _middleware_1.authorization('admin'), controllers_1.crudUser._read);
exports.default = router;
