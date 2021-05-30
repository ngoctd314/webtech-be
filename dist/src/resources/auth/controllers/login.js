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
const _models_1 = require("@models");
const _helper_1 = require("@helper");
const _errors_1 = require("@errors");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield _models_1.UserModel.findOne({ email });
        if (!user) {
            const errors = [
                { msg: `E-mail: ${email} is not belong to any user`, param: 'email' },
            ];
            throw new _errors_1.BadRequest(errors);
        }
        yield user.comparePassword(password, user.password);
        const token = _helper_1.jwt.genToken({ id: user._id });
        _helper_1.jwt.setJwtRes(res, token).status(200).json({
            message: 'Login successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = login;
