import { createAction, props } from '@ngrx/store';
import { CourseDto } from 'src/app/shared/models/course.dto';

export const fetchCourses = createAction(
    '[Courses] Fetch Courses'
);

export const fetchCoursesSuccess = createAction(
    '[Courses] Fetch Courses Success',
    props<{ courses: CourseDto[] }>()
);

export const teacherAddCourse = createAction(
    '[Course] Teacher Add Course',
    props<{ course: CourseDto }>()
);

export const teacherAddCourseSuccess = createAction(
    '[Course] Teacher Add Course Success',
    props<{ course: CourseDto }>()
);

export const studentJoinCourse = createAction(
    '[Course] Student Join Course',
    props<{ studentId: string, courseId: string }>()
);

export const studentJoinCourseSuccess = createAction(
    '[Course] Student Join Course Success',
    props<{ course: CourseDto }>()
);

export const studentLeaveCourse = createAction(
    '[Course] Student Leave Course',
    props<{ studentId: string, courseId: string }>()
);

export const studentLeaveCourseSuccess = createAction(
    '[Course] Student Leave Course Success',
    props<{ course: CourseDto }>()
);

export const selectCourse = createAction(
    '[Course] Select Course',
    props<{ id: string }>()
);
