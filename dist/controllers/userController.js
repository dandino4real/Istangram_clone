"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const userModel_1 = require("../models/userModel");
const utilities_1 = require("../utils/utilities");
//register user
const Register = async (req, res) => {
    try {
        const { name, email, phone, password, confirm_password } = req.body;
        const validateInput = utilities_1.registerSchema.validate(req.body, utilities_1.option);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        //check if user exist
        const user = await userModel_1.User.findOne({ email });
        if (!user) {
            const salt = await (0, utilities_1.generateSalt)();
            const userPassword = await (0, utilities_1.generateHashedPassword)(password, salt);
            const newUser = (await userModel_1.User.create({
                name,
                email,
                phone,
                password: userPassword,
                salt,
                token: '',
                expire_token: ''
            }));
            return res.status(200).json({
                message: "User created successfully",
                data: newUser,
            });
        }
        else {
            return res.status(400).json({
                message: "User already exist",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.Register = Register;
//login user
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate input
        const validateInput = utilities_1.registerSchema.validate(req.body, utilities_1.option);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        //check if user exist in db
        const user = await userModel_1.User.findOne({ email });
        if (user) {
            //compare password
            const validation = await (0, utilities_1.validatePassword)(password, user.password, user.salt);
            if (validation) {
                const token = await (0, utilities_1.generateSignature)({ _id: user._id, email: user.email });
                res.json({
                    message: "Login successful",
                    token
                });
            }
            else {
                return res.status(400).json({
                    message: "Invalid email or password",
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.Login = Login;
