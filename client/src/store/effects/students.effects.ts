import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { StudentsService } from 'src/app/shared/services/students.service';
import { StudentActions } from '../actions/actions';

@Injectable()
export class StudentEffects {

    getStudents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentActions.fetchStudents),
            switchMap(() => this.studentsService.get().pipe(
                map(students => StudentActions.fetchStudentsSuccess({ students: students }))
            )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly studentsService: StudentsService
    ) { }
}