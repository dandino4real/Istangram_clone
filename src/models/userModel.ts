import { Schema, model } from 'mongoose';

export interface UserAtrributes {
        name: string;
        email: string;
        password: string;
        phone: string;
        token: string;
        salt: string;
        expire_token: Date;
        
}

const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    salt: { type: String, required: true },
    token: String,
    expire_token: Date,
  });
  
  export const User = model<UserAtrributes>('user', userSchema);
  