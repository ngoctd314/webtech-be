/**
 * Required External Modules
 */
import { ValidatorException } from '@errors';
import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

const validate = (...validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return next(new ValidatorException(errors.array()));
  };
};

export default validate;
