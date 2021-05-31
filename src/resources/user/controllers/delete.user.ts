/**
 * Required External Modules
 */
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '@models';
import { requestValidate } from '@validator';
import { body } from 'express-validator';

/**
 * update user information
 *
 * @param fields : all path allow update in database
 */
const deleteUser = [
  requestValidate(body('email').notEmpty().withMessage('Email is required')),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await UserModel.deleteMany({});

      res.status(200).json({
        message: `User belong to ${email} is deleted`,
      });
    } catch (err) {
      next(err);
    }
  },
];

export default deleteUser;
