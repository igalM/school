import { createAction, props } from '@ngrx/store';
import { UserDto } from 'src/app/shared/models/user.dto';
import { UserLoginDto } from 'src/app/shared/models/user.login.dto';

export const signupUser = createAction(
    '[User Signup] User Signup',
    props<{ user: UserDto }>()
);

export const signupUserSuccess = createAction(
    '[User Signup] User Signup',
    props<{ user: UserDto }>()
);

export const signupUserFailure = createAction('[User Signup] User Signup Failure');

export const setUser = createAction(
    '[User] Set User',
    props<{ user: UserDto }>()
);

export const loginUser = createAction(
    '[User] User Login',
    props<{ user: UserLoginDto }>()
);

export const loginUserSuccess = createAction(
    '[User] User Login Success',
    props<{ user: UserDto }>()
);

export const loginUserFailure = createAction('[User] User Login Failure');


export const logoutUser = createAction('[User] User Logout');