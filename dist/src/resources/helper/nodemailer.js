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
const nodemailer_1 = require("nodemailer");
const _config_1 = __importDefault(require("@config"));
function sendMail(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.createTransport({
            service: _config_1.default.mail.service,
            auth: {
                user: _config_1.default.mail.username,
                pass: _config_1.default.mail.password,
            },
        });
        const mailOptions = {
            from: 'TDN Social Media <tdn.social.media@gmail.com>',
            to: options.email,
            subject: options.subject,
            text: options.text,
        };
        yield transporter.sendMail(mailOptions);
    });
}
exports.default = sendMail;
