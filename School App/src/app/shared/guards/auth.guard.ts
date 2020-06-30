import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as fromApp from '../../../store/index';
import { Store } from '@ngrx/store';
import { UserDto } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public user: UserDto = null;

  constructor(
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>
  ) {
    this.store.select(fromApp.getUser)
      .subscribe((user) => this.user = user);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.user) {
      this.router.navigate(['/index']);
    }
    return true;
  }

}
