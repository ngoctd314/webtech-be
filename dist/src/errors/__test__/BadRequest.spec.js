"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const BadRequest_1 = __importDefault(require("../BadRequest"));
const { expect } = chai_1.default;
describe('Bad Request Test Suite', () => {
    it('Return status code 400 on create new BadRequest error', () => {
        const errors = [{ msg: 'Invalid email', param: 'email' }];
        const badRequest = new BadRequest_1.default(errors);
        expect(badRequest.statusCode).to.equal(400);
        expect(badRequest.serializeErrors()).to.be.a('array');
    });
});
