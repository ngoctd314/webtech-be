"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = void 0;
const _errors_1 = require("@errors");
const _helper_1 = require("@helper");
const _models_1 = require("@models");
const _config_1 = __importDefault(require("@config"));
const _validator_1 = require("@validator");
const express_validator_1 = require("express-validator");
const forgotPassword = [
    _validator_1.requestValidate(express_validator_1.body('email').notEmpty().withMessage('Email is require'), express_validator_1.body('email').isEmail().withMessage('Invalid email')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const user = yield _models_1.UserModel.findByEmail(email);
            const resetToken = _helper_1.crypto.genToken(32);
            const resetTokenHashed = _helper_1.crypto.sha256Hash(resetToken);
            user.passwordResetToken = resetTokenHashed;
            user.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
            yield user.save();
            const resetUrl = `${_config_1.default.client.domain}/reset-password/${resetToken}`;
            const message = `Forgot your password? Click ${resetUrl}\nIf you didn't forget your password, please ignore this email`;
            yield _helper_1.sendMail({
                email: user.email,
                subject: 'Reset Password (valid for 10 mins)',
                text: message,
            });
            res.status(200).json({
                message: `Please check email: ${user.email} to reset password`,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.forgotPassword = forgotPassword;
const resetPassword = [
    _validator_1.requestValidate(express_validator_1.param('resetToken').notEmpty().withMessage('Invalid reset token'), express_validator_1.body('newPassword').notEmpty().withMessage('New password is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { resetToken } = req.params;
        const { newPassword } = req.body;
        const resetTokenHashed = _helper_1.crypto.sha256Hash(resetToken);
        try {
            const user = yield _models_1.UserModel.findOne({
                passwordResetToken: resetTokenHashed,
            });
            if (!user) {
                const errors = [{ msg: 'Invalid token', param: 'token' }];
                throw new _errors_1.BadRequest(errors);
            }
            if (user.passwordResetTokenExpires < new Date(Date.now())) {
                const errors = [{ msg: 'Token expires', param: 'token' }];
                throw new _errors_1.BadRequest(errors);
            }
            user.password = newPassword;
            user.passwordResetToken = '';
            if (yield user.save()) {
                res.status(200).json({
                    message: 'Reset password success. Please login again!',
                });
            }
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.resetPassword = resetPassword;
