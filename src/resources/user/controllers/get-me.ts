/**
 * Required External Modules
 */
import { Request, Response, NextFunction } from 'express';

/**
 * Get user information
 */
const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export default getMe;
