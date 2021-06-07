/**
 * Required External Module
 */
import { Request, Response, NextFunction } from 'express';

/**
 * Required Dev Module
 */
import { UserModel } from '@models';
import { jwt, sendMail, crypto } from '@helper';
import config from '@config';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get data from request
    const { email, firstName, lastName, password } = req.body;

    const genToken = crypto.genToken(32);
    const sha256Hash = crypto.sha256Hash(genToken);
    const { _id } = await UserModel.newUser({
      email,
      firstName,
      lastName,
      password,
      verified: {
        token: genToken,
      },
    });

    const activeUrl = `${config.client.domain}/user/verify/${sha256Hash}`;
    await sendMail({
      email,
      subject: 'Welcome to Social Network! Confirm Your Email',
      text: `Click ${activeUrl} to get full access to your account`,
    });

    const token = jwt.genToken({ id: _id });

    jwt
      .setJwtRes(res, token)
      .status(201)
      .json({
        message: `Please check email: ${email} to validate account`,
      });
  } catch (err) {
    next(err);
  }
};

export default register;
