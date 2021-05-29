/**
 * Required External Modules
 */
import { UnauthenException } from '@errors';
import { ChallengeModel } from '@models';
import { requestValidate } from '@validator';
import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';

/**
 * update user information
 *
 * @param fields : all path allow update in database
 */
const challengeSolved = [
  requestValidate(
    query('id').notEmpty().withMessage('Challenge ID is required'),
    query('course').notEmpty().withMessage('Challenge ID is required')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      if (!user) {
        throw new UnauthenException([
          {
            msg: 'Unauthenticated, Please login again!',
            param: 'user',
          },
        ]);
      }

      type Course = 'html' | 'css' | 'certificate';

      const { id } = req.query;
      const reqCourse = req.query.course as Course;

      const checkChallengeSolved = user.challengeSolved.find(
        (challenge) => challenge.toString() === id!.toString()
      );
      // challenge unsolved
      const courseChallenges = await ChallengeModel.find({ course: reqCourse });
      let courseUnsolved = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < courseChallenges.length; i++) {
        if (!user.challengeSolved.includes(courseChallenges[i]._id)) {
          courseUnsolved = courseChallenges[i]._id;
          break;
        }
      }
      if (checkChallengeSolved) {
        return res.status(200).json({
          message: `Challenge ${id} solved`,
          nextCourse: courseUnsolved,
        });
      }

      // save to db
      user.challengeSolved.push(`${id}`);
      await user.save();

      return res.status(200).json({
        message: `Challenge ${id} solved`,
        nextCourse: courseUnsolved,
      });
    } catch (err) {
      return next(err);
    }
  },
];

export default challengeSolved;
