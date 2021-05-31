import HttpException from './HttpException';
import { Errors } from '@custom-types/errors';

export default class UnauthorException extends HttpException {
  public statusCode = 403;

  constructor(private errors: Errors) {
    super();
    Object.setPrototypeOf(this, UnauthorException.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
