import { Schema, model, Model, Document } from 'mongoose';
import { StudentDocument } from './student.model';
import { TeacherDocument } from './teacher.model';
import { IsNotEmpty, IsArray } from 'class-validator';

// 1) CLASS
export class Course {
    id?: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    howManyStudents: string;

    @IsArray()
    students: StudentDocument['id'][];

    @IsArray()
    teacher: TeacherDocument['id'];

    @IsNotEmpty()
    image: string;
}

// no necessary to export the schema (keep it private to the module)
const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    howManyStudents: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    image: { type: String, required: false }
})

// 2) Document
export interface CourseDocument extends Course, Document {
    id: string;
}

// 3) MODEL
export const Courses = model<CourseDocument>('Course', schema)