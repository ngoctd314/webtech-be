"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearJwtRes = exports.setJwtRes = exports.verifyToken = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _config_1 = __importDefault(require("@config"));
const _errors_1 = require("@errors");
const genToken = (payload) => {
    const { secret, expires } = _config_1.default.cookies.jwt;
    return jsonwebtoken_1.default.sign({ id: payload.id, iat: Math.round(Date.now()) }, secret, {
        expiresIn: expires,
    });
};
exports.genToken = genToken;
const verifyToken = (cookies) => {
    const { secret } = _config_1.default.cookies.jwt;
    const { jwt } = cookies;
    if (!jwt) {
        const errors = [{ msg: 'Unauthenticated', param: 'jwt' }];
        throw new _errors_1.UnauthenException(errors);
    }
    return jsonwebtoken_1.default.verify(jwt, secret);
};
exports.verifyToken = verifyToken;
const setJwtRes = (res, token) => {
    return res.cookie('jwt', token, {
        maxAge: 30 * 86400 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
};
exports.setJwtRes = setJwtRes;
const clearJwtRes = (res) => {
    return res.clearCookie('jwt');
};
exports.clearJwtRes = clearJwtRes;
