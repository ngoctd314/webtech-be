// *CRUD opeartion for post

import { Request, Response, NextFunction } from 'express';

// Dev module
import { CommentModel } from '@models';
import { requestValidate } from '@validator';
import { body, query } from 'express-validator';

/**
 * Create new post
 * @params req: { body: { problem, challenge }, user}
 */
const _create = [
  requestValidate(
    body('post').notEmpty().withMessage('Each comment must belong to a post'),
    body('content').notEmpty().withMessage('Content is required')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extract data from body
      const { post, content, photo } = req.body;

      // require authenticated
      const { user } = req;

      // create comment instance
      const newComment = new CommentModel({
        post,
        content,
        user: user!._id,
        photo,
      });

      // save comment to database
      const comment = await newComment.save();

      res.status(201).json({
        message: 'Comment created',
        comment,
      });
    } catch (err) {
      next(err);
    }
  },
];

/**
 * Read posts by challenge _id
 */
const _read = [
  requestValidate(query('post')),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { post } = req.query;
      const comments = await CommentModel.find({ post: `${post}` })
        .populate('user', 'email avatar firstName lastName')
        .exec();
      res.status(200).json({
        comments,
      });
    } catch (err) {
      next(err);
    }
  },
];

const _update = (req: Request, res: Response, next: NextFunction) => {
  res.send('update');
};

const _delete = (req: Request, res: Response, next: NextFunction) => {
  res.send('delete');
};
export { _create, _read, _update, _delete };
