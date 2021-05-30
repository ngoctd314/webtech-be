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
exports.downvote = exports.upvote = void 0;
const _models_1 = require("@models");
const _validator_1 = require("@validator");
const express_validator_1 = require("express-validator");
const upvote = [
    _validator_1.requestValidate(express_validator_1.query('id').notEmpty().withMessage('Post id is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { id } = req.query;
            const post = (yield _models_1.PostModel.findById(id));
            const { upVotes, downVotes } = post;
            const checkUpVote = upVotes.findIndex((upVoteID) => `${upVoteID}` === `${user._id}`);
            if (checkUpVote !== -1) {
                post.upVotes.splice(checkUpVote, 1);
                yield post.save();
                return res.status(200).json({
                    message: 'User voted before',
                    vote: -1,
                });
            }
            let vote = 0;
            const checkDownVote = downVotes.findIndex((downVoteID) => `${downVoteID}` === `${user._id}`);
            if (checkDownVote !== -1) {
                post.downVotes.splice(checkDownVote, 1);
                vote += 1;
            }
            post.upVotes.push(user._id);
            yield post.save();
            return res
                .status(200)
                .json({ message: 'User voted successfully', vote: vote + 1 });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.upvote = upvote;
const downvote = [
    _validator_1.requestValidate(express_validator_1.query('id').notEmpty().withMessage('Post id is required')),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { id } = req.query;
            const post = (yield _models_1.PostModel.findById(id));
            const { upVotes, downVotes } = post;
            const checkDownVote = downVotes.findIndex((downVoteID) => `${downVoteID}` === `${user._id}`);
            if (checkDownVote !== -1) {
                post.downVotes.splice(checkDownVote, 1);
                yield post.save();
                return res.status(200).json({
                    message: 'User down voted before',
                    vote: 1,
                });
            }
            let vote = 0;
            const checkUpVote = upVotes.findIndex((upvoteID) => `${upvoteID}` === `${user._id}`);
            if (checkUpVote !== -1) {
                post.upVotes.splice(checkUpVote, 1);
                vote -= 1;
            }
            post.downVotes.push(user._id);
            yield post.save();
            return res
                .status(200)
                .json({ message: 'User down voted successfully', vote: vote - 1 });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.downvote = downvote;
