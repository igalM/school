import { Schema, model, Model, Document } from 'mongoose';
import { CourseDocument } from './course.model';
import { IsNotEmpty, IsArray } from 'class-validator';

// 1) CLASS
export class Student {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    age: number;

    @IsArray()
    courses: CourseDocument['_id'][];

    @IsNotEmpty()
    image: string;
}

// no necessary to export the schema (keep it private to the module)
const schema = new Schema({
    _id: { type: String },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    image: { type: String, required: false }
})

// 2) Document
export interface StudentDocument extends Student, Document {
    _id: string;
}

// 3) MODEL
export const Students = model<StudentDocument>('Student', schema)