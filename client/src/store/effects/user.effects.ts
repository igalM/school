import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserActions } from '../actions/actions';
import { UsersService } from 'src/app/shared/services/users.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

    signupUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.signupUser),
            switchMap(({ user }) => this.usersService.signup(user)),
            map(user => UserActions.loginUser({ user: user })),
            catchError(() => of(UserActions.signupUserFailure()))));

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginUser),
            switchMap(({ user }) => this.usersService.login(user)),
            map(user => {
                const storageData = {
                    email: user.email,
                    role: user.role,
                    token: user.token
                }
                this.storageService.set(storageData);
                return UserActions.loginUserSuccess({ user: user });
            }),
            catchError(() => of(UserActions.loginUserFailure()))));

    constructor(
        private readonly actions$: Actions,
        private readonly usersService: UsersService,
        private readonly storageService: StorageService
    ) { }
}