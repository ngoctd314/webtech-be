"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const util_1 = require("util");
const validator_1 = require("validator");
const _errors_1 = require("@errors");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator(v) {
                return validator_1.isEmail(v);
            },
            message: (props) => `${props.value} is not a valid email address`,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Challenge',
        },
    ],
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const hashAsync = util_1.promisify(bcryptjs_1.default.hash);
            this.password = yield hashAsync(this.password, 10);
            this.passwordChangedAt = Math.round(new Date().getTime());
        }
        return next();
    });
});
UserSchema.statics.me = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const me = yield this.findById(id).select('-password');
        if (!me) {
            const errors = [
                { msg: 'Unauthenticated. Please login to continue', param: 'id' },
            ];
            throw new _errors_1.UnauthenException(errors);
        }
        return me;
    });
};
UserSchema.statics.findByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const me = yield this.findOne({ email });
        if (!me) {
            const errors = [{ msg: 'Email is not belong to any user', param: 'email' }];
            throw new _errors_1.UnauthenException(errors);
        }
        return me;
    });
};
UserSchema.statics.newUser = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield this.create(Object.assign({}, user));
        return newUser;
    });
};
UserSchema.methods.comparePassword = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const asyncCompare = util_1.promisify(bcryptjs_1.default.compare);
        const result = yield asyncCompare(password, hashedPassword);
        if (!result) {
            const errors = [{ msg: 'Incorrect password', param: 'password' }];
            throw new _errors_1.BadRequest(errors);
        }
    });
};
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
