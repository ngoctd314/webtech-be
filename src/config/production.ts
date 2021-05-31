import { Config } from '@custom-types/config';

const config: Config = {
  server: {
    host: 'https://learn-web-programing.herokuapp.com',
    port: parseInt(`${process.env.PORT}`, 10),
    api: {
      version: 'api/v1',
    },
  },
  client: {
    domain: 'https://web-tech-2021.web.app',
  },
  database: {
    uri: `${process.env.MONGO_URI}`,
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
    username: `${process.env.GMAIL_USER}`,
    password: `${process.env.GMAIL_PASSWORD}`,
  },
};
export default config;
