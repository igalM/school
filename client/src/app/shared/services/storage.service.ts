import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/index';
import { logoutUser } from 'src/store/actions/user.actions';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class StorageService {

    public key: string = 'USER';

    constructor(
        private readonly store: Store<fromApp.AppState>,
        @Inject(PLATFORM_ID) private readonly platformId: Object
    ) { }

    public set(user: any) {
        this.setAsString(this.key, JSON.stringify(user));
    }

    public get(): any {
        const item = this.getAsString(this.key);
        return item ? JSON.parse(item) : null;
    }

    public getAsString(key: string): any {
        if (isPlatformBrowser(this.platformId)) {
            var item = window.localStorage.getItem(key);
            return item ? item : null;
        }
    }

    public setAsString(key: string, value: string) {
        if (isPlatformBrowser(this.platformId)) {
            window.localStorage.setItem(key, value);
        }
    }

    public delete() {
        if (isPlatformBrowser(this.platformId)) {
            window.localStorage.removeItem(this.key);
            this.store.dispatch(logoutUser());
        }
    }
}