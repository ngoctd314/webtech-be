"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _middleware_1 = require("@middleware");
const controllers_1 = require("./controllers");
const router = express_1.default.Router();
router.post('/register', controllers_1.register);
router.post('/login', controllers_1.login);
router.delete('/logout', _middleware_1.authenticated, controllers_1.logout);
exports.default = router;
