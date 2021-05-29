/**
 * Required External Modules
 */
import { UnauthenException } from '@errors';
/**
 * Required Internal Modules
 */
import { jwt } from '@helper';
import { UserModel } from '@models';
import { NextFunction, Request, Response } from 'express';

/**
 * Assign user to request object
 */
const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Parse jwt payload
    const { cookies } = req;

    const decoded = jwt.verifyToken(cookies);

    // Find user in database
    const user = await UserModel.me(decoded.id);
    if (!user) {
      const errors = [
        { msg: 'Invalid token. Please login again', param: 'token' },
      ];
      throw new UnauthenException(errors);
    }

    // Check iat token time
    if (decoded.iat < user.passwordChangedAt) {
      const errors = [
        { msg: 'Token is expired, please login again', param: 'token' },
      ];
      throw new UnauthenException(errors);
    }

    // Assign user to req
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticated;
