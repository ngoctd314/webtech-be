/**
 * Required External Module
 */
import { Request, Response, NextFunction } from 'express';

/**
 * Required Dev Module
 */
import { UserModel } from '@models';
import { jwt } from '@helper';
import { BadRequest } from '@errors';

const login = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from request
  const { email, password } = req.body;

  try {
    // Find user in database
    const user = await UserModel.findOne({ email });
    if (!user) {
      const errors = [
        { msg: `E-mail: ${email} is not belong to any user`, param: 'email' },
      ];
      throw new BadRequest(errors);
    }

    // Compare password
    await user.comparePassword(password, user.password);
    // Save user to database and get user _id

    const token = jwt.genToken({ id: user._id });

    jwt.setJwtRes(res, token).status(200).json({
      message: 'Login successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default login;
