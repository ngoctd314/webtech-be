import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from 'src/app';
import { UserType } from '@custom-types/resources/models';
import config from '@config';

const apiVersion = config.server.api.version;
// assertion style
const { expect } = chai;
chai.use(chaiHttp);

let mongo: MongoMemoryServer;

before('Connect DB before all test', async () => {
  // create new instance, port is auto created
  mongo = new MongoMemoryServer();
  // get URI
  const mongoUri = await mongo.getUri();

  // connect to DB before all test
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach('Clear DB before each test', async () => {
  const collections = await mongoose.connection.db.collections();
  // eslint-disable-next-line no-restricted-syntax
  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
});

after('Stop DB after all test', async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

declare global {
  namespace NodeJS {
    interface Global {
      /**
       * Return jsonwebtoken cookie
       */
      register(user: UserType): Promise<string[]>;
      apiVersion: string;
    }
  }
}

global.register = async (user: UserType) => {
  const { email, password, firstName, lastName } = user;

  const res = await chai
    .request(app)
    .post(`/${apiVersion}/auth/register`)
    .send({ email, password, firstName, lastName });

  expect(res.status).to.equal(201);
  const cookie = res.get('Set-Cookie');

  expect(cookie).to.be.a('array');
  expect(res.body.message).to.equal(
    'Please check email: example@gmail.com to validate account'
  );

  return cookie;
};
global.apiVersion = config.server.api.version;
