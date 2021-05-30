"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const UnauthenException_1 = __importDefault(require("../UnauthenException"));
const { expect } = chai_1.default;
describe('Unauthenticated Request Test Suite', () => {
    it('Return status code 401 on create new UnauthenException error', () => {
        const errors = [{ msg: 'Unauthenticated request', param: 'token' }];
        const unauthenException = new UnauthenException_1.default(errors);
        expect(unauthenException.statusCode).to.equal(401);
        expect(unauthenException.serializeErrors()).to.be.a('array');
    });
});
