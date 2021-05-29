// eslint-disable-next-line max-classes-per-file
import chai from 'chai';
import HttpException from '../HttpException';
import { Errors } from '@custom-types/errors';

// assert style
const { expect } = chai;

describe('Http Exception Test Suite', () => {
  it('Return status code 400 on extends Http Exception with implement statusCode = 400', () => {
    class Error400 extends HttpException {
      public statusCode = 400;

      constructor(private errors: Errors) {
        super();
        Object.setPrototypeOf(this, Error400.prototype);
      }

      serializeErrors() {
        return this.errors.map((error) => ({
          message: error.msg,
          field: error.param,
        }));
      }
    }

    const errors = [{ msg: 'Custom Exception', param: '' }];
    const error400 = new Error400(errors);

    expect(error400.statusCode).to.equal(400);
    expect(error400.serializeErrors()).to.be.a('array');
  });
  it('Return status code 401 on extends Http Exception with implement statusCode = 401', () => {
    class Error401 extends HttpException {
      public statusCode = 401;

      constructor(private errors: Errors) {
        super();
        Object.setPrototypeOf(this, Error401.prototype);
      }

      serializeErrors() {
        return this.errors.map((error) => ({
          message: error.msg,
          field: error.param,
        }));
      }
    }

    const errors = [{ msg: 'Custom Exception', param: '' }];
    const error401 = new Error401(errors);

    expect(error401.statusCode).to.equal(401);
    expect(error401.serializeErrors()).to.be.a('array');
  });
});
