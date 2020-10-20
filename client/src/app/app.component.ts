import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/index';
import { UserDto } from './shared/models/user.dto';
import { Router } from '@angular/router';
import { StorageService } from './shared/services/storage.service';
import { UserRole } from './shared/enums/user/user.role';
import { loginUser } from 'src/store/actions/user.actions';
import { UserLoginDto } from './shared/models/user.login.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  public user: UserDto = null;

  constructor(
    private readonly store: Store<fromApp.AppState>,
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {

    this.user = this.storageService.get();
    if (this.user) {
      const loginDetails: UserLoginDto = {
        email: this.user.email,
        password: null
      };
      this.store.dispatch(loginUser({ user: loginDetails }));
    }

    this.store.select(fromApp.getUser)
      .subscribe(user => {
        if (user) {
          this.navigationHelper(user);
        }
      });
  }

  public navigationHelper(user: UserDto) {
    if (user.role === UserRole.Student) {
      this.router.navigate(['/student-profile', user.student._id]);
    }
    if (user.role === UserRole.Teacher) {
      this.router.navigate(['/teacher-profile', user.teacher._id]);
    }
  }
}
