/**
 * Required External Modules
 */
import { Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

/**
 * Required Dev Modules
 */
import config from '@config';
import { UnauthenException } from '@errors';

type Payload = {
  id: string;
  iat: number;
};

/**
 * Create jwt token
 * @param payload {id: mongoose.Schema.ObjectId}
 * @returns jwt token
 */
export const genToken = (payload: { id: string }): string => {
  const { secret, expires } = config.cookies.jwt;
  return jsonwebtoken.sign(
    { id: payload.id, iat: Math.round(Date.now()) },
    secret,
    {
      expiresIn: expires,
    }
  );
};

/**
 * @param cookies request.cookies object
 * @param next Express NextFunction
 */
export const verifyToken = (cookies: any) => {
  const { secret } = config.cookies.jwt;
  const { jwt } = cookies;
  if (!jwt) {
    const errors = [{ msg: 'Unauthenticated', param: 'jwt' }];
    throw new UnauthenException(errors);
  }
  return jsonwebtoken.verify(jwt, secret) as Payload;
};

export const setJwtRes = (res: Response, token: string): Response => {
  return res.cookie('jwt', token, {
    maxAge: 30 * 86400 * 1000,
    httpOnly: true,
    domain: 'https://web-tech-2021.web.app',
  });
};

export const clearJwtRes = (res: Response): Response => {
  return res.clearCookie('jwt');
};
