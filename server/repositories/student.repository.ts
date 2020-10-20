import { Service } from "typedi";
import { Student, StudentDocument, Students } from "../models/student.model";

@Service()
export class StudentRepository {

    save(student: Student): Promise<StudentDocument> {
        return Promise.resolve(Students.create(student));
    }

    joinCourse(studentId: string, courseId: string): Promise<StudentDocument> {
        return Promise.resolve(Students.findByIdAndUpdate(studentId, { "$push": { "courses": courseId } }, { new: true }).populate('courses'))
    }

    leaveCourse(studentId: string, courseId: string): Promise<StudentDocument> {
        return Promise.resolve(Students.findByIdAndUpdate(studentId, { "$pull": { "courses": courseId } }, { new: true }).populate('courses'))
    }

    findOne(id: string): Promise<StudentDocument> {
        return Promise.resolve(Students.findById(id));
    }

    findAll(): Promise<StudentDocument[]> {
        return Promise.resolve(
            Students.find()
                .populate('courses'));
    }
}