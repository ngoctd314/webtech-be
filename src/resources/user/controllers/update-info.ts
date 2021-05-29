/**
 * Required External Modules
 */
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '@models';
import { UnauthenException } from '@errors';

/**
 * update user information
 *
 * @param fields : all path allow update in database
 */
const updateInfo = (...fields: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, body } = req;
      if (!user) {
        const errors = [{ msg: 'Unauthenticated', param: 'req' }];
        throw new UnauthenException(errors);
      }

      // Remove malicious fields in request.body
      Object.keys(body).forEach((key) => {
        if (!fields.includes(key)) {
          delete body[key];
        }
      });

      // Update user information in database
      await UserModel.findByIdAndUpdate(
        user._id,
        { ...body },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        message: 'User successfully updated',
      });
    } catch (err) {
      next(err);
    }
  };
};

export default updateInfo;
