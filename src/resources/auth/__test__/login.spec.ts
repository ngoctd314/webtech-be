import chai from 'chai';
import chaiHttp from 'chai-http';

import app from 'src/app';
import { userTest } from '@__test__/data/auth';
import config from '@config';

const apiVersion = config.server.api.version;

// assert style
const { expect } = chai;
chai.use(chaiHttp);

describe('Login Test Suite', () => {
  const { email, password } = userTest;
  it('Return status code 200 on successfully login', async () => {
    await global.register(userTest);
    const res = await chai
      .request(app)
      .post(`/${apiVersion}/auth/login`)
      .send({ email, password });

    expect(res.status).to.equal(200);
    expect(res.get('Set-Cookie')).to.be.a('array');
  });

  it('Return status code 400 on incorrect password', async () => {
    await global.register(userTest);
    const res = await chai
      .request(app)
      .post(`/${apiVersion}/auth/login`)
      .send({ email, password: 'incorrect-password' });

    expect(res.status).to.equal(400);
    expect(res.body.errors).to.be.a('array');
  });
});
