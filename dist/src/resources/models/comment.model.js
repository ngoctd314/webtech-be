"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        require: [true, 'Comment must belong to a post'],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'Comment must belong to a user'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    photo: [
        {
            type: String,
        },
    ],
});
const CommentModel = mongoose_1.model('Comment', CommentSchema);
exports.default = CommentModel;
