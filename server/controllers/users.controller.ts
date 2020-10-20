import { JsonController, Body, Post, UnauthorizedError, UseBefore, Req } from "routing-controllers";
import { UserRepository } from "../repositories/user.repository";
import { StudentRepository } from "../repositories/student.repository";
import { UserRoles } from "../enums/user.role";
import { Student, StudentDocument } from "../models/student.model";
import { Teacher, TeacherDocument } from "../models/teacher.model";
import { TeacherRepository } from "../repositories/teacher.repository";
import { User, UserDocument } from "../models/user.model";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as compression from 'compression';
import upload from "../handlers/file.upload";
import handle from "../handlers/handle.promises";

@UseBefore(compression())
@JsonController('/users')
export class UserController {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly studentRepository: StudentRepository,
        private readonly teacherRepository: TeacherRepository,
    ) { }

    @Post("/signup")
    @UseBefore(upload.single('image'))
    async signup(@Req() req: any, @Body() body: any): Promise<User> {
        let err: Error, emailExists: User, savedUser: UserDocument,
            savedStudent: StudentDocument, savedTeacher: TeacherDocument;
        [err, emailExists] = await handle(this.userRepository.findOne(body.email));
        if (emailExists) throw new Error('Email is already registered! Please login!');
        const user: User = {
            email: body.email,
            role: body.role,
            password: body.password
        };
        [err, savedUser] = await handle(this.userRepository.save(user));
        if (err) throw new Error(err.message);
        savedUser.password = body.password;
        if (body.role === UserRoles.Student) {
            const student: Student = {
                _id: savedUser.id,
                name: body.name,
                gender: body.gender,
                age: body.age,
                courses: [],
                image: req.file ? req.file.location : this.getImageUrl(body.gender)
            };
            [err, savedStudent] = await handle(this.studentRepository.save(student));
        }
        if (body.role === UserRoles.Teacher) {
            const teacher: Teacher = {
                _id: savedUser.id,
                name: body.name,
                gender: body.gender,
                age: body.age,
                courses: [],
                image: req.file ? req.file.location : this.getImageUrl(body.gender)
            };
            [err, savedTeacher] = await handle(this.teacherRepository.save(teacher));
        }
        if (err) throw new Error(err.message);
        return savedUser;
    }

    @Post("/login")
    async login(@Body() user: User): Promise<any> {
        let err: Error, foundUser: User, student: StudentDocument,
            teacher: TeacherDocument, response: any, isEqual: boolean;
        [err, foundUser] = await handle(this.userRepository.findOne(user.email), 'User was not found!');
        if (err) throw new Error(err.message);
        if (user.password) {
            isEqual = await bcrypt.compare(user.password, foundUser.password);
            if (!isEqual) throw new UnauthorizedError('Password is not verified!');
        }
        const token = jwt.sign({ email: foundUser.email, }, 'somesupersecretsecret');
        if (foundUser.role === UserRoles.Student) {
            [err, student] = await handle(this.studentRepository.findOne(foundUser.id));
            response = {
                email: foundUser.email,
                role: foundUser.role,
                token: token,
                student: student,
                teacher: null
            }
        }
        if (foundUser.role === UserRoles.Teacher) {
            [err, teacher] = await handle(this.teacherRepository.findOne(foundUser.id));
            response = {
                email: foundUser.email,
                role: foundUser.role,
                token: token,
                student: null,
                teacher: teacher
            }
        }
        if (err) throw new Error(err.message);
        return response;
    }

    getImageUrl(gender: string): string {
        const maleAvatar: string = 'https://school-images-1.s3.eu-central-1.amazonaws.com/1588439810143';
        const femaleAvatar: string = 'https://school-images-1.s3.eu-central-1.amazonaws.com/1588439697588';
        return gender === 'Female' ? femaleAvatar : maleAvatar;
    }

}