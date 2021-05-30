"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const HttpException_1 = __importDefault(require("../HttpException"));
const { expect } = chai_1.default;
describe('Http Exception Test Suite', () => {
    it('Return status code 400 on extends Http Exception with implement statusCode = 400', () => {
        class Error400 extends HttpException_1.default {
            constructor(errors) {
                super();
                this.errors = errors;
                this.statusCode = 400;
                Object.setPrototypeOf(this, Error400.prototype);
            }
            serializeErrors() {
                return this.errors.map((error) => ({
                    message: error.msg,
                    field: error.param,
                }));
            }
        }
        const errors = [{ msg: 'Custom Exception', param: '' }];
        const error400 = new Error400(errors);
        expect(error400.statusCode).to.equal(400);
        expect(error400.serializeErrors()).to.be.a('array');
    });
    it('Return status code 401 on extends Http Exception with implement statusCode = 401', () => {
        class Error401 extends HttpException_1.default {
            constructor(errors) {
                super();
                this.errors = errors;
                this.statusCode = 401;
                Object.setPrototypeOf(this, Error401.prototype);
            }
            serializeErrors() {
                return this.errors.map((error) => ({
                    message: error.msg,
                    field: error.param,
                }));
            }
        }
        const errors = [{ msg: 'Custom Exception', param: '' }];
        const error401 = new Error401(errors);
        expect(error401.statusCode).to.equal(401);
        expect(error401.serializeErrors()).to.be.a('array');
    });
});
