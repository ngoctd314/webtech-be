import { Request, Response, NextFunction } from 'express';

import { requestValidate } from '@validator';
import { param } from 'express-validator';
import { BadRequest, UnauthenException } from '@errors';
import { crypto } from '@helper';

const verifyUser = [
  requestValidate(
    param('token').notEmpty().withMessage('Verify token are equired')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get user from request object
      const { user } = req;
      if (!user) {
        const errors = [{ msg: 'Unauthenticated', param: 'token' }];
        throw new UnauthenException(errors);
      }

      // get token from params
      const { token } = req.params;
      const { verified } = user;
      // check verified status
      if (verified.status) {
        return res.status(200).json({
          message: 'Email verified',
        });
      }

      // check token
      if (token !== crypto.sha256Hash(verified.token)) {
        const errors = [{ msg: 'Invalid verify token', param: 'verify token' }];
        throw new BadRequest(errors);
      }

      user.verified.status = true;
      await user.save();

      return res.status(200).json({
        message: 'Email verify successfully',
        verifyToken: verified.token,
      });
    } catch (err) {
      return next(err);
    }
  },
];

export default verifyUser;
