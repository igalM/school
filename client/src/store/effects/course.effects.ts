import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, concatMap } from 'rxjs/operators';
import { CourseActions, TeacherActions, StudentActions } from '../actions/actions';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CourseDto } from 'src/app/shared/models/course.dto';

@Injectable()
export class CourseEffects {

    getCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.fetchCourses),
            switchMap(() => this.coursesService.get()),
            map(courses => CourseActions.fetchCoursesSuccess({ courses: courses }))));

    addCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.teacherAddCourse),
            switchMap(({ course }) => this.coursesService.add(course)),
            concatMap((course: CourseDto) => [
                CourseActions.teacherAddCourseSuccess({ course: course }),
                TeacherActions.addCourseSuccess({ course: course })
            ])));

    joinCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.studentJoinCourse),
            switchMap(({ studentId, courseId }) => this.coursesService.join(studentId, courseId)),
            concatMap(({ course, student }) => [
                CourseActions.studentJoinCourseSuccess({ course: course }),
                StudentActions.joinCourseSuccess({ student: student })])));

    leaveCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.studentLeaveCourse),
            switchMap(({ studentId, courseId }) => this.coursesService.leave(studentId, courseId)),
            concatMap(({ course, student }) => [
                CourseActions.studentLeaveCourseSuccess({ course: course }),
                StudentActions.leaveCourseSuccess({ student: student })])));

    constructor(
        private readonly actions$: Actions,
        private readonly coursesService: CoursesService
    ) { }
}