import { createReducer, on, Action } from '@ngrx/store';
import { TeacherActions } from '../actions/actions';
import { TeacherDto } from 'src/app/shared/models/teacher.dto';

export interface State {
    teachers: TeacherDto[];
    selectedId: string;
}

const initialState: State = {
    teachers: [],
    selectedId: ''
}

const _teacherReducer = createReducer(
    initialState,
    on(
        TeacherActions.fetchTeachersSuccess, (state, { teachers }) => ({
            ...state,
            teachers: teachers
        })
    ),
    on(
        TeacherActions.addCourseSuccess, (state, { course }) => {
            const updatedTeachers = [...state.teachers];
            const teacher = state.teachers.find(x => x._id === course.teacher._id);
            const index = updatedTeachers.findIndex(x => x._id === course.teacher._id);
            updatedTeachers[index].courses = [...teacher.courses, course];
            return {
                ...state,
                teachers: updatedTeachers
            }
        }),
    on(
        TeacherActions.selectTeacher, (state, { id }) => ({
            ...state,
            selectedId: id
        })
    )
)

export function teacherReducer(state: State | undefined, action: Action) {
    return _teacherReducer(state, action)
}