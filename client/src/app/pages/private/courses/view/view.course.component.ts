import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseDto } from 'src/app/shared/models/course.dto';
import { UserDto } from 'src/app/shared/models/user.dto';
import { UserRole } from 'src/app/shared/enums/user/user.role';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store/index';
import { selectCourse, studentJoinCourse, studentLeaveCourse } from 'src/store/actions/course.actions';
import { MatDialog } from '@angular/material/dialog';
import { CourseActionsDialogComponent } from '../parts/dialog/course.actions.dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'view-course-component',
  templateUrl: './view.course.component.html',
  styleUrls: ['./view.course.component.scss']
})
export class ViewCourseComponent implements OnInit, OnDestroy {

  public course: CourseDto = null;
  public user: UserDto = null;
  public UserRole = UserRole;
  private unsubscribe$ = new Subject()


  public isAlreadyJoined: boolean = false;
  public isFull: boolean = false;

  constructor(
    private readonly store: Store<fromApp.AppState>,
    private readonly router: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly routerNav: Router
  ) {

    this.store.select(fromApp.getUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
      });

    this.store.select(fromApp.getSelectedCourse)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.course = res;
          const studentFound = this.course.students.find(x => x._id === this.user.student?._id);
          if (studentFound) {
            this.isAlreadyJoined = true;
          } else {
            this.isAlreadyJoined = false;
          }
          if (this.course.students.length === parseInt(this.course.howManyStudents)) {
            this.isFull = true;
          } else {
            this.isFull = false;
          }
        }
      });

  }

  ngOnInit(): void {
    this.router.params
      .subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.store.dispatch(selectCourse({ id: id }));
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(CourseActionsDialogComponent, {
      width: '450px',
      maxWidth: '90vw',
      data: {
        action: this.isAlreadyJoined ? 'leave' : 'join'
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          if (!this.isAlreadyJoined) {
            this.store.dispatch(studentJoinCourse({ studentId: this.user.student._id, courseId: this.course._id }));
          } else {
            this.store.dispatch(studentLeaveCourse({ studentId: this.user.student._id, courseId: this.course._id }));
          }
        }
      });
  }


  navigateToStudent(id: string) {
    this.routerNav.navigate(['/student-profile', id]);
  }

}
