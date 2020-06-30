import { UserRole } from '../enums/user/user.role';
import { StudentDto } from './student.dto';
import { TeacherDto } from './teacher.dto';

export class UserDto {
    id: string;
    email: string;
    role: UserRole;
    token: string;
    student?: StudentDto;
    teacher?: TeacherDto;
    image: File;
}