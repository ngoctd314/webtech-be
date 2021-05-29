import chai from 'chai';
import BadRequest from '../BadRequest';

// assertion style
const { expect } = chai;

describe('Bad Request Test Suite', () => {
  it('Return status code 400 on create new BadRequest error', () => {
    const errors = [{ msg: 'Invalid email', param: 'email' }];
    const badRequest = new BadRequest(errors);

    expect(badRequest.statusCode).to.equal(400);
    expect(badRequest.serializeErrors()).to.be.a('array');
  });
});
