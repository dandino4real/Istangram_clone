"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eHtml = exports.sendEmail = exports.generateOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiryTime = new Date();
    expiryTime.setTime(new Date().getTime() + (30 * 60 * 1000));
    return { otp, expiryTime };
};
exports.generateOtp = generateOtp;
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.GMAIL_USER,
        pass: config_1.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
});
const sendEmail = async (from, to, subject, html) => {
    try {
        const response = await transport.sendMail({
            from: config_1.FromAdminMail,
            to,
            subject: config_1.userSubject,
            html // html body
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendEmail = sendEmail;
const eHtml = (otp) => {
    let result = `
    <div style = "max-width:700px; margin: auto; border: 10px solid #ddd; padding: 50px, 20px; font-size: 110%;">
    <h2 style = "text-align: center; text-transform: uppercase; color: teal;">
    Welcome to Victor Store
    </h2>
    <p>
    Hi there, your OTP is ${otp}
    </p>
    </div>
    `;
    return result;
};
exports.eHtml = eHtml;
