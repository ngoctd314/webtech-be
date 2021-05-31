import { Schema, model } from 'mongoose';
import {
  ICommentDocument,
  ICommentModel,
} from '@custom-types/resources/models';

const CommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    require: [true, 'Comment must belong to a post'],
  },
  user: {
    type: Schema.Types.ObjectId,
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

const CommentModel = model<ICommentDocument, ICommentModel>(
  'Comment',
  CommentSchema
);

export default CommentModel;
