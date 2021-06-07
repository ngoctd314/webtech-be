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
    _validator_1.requestValidate(express_validator_1.body('post').notEmpty().withMessage('Each comment must belong to a post'), express_validator_1.body('content').notEmpty().withMessage('Content is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { post, content, photo } = req.body;
            const { user } = req;
            const newComment = new _models_1.CommentModel({
                post,
                content,
                user: user._id,
                photo,
            });
            const comment = yield newComment.save();
            res.status(201).json({
                message: 'Comment created',
                comment,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports._create = _create;
const _read = [
    _validator_1.requestValidate(express_validator_1.query('post')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { post } = req.query;
            const comments = yield _models_1.CommentModel.find({ post: `${post}` })
                .populate('user', 'email avatar firstName lastName')
                .exec();
            res.status(200).json({
                comments,
            });
        }
        catch (err) {
            next(err);
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
