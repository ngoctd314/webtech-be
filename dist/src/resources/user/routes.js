"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const _middleware_1 = require("@middleware");
const router = express_1.default.Router();
router.post('/forgot-password', controllers_1.forgotPassword);
router.get('/verify/:token', _middleware_1.authenticated, controllers_1.verifyUser);
router.get('/me', _middleware_1.authenticated, controllers_1.getMe);
router.post('/reset-password/:resetToken', controllers_1.resetPassword);
router.patch('/update-password', _middleware_1.authenticated, controllers_1.updatePassword);
router.patch('/update-info', _middleware_1.authenticated, controllers_1.updateInfo('firstName', 'lastName', 'gender', 'address'));
router.patch('/solved', _middleware_1.authenticated, controllers_1.challengeSolved);
router.get('/certificate', _middleware_1.authenticated, controllers_1.getCertificate);
router.delete('/', controllers_1.deleteUser);
exports.default = router;
