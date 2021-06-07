// *CRUD opeartion for post

import { Request, Response, NextFunction } from 'express';

// Dev module
import { PostModel } from '@models';
import { requestValidate } from '@validator';
import { body, query } from 'express-validator';

/**
 * Create new post
 * @params req: { body: { problem, challenge }, user}
 */
const _create = [
  requestValidate(
    body('problem')
      .notEmpty()
      .withMessage('Each post must have a problem need to solve')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extract data from body (express.json)
      const { problem, challenge, photo } = req.body;
      // require authenticated
      const { user } = req;

      // author create this post is authenticated user
      const author = user!._id;

      // create post model instance
      const newPost = new PostModel({ problem, author, challenge, photo });
      // await save to database
      const post = await newPost.save();

      // response to user
      res.status(201).json({
        message: 'Created post successfully',
        post,
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
  requestValidate(query('challenge')),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extract challenge _id from query
      const { challenge, id } = req.query;

      // query with challenge post from database
      if (challenge) {
        const posts = await PostModel.find({ challenge: `${challenge}` });
        // res to client
        return res.status(200).json({
          posts,
        });
      }
      // query with id
      if (id) {
        const post = await PostModel.findById(id, { sort: { createdAt: -1 } });
        // res to client
        return res.status(200).json({
          post,
        });
      }
      return res.status(200).json({
        post: {},
      });
    } catch (err) {
      return next(err);
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
