import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/index';
import { logoutUser } from 'src/store/actions/user.actions';

@Injectable()
export class StorageService {

    public key: string = 'USER';

    constructor(
        private readonly store: Store<fromApp.AppState>
    ) { }

    public set(user: any) {
        this.setAsString(this.key, JSON.stringify(user));
    }

    public get(): any {
        const item = this.getAsString(this.key);
        return item ? JSON.parse(item) : null;
    }

    public getAsString(key: string): any {
        var item = window.localStorage.getItem(key);
        return item ? item : null;
    }

    public setAsString(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    public delete() {
        window.localStorage.removeItem(this.key);
        this.store.dispatch(logoutUser());
    }
}