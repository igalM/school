import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../../../../store/index';
import { Store } from '@ngrx/store';
import { TeacherDto } from 'src/app/shared/models/teacher.dto';
import { UserDto } from 'src/app/shared/models/user.dto';
import { UserRole } from 'src/app/shared/enums/user/user.role';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { selectTeacher } from 'src/store/actions/teacher.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '../parts/dialog/add.course.dialog.component';
import { CourseDto } from 'src/app/shared/models/course.dto';
import { teacherAddCourse } from 'src/store/actions/course.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'view-teacher-component',
  templateUrl: './view.teacher.component.html',
  styleUrls: ['./view.teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit, OnDestroy {

  public teacher: TeacherDto = null;
  public user: UserDto = null;
  public UserRole = UserRole;
  private unsubscribe$ = new Subject()

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

    this.store.select(fromApp.getSelectedTeacher)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.teacher = res;
        }
      });

  }

  ngOnInit(): void {
    this.router.params
      .subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.store.dispatch(selectTeacher({ id: id }));
        }
      });
  }



  public openDialog() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '450px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed()
      .subscribe((res: CourseDto) => {
        if (res) {
          res.teacher = this.teacher;
          this.store.dispatch(teacherAddCourse({ course: res }));
        }
      });
  }

  navigateToCourse(id: string) {
    this.routerNav.navigate(['/view-course', id]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
