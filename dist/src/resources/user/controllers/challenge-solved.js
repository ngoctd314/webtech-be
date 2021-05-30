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
const _validator_1 = require("@validator");
const express_validator_1 = require("express-validator");
const challengeSolved = [
    _validator_1.requestValidate(express_validator_1.query('id').notEmpty().withMessage('Challenge ID is required'), express_validator_1.query('course').notEmpty().withMessage('Challenge ID is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            if (!user) {
                throw new _errors_1.UnauthenException([
                    {
                        msg: 'Unauthenticated, Please login again!',
                        param: 'user',
                    },
                ]);
            }
            const { id } = req.query;
            const reqCourse = req.query.course;
            const checkChallengeSolved = user.challengeSolved.find((challenge) => challenge.toString() === id.toString());
            const courseChallenges = yield _models_1.ChallengeModel.find({ course: reqCourse });
            let courseUnsolved = '';
            for (let i = 0; i < courseChallenges.length; i++) {
                if (!user.challengeSolved.includes(courseChallenges[i]._id)) {
                    courseUnsolved = courseChallenges[i]._id;
                    break;
                }
            }
            if (checkChallengeSolved) {
                return res.status(200).json({
                    message: `Challenge ${id} solved`,
                    nextCourse: courseUnsolved,
                });
            }
            user.challengeSolved.push(`${id}`);
            yield user.save();
            return res.status(200).json({
                message: `Challenge ${id} solved`,
                nextCourse: courseUnsolved,
            });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.default = challengeSolved;
