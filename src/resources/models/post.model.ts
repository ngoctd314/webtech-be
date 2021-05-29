import { Schema, model } from 'mongoose';
import { IPostDocument, IPostModel } from '@custom-types/resources/models';

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post must be create by an author'],
  },
  problem: {
    type: String,
    required: [true, 'Post must describe a problem'],
  },
  challenge: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required: [true, 'Post must solve problem belong to a challenge'],
  },
  upVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PostSchema.virtual('votes').get(function (this: IPostDocument) {
  return this.upVotes.length - this.downVotes.length;
});

const PostModel = model<IPostDocument, IPostModel>('Post', PostSchema);

export default PostModel;
