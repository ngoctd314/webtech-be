/**
 * Required External Modules
 */
import { BadRequest } from '@errors';
import { ChallengeModel } from '@models';
import { NextFunction, Request, Response } from 'express';

/**
 * update user information
 *
 * @param fields : all path allow update in database
 */
const getCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const certificateChallenge = await ChallengeModel.find({
      course: 'certificate',
    });
    let flag = true;
    certificateChallenge.forEach((el) => {
      if (!user?.challengeSolved.includes(el._id)) flag = false;
    });
    if (!flag) {
      const errors = [
        {
          msg: 'Please complete course to get certificate!',
          field: 'certificate',
        },
      ];
      throw new BadRequest(errors);
    }

    return res.status(200).json({
      message: 'You completed certificate course',
    });
  } catch (err) {
    return next(err);
  }
};

export default getCertificate;
