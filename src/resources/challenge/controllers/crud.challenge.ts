import { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';

import { ChallengeModel } from '@models';
import { requestValidate } from '@validator';

const _create = [
  requestValidate(
    body('title').notEmpty().withMessage('title is required'),
    body('question').notEmpty().withMessage('question is required'),
    body('prepareCode').notEmpty().withMessage('prepare code is required'),
    body('srcDoc').notEmpty().withMessage('src doc is required'),
    body('course').notEmpty().withMessage('course is required')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, question, prepareCode, srcDoc, course } = req.body;
      const challenge = await ChallengeModel.newChallenge({
        title,
        question,
        prepareCode,
        srcDoc,
        course,
      });

      res.status(201).json({
        message: 'Challenge created',
        data: {
          challenge,
        },
      });
    } catch (err) {
      next(err);
    }
  },
];

// api/v1/challenge
const _readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const challenges = await ChallengeModel.find();

    res.status(200).json({
      challenges,
    });
  } catch (err) {
    next(err);
  }
};

// api/v1/challenge/:course
const _readCourse = [
  requestValidate(param('course').notEmpty().withMessage('Course is required')),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { course } = req.params;
      const challenge = await ChallengeModel.find({ course });

      res.status(200).json({
        challenge,
      });
    } catch (err) {
      next(err);
    }
  },
];

// api/v1/challenge/:course/:id
const _readID = [
  requestValidate(
    param('id').notEmpty().withMessage('Challenge ID is required')
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const challenge = await ChallengeModel.findById(id);

      res.status(200).json({
        challenge,
      });
    } catch (err) {
      next(err);
    }
  },
];

// api/v1/challenge/id
const _delete = [
  requestValidate(param('id').notEmpty().withMessage('id is required')),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await ChallengeModel.deleteOne({ _id: id });
      res.status(200).json({
        message: 'Challenge is deleted',
      });
    } catch (err) {
      next(err);
    }
  },
];

export { _create, _readAll, _readCourse, _readID, _delete };
