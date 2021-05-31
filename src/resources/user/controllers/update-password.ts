/**
 * Required External Module
 */
import { UnauthenException } from '@errors';
import { jwt } from '@helper';
/**
 * Required Internal Modules
 */
import { requestValidate } from '@validator';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

/**
 * Update password
 */
const updatePassword = [
  requestValidate(
    body('password').notEmpty().withMessage('Password is required'),
    body('newPassword').notEmpty().withMessage('New password is required')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, newPassword } = req.body;

      // get user
      const { user } = req;
      if (!user) {
        const errors = [
          { msg: 'Unauthenticated. Please login again', param: 'user' },
        ];
        throw new UnauthenException(errors);
      }

      // check user password
      await user.comparePassword(password, user.password);

      // update password
      user.password = newPassword;

      // save user to db
      const { _id } = await user.save();

      // log user in send jwt
      const token = jwt.genToken({ id: _id });

      jwt.setJwtRes(res, token).status(201).json({
        message: 'Password update successfully',
      });
    } catch (err) {
      next(err);
    }
  },
];

export default updatePassword;
