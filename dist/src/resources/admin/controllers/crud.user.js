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
exports._read = void 0;
const _models_1 = require("@models");
const _read = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield _models_1.UserModel.find().select('-password');
        res.status(200).json({
            users,
        });
    }
    catch (err) {
        next(err);
    }
});
exports._read = _read;
