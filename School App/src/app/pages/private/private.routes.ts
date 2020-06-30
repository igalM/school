import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { ViewStudentComponent } from './students/view/view.student.component';
import { ListStudentsComponent } from './students/list/list.students.component';
import { ListTeachersComponent } from './teachers/list/list.teachers.component';
import { ViewTeacherComponent } from './teachers/view/view.teacher.component';
import { ListCoursesComponent } from './courses/list/list.courses.component';
import { ViewCourseComponent } from './courses/view/view.course.component';

export const privateRoutes: Routes = [
    {
        path: '', component: PrivateComponent, children: [

            { path: 'students', component: ListStudentsComponent },
            { path: 'student-profile/:id', component: ViewStudentComponent },

            { path: 'teachers', component: ListTeachersComponent },
            { path: 'teacher-profile/:id', component: ViewTeacherComponent },

            { path: 'courses', component: ListCoursesComponent },
            { path: 'view-course/:id', component: ViewCourseComponent }

        ]
    }
];