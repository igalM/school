import { createReducer, on, Action } from '@ngrx/store';
import { UserActions } from '../actions/actions';
import { UserDto } from 'src/app/shared/models/user.dto';

export interface State {
    user: UserDto;
    loading: boolean;
}

const initialState: State = {
    user: null,
    loading: false
}

const _userReducer = createReducer(
    initialState,
    on(
        UserActions.signupUser,
        UserActions.loginUser,
        (state) => ({
            ...state,
            loading: true
        })
    ),
    on(
        UserActions.loginUserSuccess,
        (state, { user }) => ({
            ...state,
            user: user,
            loading: false
        })
    ),
    on(
        UserActions.loginUserFailure,
        UserActions.signupUserFailure,
        (state) => ({
            ...state,
            loading: false
        })
    ),
    on(
        UserActions.logoutUser, (state) => ({
            ...state,
            user: null

        })
    )
)

export function userReducer(state: State | undefined, action: Action) {
    return _userReducer(state, action)
}
