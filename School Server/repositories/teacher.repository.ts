import { Service } from "typedi";
import { Teacher, Teachers, TeacherDocument } from "../models/teacher.model";

@Service()
export class TeacherRepository {

    save(teacher: Teacher): Promise<TeacherDocument> {
        return Promise.resolve(Teachers.create(teacher));
    }

    updateTeacherCourses(teacherId: string, courseId: any): Promise<TeacherDocument> {
        return Promise.resolve(Teachers.findByIdAndUpdate(teacherId, { "$push": { "courses": courseId } }, { new: true }))
    }

    findOne(id: string): Promise<TeacherDocument> {
        return Promise.resolve(Teachers.findById(id));
    }

    findAll(): Promise<TeacherDocument[]> {
        return Promise.resolve(
            Teachers.find()
                .populate('courses'));
    }
}