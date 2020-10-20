import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CourseDto } from '../models/course.dto';
import { StudentDto } from '../models/student.dto';

@Injectable()
export class CoursesService {

    private readonly api: string = environment.servers.api;
    private readonly route: string = '/courses';

    constructor(
        private readonly http: HttpClient
    ) { }

    public get(): Observable<CourseDto[]> {
        return <Observable<CourseDto[]>>this.http.get(this.api + this.route);
    }

    public add(model: CourseDto): Observable<CourseDto> {
        const formData = new FormData();
        formData.append('image', model.image);
        formData.append('name', model.name);
        formData.append('teacher', model.teacher._id);
        formData.append('description', model.description);
        formData.append('howManyStudents', model.howManyStudents);
        return <Observable<CourseDto>>this.http.post(this.api + this.route + '/add', formData);
    }

    public join(studentId: string, courseId: string): Observable<{ course: CourseDto, student: StudentDto }> {
        return <Observable<{ course: CourseDto, student: StudentDto }>>this.http.post(this.api + this.route + '/join', { sId: studentId, cId: courseId });
    }

    public leave(studentId: string, courseId: string): Observable<{ course: CourseDto, student: StudentDto }> {
        return <Observable<{ course: CourseDto, student: StudentDto }>>this.http.delete(this.api + this.route + `/leave/${studentId}&${courseId}`);
    }

}