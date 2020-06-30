import { createReducer, on, Action } from '@ngrx/store';
import { StudentActions } from '../actions/actions';
import { StudentDto } from 'src/app/shared/models/student.dto';

export interface State {
    students: StudentDto[];
    selectedId: string;
}

const initialState: State = {
    students: [],
    selectedId: ''
}

const _studentReducer = createReducer(
    initialState,
    on(
        StudentActions.fetchStudentsSuccess, (state, { students }) => ({
            ...state,
            students: students
        })
    ),
    on(
        StudentActions.joinCourseSuccess,
        StudentActions.leaveCourseSuccess,
        (state, { student }) => {
            const updatedStudents = [...state.students];
            const index = updatedStudents.findIndex(x => x._id === student._id);
            updatedStudents[index] = student;
            return {
                ...state,
                students: updatedStudents
            }
        }),
    on(
        StudentActions.selectStudent, (state, { id }) => ({
            ...state,
            selectedId: id
        })
    )
)

export function studentReducer(state: State | undefined, action: Action) {
    return _studentReducer(state, action)
}