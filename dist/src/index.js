"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("@common");
const _config_1 = __importDefault(require("@config"));
const app_1 = __importDefault(require("./app"));
_common_1.connectDB(_config_1.default.database.uri);
const PORT = _config_1.default.server.port;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(_config_1.default.server.host);
});
