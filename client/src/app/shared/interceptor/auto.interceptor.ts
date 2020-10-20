import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { UserDto } from '../models/user.dto';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public user: UserDto = null;

    constructor(
        private readonly storageService: StorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        this.user = this.storageService.get();
        if (this.user) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.user.token) });
        }
        return next.handle(authReq);
    }
}