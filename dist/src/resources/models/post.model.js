"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Post must be create by an author'],
    },
    problem: {
        type: String,
        required: [true, 'Post must describe a problem'],
    },
    challenge: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: [true, 'Post must solve problem belong to a challenge'],
    },
    upVotes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    downVotes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
PostSchema.virtual('votes').get(function () {
    return this.upVotes.length - this.downVotes.length;
});
const PostModel = mongoose_1.model('Post', PostSchema);
exports.default = PostModel;
