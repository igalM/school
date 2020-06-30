import { StudentDto } from './student.dto';
import { TeacherDto } from './teacher.dto';

export class CourseDto {
    _id?: string;
    name: string;
    description: string;
    students: StudentDto[];
    teacher: TeacherDto;
    howManyStudents: string;
    image: string;
}