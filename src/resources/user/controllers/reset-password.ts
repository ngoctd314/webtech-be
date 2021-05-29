/**
 * Required External Module
 */
import { BadRequest } from '@errors';
import { crypto, sendMail } from '@helper';
import { UserModel } from '@models';
import config from '@config';
/**
 * Required Internal Modules
 */
import { requestValidate } from '@validator';
import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';

/**
 * Forgot password
 *
 * @return Send an email with link to reset password
 */
const forgotPassword = [
  requestValidate(
    body('email').notEmpty().withMessage('Email is require'),
    body('email').isEmail().withMessage('Invalid email')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user based on posted email
      const { email } = req.body;
      const user = await UserModel.findByEmail(email);

      // Generate the random reset token
      const resetToken = crypto.genToken(32);

      const resetTokenHashed = crypto.sha256Hash(resetToken);

      user.passwordResetToken = resetTokenHashed;
      user.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

      // save user to database
      await user.save();

      // Send it back to user's email
      const resetUrl = `${config.client.domain}/reset-password/${resetToken}`;
      const message = `Forgot your password? Click ${resetUrl}\nIf you didn't forget your password, please ignore this email`;

      await sendMail({
        email: user.email,
        subject: 'Reset Password (valid for 10 mins)',
        text: message,
      });

      // Response to user if everything is ok
      res.status(200).json({
        message: `Please check email: ${user.email} to reset password`,
      });
    } catch (err) {
      next(err);
    }
  },
];

/**
 * Reset password
 */
const resetPassword = [
  requestValidate(
    param('resetToken').notEmpty().withMessage('Invalid reset token'),
    body('newPassword').notEmpty().withMessage('New password is required')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    const resetTokenHashed = crypto.sha256Hash(resetToken);

    try {
      const user = await UserModel.findOne({
        passwordResetToken: resetTokenHashed,
      });
      if (!user) {
        const errors = [{ msg: 'Invalid token', param: 'token' }];
        throw new BadRequest(errors);
      }

      if (user.passwordResetTokenExpires < new Date(Date.now())) {
        const errors = [{ msg: 'Token expires', param: 'token' }];
        throw new BadRequest(errors);
      }
      user.password = newPassword;
      user.passwordResetToken = '';

      if (await user.save()) {
        res.status(200).json({
          message: 'Reset password success. Please login again!',
        });
      }
    } catch (err) {
      next(err);
    }
  },
];

export { forgotPassword, resetPassword };
