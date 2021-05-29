import chai from 'chai';
import chaiHttp from 'chai-http';

import app from 'src/app';
import config from '@config';
import { authTestData } from '@__test__/data';

chai.use(chaiHttp);

const { expect } = chai;
const { version } = config.server.api;

describe('CRUD Admin Test Suite', () => {
  it('Return 401 on unauthenticated request', async () => {
    const res = await chai.request(app).get(`/${version}/admin/users`);

    expect(res.status).to.equal(401);
  });

  it('Return 403 on unauthorization request', async () => {
    const cookie = await global.register(authTestData.userTest);

    const res = await chai
      .request(app)
      .get(`/${version}/admin/users`)
      .set('Cookie', cookie);

    expect(res.status).to.equal(403);
  });

  // TODO: Return 200 on successfully request
});
