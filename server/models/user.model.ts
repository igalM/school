import { Schema, model, Model, Document } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

// 1) CLASS
export class User {
    id?: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;
}

// no necessary to export the schema (keep it private to the module)
const schema = new Schema({
    email: { required: true, type: String },
    password: { required: true, type: String },
    role: { required: true, type: String }
})

// 2) Document
export interface UserDocument extends User, Document {
    id: string;
}

// 3) MODEL
export const Users = model<UserDocument>('User', schema)