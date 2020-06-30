import { JsonController, Get, Authorized, UseBefore } from "routing-controllers";
import { TeacherRepository } from "../repositories/teacher.repository";
import { TeacherDocument } from "../models/teacher.model";
import * as compression from 'compression';
import handle from "../handlers/handle.promises";

@UseBefore(compression())
@JsonController('/teachers')
export class TeachersController {
    constructor(
        private readonly teacherRepository: TeacherRepository
    ) { }

    @Authorized()
    @Get('')
    async getAll(): Promise<TeacherDocument[]> {
        const [err, teachers] = await handle(this.teacherRepository.findAll());
        if (err) throw new Error(err.message);
        return teachers;
    }
}