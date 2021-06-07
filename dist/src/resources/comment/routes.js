"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const _middleware_1 = require("@middleware");
const router = express_1.Router();
router.post('/', _middleware_1.authenticated, controllers_1.crudComment._create);
router.get('/', _middleware_1.authenticated, controllers_1.crudComment._read);
exports.default = router;
