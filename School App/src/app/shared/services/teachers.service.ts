import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TeacherDto } from '../models/teacher.dto';

@Injectable()
export class TeachersService {

    private readonly api: string = environment.servers.api;
    private readonly route: string = '/teachers';

    constructor(
        private readonly http: HttpClient
    ) { }

    public get(): Observable<TeacherDto[]> {
        return <Observable<TeacherDto[]>>this.http.get(this.api + this.route);
    }

}