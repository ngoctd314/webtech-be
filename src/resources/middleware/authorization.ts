import { UnauthorException } from '@errors';
import { Request, Response, NextFunction } from 'express';

const authorization = (...restrictTo: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const userRole = user!.role;
      if (!restrictTo.includes(userRole)) {
        const errors = [
          {
            msg: 'You have not permission to access this resource',
            param: user!.role,
          },
        ];
        throw new UnauthorException(errors);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default authorization;
