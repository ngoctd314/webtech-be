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
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = __importDefault(require("src/app"));
const _config_1 = __importDefault(require("@config"));
const apiVersion = _config_1.default.server.api.version;
const { expect } = chai_1.default;
chai_1.default.use(chai_http_1.default);
let mongo;
before('Connect DB before all test', () => __awaiter(void 0, void 0, void 0, function* () {
    mongo = new mongodb_memory_server_1.MongoMemoryServer();
    const mongoUri = yield mongo.getUri();
    yield mongoose_1.default.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
}));
beforeEach('Clear DB before each test', () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield mongoose_1.default.connection.db.collections();
    for (const collection of collections) {
        yield collection.deleteMany({});
    }
}));
after('Stop DB after all test', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongo.stop();
    yield mongoose_1.default.connection.close();
}));
global.register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = user;
    const res = yield chai_1.default
        .request(app_1.default)
        .post(`/${apiVersion}/auth/register`)
        .send({ email, password, firstName, lastName });
    expect(res.status).to.equal(201);
    const cookie = res.get('Set-Cookie');
    expect(cookie).to.be.a('array');
    expect(res.body.message).to.equal('Please check email: example@gmail.com to validate account');
    return cookie;
});
global.apiVersion = _config_1.default.server.api.version;
