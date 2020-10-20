import { createAction, props } from '@ngrx/store';
import { TeacherDto } from 'src/app/shared/models/teacher.dto';
import { CourseDto } from 'src/app/shared/models/course.dto';

export const fetchTeachers = createAction(
    '[Teachers] Fetch Teachers'
);

export const fetchTeachersSuccess = createAction(
    '[Teachers] Fetch Teachers Success',
    props<{ teachers: TeacherDto[] }>()
);

export const addCourseSuccess = createAction(
    '[Course] Add Course Success',
    props<{ course: CourseDto }>()
);

export const selectTeacher = createAction(
    '[Teacher] Select Teacher',
    props<{ id: string }>()
);
