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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const VreifyEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, html }) {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_VALID,
            pass: process.env.EMAILVALID_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_VALID,
        to,
        subject,
        html,
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.default = VreifyEmail;
