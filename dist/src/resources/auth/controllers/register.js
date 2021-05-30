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
const _models_1 = require("@models");
const _helper_1 = require("@helper");
const _config_1 = __importDefault(require("@config"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, password } = req.body;
        const genToken = _helper_1.crypto.genToken(32);
        const sha256Hash = _helper_1.crypto.sha256Hash(genToken);
        const { _id } = yield _models_1.UserModel.newUser({
            email,
            firstName,
            lastName,
            password,
            verified: {
                token: genToken,
            },
        });
        const activeUrl = `${_config_1.default.client.domain}/user/verify/${sha256Hash}`;
        yield _helper_1.sendMail({
            email,
            subject: 'Welcome to Social Network! Confirm Your Email',
            text: `Click ${activeUrl} to get full access to your account`,
        });
        const token = _helper_1.jwt.genToken({ id: _id });
        _helper_1.jwt
            .setJwtRes(res, token)
            .status(201)
            .json({
            message: `Please check email: ${email} to validate account`,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = register;
