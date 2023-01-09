"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtoken = exports.generateSignature = exports.validatePassword = exports.generateHashedPassword = exports.generateSalt = exports.option = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
//joi validation
exports.registerSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required().regex(/[A-Za-z0-9]{3,30}/),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).required().label('confirm password').messages({ 'any.only': '{{#label}} does not match' }),
    phone: joi_1.default.string().required()
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
//hashing password
const generateSalt = async () => {
    return await bcrypt_1.default.genSalt();
};
exports.generateSalt = generateSalt;
const generateHashedPassword = async (password, salt) => {
    return await bcrypt_1.default.hash(password, salt);
};
exports.generateHashedPassword = generateHashedPassword;
//compare password
const validatePassword = async (received, saved, salt) => {
    return await bcrypt_1.default.hash(received, salt) === saved;
};
exports.validatePassword = validatePassword;
//jwt token
const generateSignature = async (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.APP_SECRET, { expiresIn: '1d' });
};
exports.generateSignature = generateSignature;
const verifyJwtoken = async (signature) => {
    return jsonwebtoken_1.default.verify(signature, config_1.APP_SECRET);
};
exports.verifyJwtoken = verifyJwtoken;
