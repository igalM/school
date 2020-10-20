import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './reducers/student.reducer';
import * as fromTeacher from './reducers/teacher.reducer';
import * as fromCourse from './reducers/course.reducer';
import * as fromUser from './reducers/user.reducer';

export interface AppState {
    students: fromStudent.State;
    teachers: fromTeacher.State;
    courses: fromCourse.State;
    user: fromUser.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    students: fromStudent.studentReducer,
    teachers: fromTeacher.teacherReducer,
    courses: fromCourse.courseReducer,
    user: fromUser.userReducer
}

// feature selectors

export const selectStudentState = createFeatureSelector<fromStudent.State>('students');
export const selectTeacherState = createFeatureSelector<fromTeacher.State>('teachers');
export const selectCourseState = createFeatureSelector<fromCourse.State>('courses');
export const selectUserState = createFeatureSelector<fromUser.State>('user');

// students selectors

export const getStudents = createSelector(
    selectStudentState,
    state => state.students
);

export const getSelectedStudentId = createSelector(
    selectStudentState,
    state => state.selectedId
);

export const getSelectedStudent = createSelector(
    getStudents,
    getSelectedStudentId,
    (students, id) => {
        return students.find(x => x._id === id);
    }
);

// teacher selectors

export const getTeachers = createSelector(
    selectTeacherState,
    state => state.teachers
);

export const getSelectedTeacherId = createSelector(
    selectTeacherState,
    state => state.selectedId
);

export const getSelectedTeacher = createSelector(
    getTeachers,
    getSelectedTeacherId,
    (teachers, id) => {
        return teachers.find(x => x._id === id);
    }
);

// course selectors

export const getCourses = createSelector(
    selectCourseState,
    state => state.courses
);

export const getSelectedCourseId = createSelector(
    selectCourseState,
    state => state.selectedId
);

export const getSelectedCourse = createSelector(
    getCourses,
    getSelectedCourseId,
    (courses, id) => {
        return courses.find(x => x._id === id);
    }
);


// user selectors

export const getUser = createSelector(
    selectUserState,
    state => state.user
);

export const getUserLoading = createSelector(
    selectUserState,
    state => state.loading
);
