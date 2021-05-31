import chai from 'chai';
import UnauthenException from '../UnauthenException';

// assertion style
const { expect } = chai;

describe('Unauthenticated Request Test Suite', () => {
  it('Return status code 401 on create new UnauthenException error', () => {
    const errors = [{ msg: 'Unauthenticated request', param: 'token' }];

    const unauthenException = new UnauthenException(errors);

    expect(unauthenException.statusCode).to.equal(401);
    expect(unauthenException.serializeErrors()).to.be.a('array');
  });
});
