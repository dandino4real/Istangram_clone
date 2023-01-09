import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { UserPayload } from '../interface/User.dto';


//joi validation
export const registerSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().regex(/[A-Za-z0-9]{3,30}/),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('confirm password').messages({'any.only': '{{#label}} does not match'}),
    phone: Joi.string().required()
})

export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().regex(/[A-Za-z0-9]{3,30}/),
})


export const option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}


//hashing password

export const generateSalt = async()=>{
    return await bcrypt.genSalt()
};

export const generateHashedPassword = async(password: string, salt: string)=>{
    return await bcrypt.hash(password, salt)
};


//compare password

export const validatePassword=async(received: string, saved: string, salt: string)=>{
    return await bcrypt.hash(received, salt) === saved;
}


//jwt token


export const generateSignature=async(payload: UserPayload)=>{
    return jwt.sign(payload, APP_SECRET, {expiresIn: '1d'})
}

export const verifyJwtoken=async(signature: string)=>{
    return jwt.verify(signature, APP_SECRET)
}