/* eslint-disable no-unused-vars */
/**
 * Required External Types
 */
import { Document, Model } from 'mongoose';

/**
 * User document interface
 */
type Gender = 'male' | 'female' | 'other';
type Role = 'admin' | 'user';

export interface Address extends Document {
  street: string;
  city: string;
}
export interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  verified: {
    token: string;
  };

  gender?: Gender;
  address?: Address;
  avatar?: string;
}
export interface IUserDocument extends Document, UserType {
  createdAt: string;
  passwordChangedAt: number;
  passwordResetToken: string;
  passwordResetTokenExpires: Date;
  verified: {
    status: boolean;
    token: string;
  };
  role: Role;
  challengeSolved: string[];

  comparePassword(password: string, hashedPassword: string): Promise<void>;
}

/**
 * User model interface
 */
export interface IUserModel extends Model<IUserDocument> {
  me(id: string): Promise<IUserDocument>;
  findByEmail(email: string): Promise<IUserDocument>;
  newUser(user: UserType): Promise<IUserDocument>;
}

interface ChallengeType {
  title: string;
  question: string;
  prepareCode: string;
  srcDoc: string;
  course: string;
}
export interface IChallengeDocument extends Document, ChallengeType {}
export interface IChallengeModel extends Model<IChallengeDocument> {
  newChallenge(challenge: ChallengeType): Promise<IChallengeDocument>;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

export interface IPostType {
  author: string;
  problem: string;
  challenge: string;
  upVotes: string[];
  downVotes: string[];
  createdAt: Date;
}
export interface IPostDocument extends Document, IPostType {}
export interface IPostModel extends Model<IPostDocument> {}

export interface ICommentType {
  user: string;
  post: string;
  content: string;
  photo: string[];
}
export interface ICommentDocument extends Document, ICommentType {}
export interface ICommentModel extends Model<ICommentDocument> {}
