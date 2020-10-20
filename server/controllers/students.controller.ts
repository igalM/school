import { JsonController, Get, Authorized, UseBefore } from "routing-controllers";
import { StudentRepository } from "../repositories/student.repository";
import { StudentDocument } from "../models/student.model";
import * as compression from 'compression';
import handle from "../handlers/handle.promises";

@UseBefore(compression())
@JsonController('/students')
export class StudentsController {
    constructor(
        private readonly studentRepository: StudentRepository
    ) { }

    @Authorized()
    @Get('')
    async getAll(): Promise<StudentDocument[]> {
        const [err, students] = await handle(this.studentRepository.findAll());
        if (err) throw new Error(err.message);
        return students;
    }
}