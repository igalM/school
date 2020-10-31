import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { TeacherActions } from '../actions/actions';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Injectable()
export class TeacherEffects {

    getTeachers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeacherActions.fetchTeachers),
            switchMap(() => this.teachersService.get()),
            map(teachers => TeacherActions.fetchTeachersSuccess({ teachers: teachers }))));

    constructor(
        private readonly actions$: Actions,
        private readonly teachersService: TeachersService
    ) { }
}