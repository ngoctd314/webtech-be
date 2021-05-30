"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const _common_1 = require("@common");
const routes_1 = __importDefault(require("@auth/routes"));
const routes_2 = __importDefault(require("@user/routes"));
const routes_3 = __importDefault(require("@admin/routes"));
const routes_4 = __importDefault(require("@challenge/routes"));
const routes_5 = __importDefault(require("@post/routes"));
const routes_6 = __importDefault(require("@comment/routes"));
const _config_1 = __importDefault(require("@config"));
const app = express_1.default();
const { server, client } = _config_1.default;
app.use(helmet_1.default());
app.use(cors_1.default({
    origin: client.domain,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
}));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Web Tech Api',
            version: server.api.version,
        },
    },
    apis: ['./src/resources/**/routes.ts'],
};
app.use(`/${server.api.version}/docs`, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_jsdoc_1.default(options)));
app.use(`/${server.api.version}/admin`, routes_3.default);
app.use(`/${server.api.version}/auth`, routes_1.default);
app.use(`/${server.api.version}/user`, routes_2.default);
app.use(`/${server.api.version}/challenge`, routes_4.default);
app.use(`/${server.api.version}/post`, routes_5.default);
app.use(`/${server.api.version}/comment`, routes_6.default);
app.all('*', (req, res, next) => {
    next('Resource not found');
});
app.use(_common_1.handleError);
exports.default = app;
