/**
 * Required External Modules
 */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';
import { isEmail } from 'validator';

/**
 * Required Dev Types
 */
import {
  IUserDocument,
  IUserModel,
  UserType,
} from '@custom-types/resources/models';
import { UnauthenException, BadRequest } from '@errors';

/**
 * User model schema define
 */
const UserSchema: Schema = new Schema({
  email: {
    type: String,

    required: [true, 'Email is required'],
    validate: {
      validator(v: string) {
        return isEmail(v);
      },
      message: (props: any) => `${props.value} is not a valid email address`,
    },
    unique: [true, 'Email must be unique'],
  },
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    maxLength: [100, 'First name must have less than 100 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    maxLength: [100, 'Last name must have less than 100 characters'],
  },
  password: {
    type: String,
    required: [true, 'password is requried'],
    minLength: [8, 'Password must have greater than 8 characters'],
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'role must in [admin, user]',
    },
    default: 'user',
  },
  verified: {
    status: {
      type: Boolean,
      default: false,
    },
    token: String,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  passwordChangedAt: {
    type: Number,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,

  // Gets the mongoose enum from the Typescript enum
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'gender must in [male, female, other]',
    },
  },
  address: {
    street: { type: String },
    city: { type: String },
  },
  avatar: {
    type: String,
    default: '/static/images/user-default.png',
  },

  challengeSolved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
    },
  ],
});

// Pre save hook
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const hashAsync = promisify(bcrypt.hash);
    this.password = await hashAsync(this.password, 10);

    this.passwordChangedAt = Math.round(new Date().getTime());
  }
  return next();
});

// Statics method
/**
 * Get user findById
 * @param id mongoose user id
 * @returns user document
 */
UserSchema.statics.me = async function (id: string): Promise<IUserDocument> {
  const me = await this.findById(id).select('-password');
  if (!me) {
    const errors = [
      { msg: 'Unauthenticated. Please login to continue', param: 'id' },
    ];
    throw new UnauthenException(errors);
  }
  return me;
};

/**
 * Get user findOne
 * @param email user email
 * @returns user document
 */
UserSchema.statics.findByEmail = async function (
  email: string
): Promise<IUserDocument> {
  const me = await this.findOne({ email });
  if (!me) {
    const errors = [{ msg: 'Email is not belong to any user', param: 'email' }];
    throw new UnauthenException(errors);
  }
  return me;
};

UserSchema.statics.newUser = async function (
  user: UserType
): Promise<IUserDocument> {
  const newUser = await this.create({
    ...user,
  });
  return newUser;
};

// Instance method

UserSchema.methods.comparePassword = async function (
  password: string,
  hashedPassword: string
) {
  const asyncCompare = promisify(bcrypt.compare);
  const result = await asyncCompare(password, hashedPassword);
  if (!result) {
    const errors = [{ msg: 'Incorrect password', param: 'password' }];
    throw new BadRequest(errors);
  }
};

// Virtual method
// UserSchema.virtual('name').get(function (this: IUserDocument) {
//   return `${this.firstName}  ${this.lastName}`;
// });

// Export default the model and return IUser interface
const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel;
