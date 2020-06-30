import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';
import { UserLoginDto } from '../models/user.login.dto';

@Injectable()
export class UsersService {
    private readonly api: string = environment.servers.api;
    private readonly route: string = '/users';

    constructor(
        private readonly http: HttpClient
    ) {

    }

    public signup(model: any): Observable<UserLoginDto> {
        const formData = new FormData();
        formData.append('image', model.image);
        formData.append('email', model.email);
        formData.append('role', model.role);
        formData.append('name', model.name);
        formData.append('age', model.age);
        formData.append('gender', model.gender);
        formData.append('password', model.password);

        return <Observable<UserLoginDto>>this.http.post(this.api + this.route + '/signup', formData);
    }

    public login(model: UserLoginDto): Observable<UserDto> {
        return <Observable<UserDto>>this.http.post(this.api + this.route + '/login', model);
    }

}