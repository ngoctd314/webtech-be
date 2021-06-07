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
Object.defineProperty(exports, "__esModule", { value: true });
const _errors_1 = require("@errors");
const _helper_1 = require("@helper");
const _validator_1 = require("@validator");
const express_validator_1 = require("express-validator");
const updatePassword = [
    _validator_1.requestValidate(express_validator_1.body('password').notEmpty().withMessage('Password is required'), express_validator_1.body('newPassword').notEmpty().withMessage('New password is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password, newPassword } = req.body;
            const { user } = req;
            if (!user) {
                const errors = [
                    { msg: 'Unauthenticated. Please login again', param: 'user' },
                ];
                throw new _errors_1.UnauthenException(errors);
            }
            yield user.comparePassword(password, user.password);
            user.password = newPassword;
            const { _id } = yield user.save();
            const token = _helper_1.jwt.genToken({ id: _id });
            _helper_1.jwt.setJwtRes(res, token).status(201).json({
                message: 'Password update successfully',
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.default = updatePassword;
