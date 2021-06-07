import HttpException from './HttpException';
import { Errors } from '@custom-types/errors';

export default class BadRequest extends HttpException {
  public statusCode = 401;

  constructor(private errors: Errors) {
    super();
    Object.setPrototypeOf(this, BadRequest.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
