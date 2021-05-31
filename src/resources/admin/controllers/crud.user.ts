import { Request, Response, NextFunction } from 'express';
import { UserModel } from '@models';

/**
 * Get user information
 */
const _read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fill all user from database (remove password field)
    const users = await UserModel.find().select('-password');

    // Response to user
    res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};

export { _read };
