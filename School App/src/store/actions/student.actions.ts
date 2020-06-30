import { createAction, props } from '@ngrx/store';
import { StudentDto } from 'src/app/shared/models/student.dto';

export const fetchStudents = createAction(
    '[Students] Fetch Students'
);

export const fetchStudentsSuccess = createAction(
    '[Students] Fetch Students Success',
    props<{ students: StudentDto[] }>()
);

export const selectStudent = createAction(
    '[Student] Select Student',
    props<{ id: string }>()
);

export const joinCourseSuccess = createAction(
    '[Course] Join Course Success',
    props<{ student: StudentDto }>()
);

export const leaveCourseSuccess = createAction(
    '[Course] Leave Course Success',
    props<{ student: StudentDto }>()
);
