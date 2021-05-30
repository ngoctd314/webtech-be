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
const _errors_1 = require("@errors");
const updateInfo = (...fields) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user, body } = req;
            if (!user) {
                const errors = [{ msg: 'Unauthenticated', param: 'req' }];
                throw new _errors_1.UnauthenException(errors);
            }
            Object.keys(body).forEach((key) => {
                if (!fields.includes(key)) {
                    delete body[key];
                }
            });
            yield _models_1.UserModel.findByIdAndUpdate(user._id, Object.assign({}, body), {
                new: true,
                runValidators: true,
            });
            res.status(200).json({
                message: 'User successfully updated',
            });
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = updateInfo;
