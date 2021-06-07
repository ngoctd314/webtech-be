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
exports._delete = exports._update = exports._read = exports._create = void 0;
const _models_1 = require("@models");
const _validator_1 = require("@validator");
const express_validator_1 = require("express-validator");
const _create = [
    _validator_1.requestValidate(express_validator_1.body('problem')
        .notEmpty()
        .withMessage('Each post must have a problem need to solve')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { problem, challenge } = req.body;
            const { user } = req;
            const author = user._id;
            const newPost = new _models_1.PostModel({ problem, author, challenge });
            const post = yield newPost.save();
            res.status(201).json({
                message: 'Created post successfully',
                post,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports._create = _create;
const _read = [
    _validator_1.requestValidate(express_validator_1.query('challenge')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { challenge, id } = req.query;
            if (challenge) {
                const posts = yield _models_1.PostModel.find({ challenge: `${challenge}` });
                return res.status(200).json({
                    posts,
                });
            }
            if (id) {
                const post = yield _models_1.PostModel.findById(id, { sort: { createdAt: -1 } });
                return res.status(200).json({
                    post,
                });
            }
            return res.status(200).json({
                post: {},
            });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports._read = _read;
const _update = (req, res, next) => {
    res.send('update');
};
exports._update = _update;
const _delete = (req, res, next) => {
    res.send('delete');
};
exports._delete = _delete;
