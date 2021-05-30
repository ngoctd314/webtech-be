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
exports._delete = exports._readID = exports._readCourse = exports._readAll = exports._create = void 0;
const express_validator_1 = require("express-validator");
const _models_1 = require("@models");
const _validator_1 = require("@validator");
const _create = [
    _validator_1.requestValidate(express_validator_1.body('title').notEmpty().withMessage('title is required'), express_validator_1.body('question').notEmpty().withMessage('question is required'), express_validator_1.body('prepareCode').notEmpty().withMessage('prepare code is required'), express_validator_1.body('srcDoc').notEmpty().withMessage('src doc is required'), express_validator_1.body('course').notEmpty().withMessage('course is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, question, prepareCode, srcDoc, course } = req.body;
            const challenge = yield _models_1.ChallengeModel.newChallenge({
                title,
                question,
                prepareCode,
                srcDoc,
                course,
            });
            res.status(201).json({
                message: 'Challenge created',
                data: {
                    challenge,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports._create = _create;
const _readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const challenges = yield _models_1.ChallengeModel.find();
        res.status(200).json({
            challenges,
        });
    }
    catch (err) {
        next(err);
    }
});
exports._readAll = _readAll;
const _readCourse = [
    _validator_1.requestValidate(express_validator_1.param('course').notEmpty().withMessage('Course is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { course } = req.params;
            const challenge = yield _models_1.ChallengeModel.find({ course });
            res.status(200).json({
                challenge,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports._readCourse = _readCourse;
const _readID = [
    _validator_1.requestValidate(express_validator_1.param('id').notEmpty().withMessage('Challenge ID is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const challenge = yield _models_1.ChallengeModel.findById(id);
            res.status(200).json({
                challenge,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports._readID = _readID;
const _delete = [
    _validator_1.requestValidate(express_validator_1.param('id').notEmpty().withMessage('id is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield _models_1.ChallengeModel.deleteOne({ _id: id });
            res.status(200).json({
                message: 'Challenge is deleted',
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports._delete = _delete;
