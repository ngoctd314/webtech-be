import mongoose, { Schema } from 'mongoose';
import {
  IChallengeDocument,
  IChallengeModel,
} from '@custom-types/resources/models';

// create schema
const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'name is required'],
  },
  question: {
    type: String,
    required: [true, 'question is required'],
  },
  prepareCode: {
    type: String,
    required: [true, 'prepareCode is required'],
  },
  srcDoc: {
    type: String,
    required: [true, 'srcDoc is required'],
  },
  course: {
    type: String,
    enum: {
      values: ['html', 'css', 'certificate'],
      message: 'Course must in [html, css, certificate]',
    },
    required: [true, 'course is required'],
  },
});

ChallengeSchema.statics.newChallenge = async function (
  challenge: IChallengeDocument
): Promise<IChallengeDocument> {
  const newChallenge = await this.create({ ...challenge });
  return newChallenge;
};

const ChallengeModel = mongoose.model<IChallengeDocument, IChallengeModel>(
  'Challenge',
  ChallengeSchema
);

export default ChallengeModel;
