import { Request, Response, NextFunction } from 'express';

import { PostModel } from '@models';
import { requestValidate } from '@validator';
import { query } from 'express-validator';
import { IPostDocument } from '@custom-types/resources/models';

const upvote = [
  requestValidate(query('id').notEmpty().withMessage('Post id is required')),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extract user from req
      const { user } = req;
      // extract post id from query
      const { id } = req.query;

      // get all upvote id of post
      const post = (await PostModel.findById(id)) as IPostDocument;
      const { upVotes, downVotes } = post;

      // check user voted post or not
      const checkUpVote = upVotes.findIndex(
        (upVoteID) => `${upVoteID}` === `${user!._id}`
      );
      if (checkUpVote !== -1) {
        // if true, return
        post.upVotes.splice(checkUpVote, 1);
        await post.save();
        return res.status(200).json({
          message: 'User voted before',
          vote: -1,
        });
      }

      // check user down voted post or not
      let vote = 0;
      const checkDownVote = downVotes.findIndex(
        (downVoteID) => `${downVoteID}` === `${user!._id}`
      );
      if (checkDownVote !== -1) {
        post.downVotes.splice(checkDownVote, 1);
        vote += 1;
      }

      // update upvotes
      post.upVotes.push(user!._id);

      // save user to database
      await post.save();

      return res
        .status(200)
        .json({ message: 'User voted successfully', vote: vote + 1 });
    } catch (err) {
      return next(err);
    }
  },
];
const downvote = [
  requestValidate(query('id').notEmpty().withMessage('Post id is required')),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extract user from req
      const { user } = req;
      // extract post id from query
      const { id } = req.query;

      // get all upvote id of post
      const post = (await PostModel.findById(id)) as IPostDocument;
      const { upVotes, downVotes } = post;

      // check user down voted post or not
      const checkDownVote = downVotes.findIndex(
        (downVoteID) => `${downVoteID}` === `${user!._id}`
      );
      if (checkDownVote !== -1) {
        // if true, return
        post.downVotes.splice(checkDownVote, 1);
        await post.save();
        return res.status(200).json({
          message: 'User down voted before',
          vote: 1,
        });
      }

      // check user up voted post or not
      let vote = 0;
      const checkUpVote = upVotes.findIndex(
        (upvoteID) => `${upvoteID}` === `${user!._id}`
      );
      if (checkUpVote !== -1) {
        post.upVotes.splice(checkUpVote, 1);
        vote -= 1;
      }

      // update upvotes
      post.downVotes.push(user!._id);

      // save user to database
      await post.save();

      return res
        .status(200)
        .json({ message: 'User down voted successfully', vote: vote - 1 });
    } catch (err) {
      return next(err);
    }
  },
];

export { upvote, downvote };
