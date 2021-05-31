import chai from 'chai';
import chaiHttp from 'chai-http';

import { userTest } from '@__test__/data/auth';
import app from 'src/app';
import config from '@config';

const apiVersion = config.server.api.version;

// assertion style
const { expect } = chai;
chai.use(chaiHttp);

describe('Logout Test Suite', () => {
  it('Return status code 200 on successfully logout', async () => {
    // Register and get cookie
    const cookie = await global.register(userTest);

    // Logout with request has cookie assigned
    const res = await chai
      .request(app)
      .delete(`/${apiVersion}/auth/logout`)
      .set('Cookie', cookie);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Logout successfully');
  });
});
