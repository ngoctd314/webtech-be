import { Config } from '@custom-types/config';

const config: Config = {
  server: {
    host: 'http://localhost',
    port: 7000,
    api: {
      version: 'api/v1',
    },
  },
  client: {
    domain: 'http://localhost:3000',
  },
  database: {
    uri: 'mongodb://127.0.0.1:27017/ci-webtech',
  },
  cookies: {
    jwt: {
      secret: 'drwaw51f==14s%aqr',
      expires: '30d',
    },
  },
  mail: {
    host: 'smtp.mailtrap.io',
    service: 'gmail',
    port: 25,
    username: 'tdn.social.network@gmail.com',
    password: 'socialnetwork',
  },
  aws: {
    secretAccessKey: `${process.env.AWS_SECRET_ACCESSKEY}`,
    accesskey: `${process.env.AWS_ACCESSKEY}`,
  },
};
export default config;
