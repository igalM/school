import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../../../../store/index';
import { Store } from '@ngrx/store';
import { StudentDto } from 'src/app/shared/models/student.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { selectStudent } from 'src/store/actions/student.actions';
import { UserDto } from 'src/app/shared/models/user.dto';
import { UserRole } from 'src/app/shared/enums/user/user.role';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'view-student-component',
  templateUrl: './view.student.component.html',
  styleUrls: ['./view.student.component.scss']
})
export class ViewStudentComponent implements OnInit, OnDestroy {

  public student: StudentDto = null;
  public user: UserDto = null;
  public UserRole = UserRole;
  private unsubscribe$ = new Subject()

  constructor(
    private readonly store: Store<fromApp.AppState>,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {

    this.store.select(fromApp.getUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
      });

    this.store.select(fromApp.getSelectedStudent)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.student = res;
        }
      });


  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.store.dispatch(selectStudent({ id: id }));
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navigateToCourse(id: string) {
    this.router.navigate(['/view-course', id]);
  }



}
