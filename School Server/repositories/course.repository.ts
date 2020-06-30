import { Service } from "typedi";
import { Course, CourseDocument, Courses } from "../models/course.model";

@Service()
export class CourseRepository {

    save(course: Course): Promise<CourseDocument> {
        return Promise.resolve(
            Courses.create(course)
                .then(course => course.populate('teacher').execPopulate())
        );
    }

    join(studentId: string, courseId: string): Promise<CourseDocument> {
        return Promise.resolve(Courses.findByIdAndUpdate(courseId, { "$push": { "students": studentId } }, { new: true })
            .populate('students')
            .populate('teacher'));
    }

    leave(studentId: string, courseId: string): Promise<CourseDocument> {
        return Promise.resolve(Courses.findByIdAndUpdate(courseId, { "$pull": { "students": studentId } }, { new: true })
            .populate('students')
            .populate('teacher'));
    }

    findOne(id: string): Promise<CourseDocument> {
        return Promise.resolve(Courses.findById(id));
    }

    findAll(): Promise<CourseDocument[]> {
        return Promise.resolve(
            Courses.find()
                .populate('students')
                .populate('teacher'));
    }

}