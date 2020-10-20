import { StudentsService } from './students.service';
import { StorageService } from './storage.service';
import { UsersService } from './users.service';
import { TeachersService } from './teachers.service';
import { CoursesService } from './courses.service';

export const services = [
    StudentsService,
    UsersService,
    StorageService,
    TeachersService,
    CoursesService
]