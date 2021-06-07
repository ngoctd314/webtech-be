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
const _models_1 = require("@models");
const authenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookies } = req;
        const decoded = _helper_1.jwt.verifyToken(cookies);
        const user = yield _models_1.UserModel.me(decoded.id);
        if (!user) {
            const errors = [
                { msg: 'Invalid token. Please login again', param: 'token' },
            ];
            throw new _errors_1.UnauthenException(errors);
        }
        if (decoded.iat < user.passwordChangedAt) {
            const errors = [
                { msg: 'Token is expired, please login again', param: 'token' },
            ];
            throw new _errors_1.UnauthenException(errors);
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = authenticated;
