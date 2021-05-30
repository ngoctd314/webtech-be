"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const ValidatorException_1 = __importDefault(require("../ValidatorException"));
const { expect } = chai_1.default;
describe('Express-Validator Exception Test Suite', () => {
    it('Return status code 400 on create new ValidatorException error', () => {
        const errors = [
            { msg: 'Email is required', param: 'email' },
        ];
        const emailValidationError = new ValidatorException_1.default(errors);
        expect(emailValidationError.statusCode).to.equal(400);
        expect(emailValidationError.serializeErrors()).to.be.a('array');
    });
});
