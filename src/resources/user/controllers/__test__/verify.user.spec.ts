import chai from 'chai';
import chaiHttp from 'chai-http';

import app from 'src/app';
import { userTest } from '@__test__/data/auth';

// Assertion style
const { expect } = chai;

chai.use(chaiHttp);

describe('Verify User Test Suite', () => {
  it('Return status code 400 on invalid token', async () => {
    const cookie = await global.register(userTest);
    const res = await chai
      .request(app)
      .get(`/${global.apiVersion}/user/verify/invalid-token`)
      .set('Cookie', cookie);
    expect(res.status).to.equal(400);
    expect(res.body.errors).to.be.a('array');
  });

  it('Return status code 401 on unauthenticated request', async () => {
    const res = await chai
      .request(app)
      .get(`/${global.apiVersion}/user/verify/invalid-token`);
    expect(res.status).to.equal(401);
    expect(res.body.errors).to.be.a('array');
  });
});
