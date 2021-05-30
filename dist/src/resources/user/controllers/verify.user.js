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
const _validator_1 = require("@validator");
const express_validator_1 = require("express-validator");
const _errors_1 = require("@errors");
const _helper_1 = require("@helper");
const verifyUser = [
    _validator_1.requestValidate(express_validator_1.param('token').notEmpty().withMessage('Verify token are equired')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            if (!user) {
                const errors = [{ msg: 'Unauthenticated', param: 'token' }];
                throw new _errors_1.UnauthenException(errors);
            }
            const { token } = req.params;
            const { verified } = user;
            if (verified.status) {
                return res.status(200).json({
                    message: 'Email verified',
                });
            }
            if (token !== _helper_1.crypto.sha256Hash(verified.token)) {
                const errors = [{ msg: 'Invalid verify token', param: 'verify token' }];
                throw new _errors_1.BadRequest(errors);
            }
            user.verified.status = true;
            yield user.save();
            return res.status(200).json({
                message: 'Email verify successfully',
                verifyToken: verified.token,
            });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.default = verifyUser;
