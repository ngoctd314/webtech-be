/**
 * Required External Modules
 */
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

/**
 * Required Dev Modules
 */
import { HttpException } from '@errors';

/**
 * Handle any error throw by express application
 *
 * @param err application error
 * @param req express request object
 * @param res express response object
 * @param next express next function
 */
export default function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err.errors) {
    const errors: any[] = [];
    const list: any[] = Object.values(err.errors);
    // eslint-disable-next-line no-restricted-syntax
    for (const value of list) {
      if (value instanceof mongoose.Error.ValidatorError) {
        const { message, path } = value;
        errors.push({ message, field: path });
      } else {
        break;
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({
        errors,
      });
    }
  }

  if (err.name === 'MongoError') {
    const field = Object.keys(err.keyValue);
    if (err.code === 11000) {
      const message = 'Duplicate field';
      if (field.length > 0) {
        return res.status(400).json({ errors: [{ message, field }] });
      }
    }
  }

  if (err.name === 'CastError') {
    const errors = [{ message: 'Cast error', field: err.path }];
    return res.status(400).json({ errors });
  }
  console.log('error', err);
  return res.status(500).json({
    message: 'Something went wrong',
    errors: err,
  });
}
