import { createReducer, on, Action } from '@ngrx/store';
import { CourseActions } from '../actions/actions';
import { CourseDto } from 'src/app/shared/models/course.dto';

export interface State {
    courses: CourseDto[];
    selectedId: string;
}

const initialState: State = {
    courses: [],
    selectedId: ''
}

const _courseReducer = createReducer(
    initialState,
    on(
        CourseActions.fetchCoursesSuccess, (state, { courses }) => ({
            ...state,
            courses: courses
        })
    ),
    on(
        CourseActions.teacherAddCourseSuccess, (state, { course }) => ({
            ...state,
            courses: [...state.courses, course]
        })
    ),
    on(
        CourseActions.studentJoinCourseSuccess,
        CourseActions.studentLeaveCourseSuccess,
        (state, { course }) => {
            const updatedCourses = [...state.courses];
            const index = updatedCourses.findIndex(x => x._id === course._id);
            updatedCourses[index] = course;
            return {
                ...state,
                courses: updatedCourses
            }
        }),
    on(
        CourseActions.selectCourse, (state, { id }) => ({
            ...state,
            selectedId: id
        })
    )
)

export function courseReducer(state: State | undefined, action: Action) {
    return _courseReducer(state, action)
}