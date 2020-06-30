import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from './parts/dialog/signup.dialog.component';
import { UserDto } from 'src/app/shared/models/user.dto';
import { signupUser, loginUser } from 'src/store/actions/user.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/index';

@Component({
  selector: 'index-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly store: Store<fromApp.AppState>,
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  public login() {
    this.store.dispatch(loginUser({ user: this.loginForm.value }));
  }

  public openDialog() {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '450px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed()
      .subscribe((res: UserDto) => {
        if (res) {
          this.store.dispatch(signupUser({ user: res }));
        }
      });
  }

}
