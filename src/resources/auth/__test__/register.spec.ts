import chai from 'chai';
import chaiHttp from 'chai-http';

import app from 'src/app';
import { userTest } from '@__test__/data/auth';
import config from '@config';

const apiVersion = config.server.api.version;
// assert style
const { expect } = chai;

// test http request
chai.use(chaiHttp);

describe('Register Test Suite', () => {
  const { email, password, firstName, lastName } = userTest;
  it('Return status code 201, cookie, send email on successfully sign up', async () => {
    await global.register(userTest);
  });

  it('Return status code 400 on missing email', async () => {
    const res = await chai
      .request(app)
      .post(`/${apiVersion}/auth/register`)
      .send({
        password,
        firstName,
        lastName,
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
  });

  it('Return status code 400 on invalid email', async () => {
    const res = await chai
      .request(app)
      .post(`/${apiVersion}/auth/register`)
      .send({
        email: 'example.com',
        password,
        firstName,
        lastName,
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
  });

  it('Return status code 400 on missing password', async () => {
    const res = await chai
      .request(app)
      .post(`/${apiVersion}/auth/register`)
      .send({
        email,
        firstName,
        lastName,
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
  });

  it('Return status code 400 on missing firstName', async () => {
    const res = await chai
      .request(app)
      .post(`/${apiVersion}/auth/register`)
      .send({
        email,
        password,
        lastName,
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
  });

  it('Return status code 400 on missing lastName', async () => {
    const res = await chai
      .request(app)
      .post(`/${apiVersion}/auth/register`)
      .send({
        email,
        password,
        firstName,
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors).to.be.a('array');
  });

  // it('Return status code 400 on duplicate email', async () => {
  //   await chai.request(app).post('/api/v1/auth/register').send({
  //     email: 'example@gmail.com',
  //     password: 'example.password',
  //     firstName: 'Admin',
  //     lastName: 'Admin',
  //   });

  //   const res = await chai.request(app).post('/api/v1/auth/register').send({
  //     email: 'example@gmail.com',
  //     password: 'example.password',
  //     firstName: 'Admin',
  //     lastName: 'Admin',
  //   });

  //   expect(res.status).to.equal(400);
  //   expect(res.body.errors).to.be.a('array');
  // });
});
