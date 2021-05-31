/**
 * Required External Module
 */
import { Request, Response, NextFunction } from 'express';

/**
 * Required Dev Module
 */
import { jwt } from '@helper';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    jwt.clearJwtRes(res).status(200).json({ message: 'Logout successfully' });
  } catch (err) {
    next(err);
  }
};

export default logout;
