import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core.module';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { privateRoutes } from './private.routes';
import { PrivateComponent } from './private.component';
import { SingleStudentComponent } from './students/parts/single-student/single.student.component';
import { ViewStudentComponent } from './students/view/view.student.component';
import { SingleCourseComponent } from './courses/parts/single-course/single.course.component';
import { SingleTeacherComponent } from './teachers/parts/single-teacher/single.teacher.component';
import { ViewTeacherComponent } from './teachers/view/view.teacher.component';
import { ViewCourseComponent } from './courses/view/view.course.component';
import { ListStudentsComponent } from './students/list/list.students.component';
import { ListTeachersComponent } from './teachers/list/list.teachers.component';
import { AddCourseDialogComponent } from './teachers/parts/dialog/add.course.dialog.component';
import { ListCoursesComponent } from './courses/list/list.courses.component';
import { CourseActionsDialogComponent } from './courses/parts/dialog/course.actions.dialog.component';

const components = [
  PrivateComponent,
  ListStudentsComponent,
  ListTeachersComponent,
  ListCoursesComponent,
  NavMenuComponent,

  ViewStudentComponent,
  ViewTeacherComponent,
  ViewCourseComponent,

  SingleStudentComponent,
  SingleCourseComponent,
  SingleTeacherComponent
]

const dialogs = [
  AddCourseDialogComponent,
  CourseActionsDialogComponent
]

@NgModule({
  declarations: [
    components,
    dialogs
  ],
  imports: [
    CoreModule,
    RouterModule.forChild(privateRoutes),
  ],
  entryComponents: [dialogs],
  exports: [RouterModule]
})
export class PrivateModule { }
