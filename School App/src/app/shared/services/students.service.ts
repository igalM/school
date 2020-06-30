import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StudentDto } from '../models/student.dto';
import { Observable } from 'rxjs';

@Injectable()
export class StudentsService {

    private readonly api: string = environment.servers.api;
    private readonly route: string = '/students';

    constructor(
        private readonly http: HttpClient
    ) { }

    public get(): Observable<StudentDto[]> {
        return <Observable<StudentDto[]>>this.http.get(this.api + this.route);
    }

}