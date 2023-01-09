import express, { Request, Response } from "express";
import { User, UserAtrributes } from "../models/userModel";
import {
  generateHashedPassword,
  generateSalt,
  option,
  registerSchema,
} from "../utils/utilities";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, confirm_password } = req.body;

    const validateInput = registerSchema.validate(req.body, option);
    if (validateInput.error) {
      return res.status(400).json({
        Error: validateInput.error.details[0].message,
      });
    }
    
//check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      const salt = await generateSalt();
      const userPassword = await generateHashedPassword(password, salt);

      const newUser = (await User.create({
        name,
        email,
        phone,
        password: userPassword,
        salt,
        token: '',
        expire_token:''
      })) as unknown as UserAtrributes;

      return res.status(200).json({
        message: "User created successfully",
        data: newUser,
      });
    } else {
      return res.status(400).json({
        message: "User already exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
