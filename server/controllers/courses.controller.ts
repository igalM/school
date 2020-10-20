import { JsonController, Get, Authorized, Post, Body, UseBefore, Delete, Param, Req } from "routing-controllers";
import { CourseRepository } from "../repositories/course.repository";
import { CourseDocument, Course } from "../models/course.model";
import { TeacherRepository } from "../repositories/teacher.repository";
import { StudentRepository } from "../repositories/student.repository";
import { StudentDocument } from "../models/student.model";
import * as compression from 'compression';
import handle from "../handlers/handle.promises";
import { TeacherDocument } from "../models/teacher.model";
import upload from "../handlers/file.upload";

@UseBefore(compression())
@JsonController('/courses')
export class CoursesController {
    constructor(
        private readonly courseRepository: CourseRepository,
        private readonly teacherRepository: TeacherRepository,
        private readonly studentRepository: StudentRepository
    ) { }

    @Authorized()
    @Get('')
    async getAll(): Promise<CourseDocument[]> {
        const [err, courses] = await handle(this.courseRepository.findAll());
        if (err) throw new Error(err.message);
        return courses;
    }

    @Authorized()
    @Post('/add')
    @UseBefore(upload.single('image'))
    async addCourse(@Req() req: any, @Body() course: Course): Promise<CourseDocument> {
        let err: Error, savedCourse: CourseDocument, savedTeacher: TeacherDocument;
        course.image = req.file ? req.file.location : 'https://school-images-1.s3.eu-central-1.amazonaws.com/1588445079267';
        [err, savedCourse] = await handle(this.courseRepository.save(course), 'Failed to save course');
        if (err) throw new Error(err.message);
        [err, savedTeacher] = await handle(this.teacherRepository.updateTeacherCourses(savedCourse.teacher.id, savedCourse.id), 'Failed to save course');
        if (err) throw new Error(err.message);
        return savedCourse;
    }

    @Authorized()
    @Post('/join')
    async joinCourse(@Body() body: { sId: string, cId: string }): Promise<{ course: CourseDocument, student: StudentDocument }> {
        let err: Error, updatedCourse: CourseDocument, updatedStudent: StudentDocument;
        [err, updatedCourse] = await handle(this.courseRepository.join(body.sId, body.cId), 'Failed to join course');
        if (err) throw new Error(err.message);
        [err, updatedStudent] = await handle(this.studentRepository.joinCourse(body.sId, body.cId), 'Failed to join course');
        if (err) throw new Error(err.message);
        return { course: updatedCourse, student: updatedStudent };
    }

    @Authorized()
    @Delete('/leave/:ids')
    async leaveCourse(@Param('ids') ids: string): Promise<{ course: CourseDocument, student: StudentDocument }> {
        let err: Error, updatedCourse: CourseDocument, updatedStudent: StudentDocument;
        const studentId = ids.split('&')[0];
        const courseId = ids.split('&')[1];
        [err, updatedCourse] = await handle(this.courseRepository.leave(studentId, courseId), 'Failed to leave course');
        if (err) throw new Error(err.message);
        [err, updatedStudent] = await handle(this.studentRepository.leaveCourse(studentId, courseId), 'Failed to leave course');
        if (err) throw new Error(err.message);
        return { course: updatedCourse, student: updatedStudent };
    }

}