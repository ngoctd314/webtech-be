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
const _models_1 = require("@models");
const getCertificate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const certificateChallenge = yield _models_1.ChallengeModel.find({
            course: 'certificate',
        });
        let flag = true;
        certificateChallenge.forEach((el) => {
            if (!(user === null || user === void 0 ? void 0 : user.challengeSolved.includes(el._id)))
                flag = false;
        });
        if (!flag) {
            const errors = [
                {
                    msg: 'Please complete course to get certificate!',
                    field: 'certificate',
                },
            ];
            throw new _errors_1.BadRequest(errors);
        }
        return res.status(200).json({
            message: 'You completed certificate course',
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.default = getCertificate;
