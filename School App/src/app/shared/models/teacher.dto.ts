import { CourseDto } from './course.dto';

export class TeacherDto {
    _id?: string;
    name: string;
    gender: string;
    age: number;
    courses: CourseDto[];
    image: string;
}