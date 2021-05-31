import { ValidationError } from 'express-validator';
import HttpException from './HttpException';

export default class ValidatorException extends HttpException {
  public statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ValidatorException.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
