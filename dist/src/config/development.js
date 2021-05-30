"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
