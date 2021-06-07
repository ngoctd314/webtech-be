import chai from 'chai';
import { ValidationError } from 'express-validator';

import ValidatorException from '../ValidatorException';

// assertion style
const { expect } = chai;

describe('Express-Validator Exception Test Suite', () => {
  it('Return status code 400 on create new ValidatorException error', () => {
    const errors = [
      { msg: 'Email is required', param: 'email' },
    ] as ValidationError[];

    const emailValidationError = new ValidatorException(errors);

    expect(emailValidationError.statusCode).to.equal(400);
    expect(emailValidationError.serializeErrors()).to.be.a('array');
  });
});
