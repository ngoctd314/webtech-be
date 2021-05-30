"use strict";
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
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = __importDefault(require("src/app"));
const auth_1 = require("@__test__/data/auth");
const _config_1 = __importDefault(require("@config"));
const apiVersion = _config_1.default.server.api.version;
const { expect } = chai_1.default;
chai_1.default.use(chai_http_1.default);
describe('Login Test Suite', () => {
    const { email, password } = auth_1.userTest;
    it('Return status code 200 on successfully login', () => __awaiter(void 0, void 0, void 0, function* () {
        yield global.register(auth_1.userTest);
        const res = yield chai_1.default
            .request(app_1.default)
            .post(`/${apiVersion}/auth/login`)
            .send({ email, password });
        expect(res.status).to.equal(200);
        expect(res.get('Set-Cookie')).to.be.a('array');
    }));
    it('Return status code 400 on incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield global.register(auth_1.userTest);
        const res = yield chai_1.default
            .request(app_1.default)
            .post(`/${apiVersion}/auth/login`)
            .send({ email, password: 'incorrect-password' });
        expect(res.status).to.equal(400);
        expect(res.body.errors).to.be.a('array');
    }));
});
