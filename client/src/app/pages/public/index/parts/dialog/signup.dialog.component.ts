import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RadioData } from 'src/app/shared/models/radio.data';

@Component({
  selector: 'signup-dialog-component',
  templateUrl: './signup.dialog.component.html',
  styleUrls: ['./signup.dialog.component.scss']
})
export class SignupDialogComponent implements OnInit {

  public signupForm: FormGroup;
  public genderArray: RadioData[] = [];
  public typeArray: RadioData[] = [];

  constructor(
    public readonly dialogRef: MatDialogRef<SignupDialogComponent>,
    private readonly fb: FormBuilder
  ) {

    this.genderArray = [
      {
        value: 'Male',
        placeholder: 'Male'
      },
      {
        value: 'Female',
        placeholder: 'Female'
      }
    ];

    this.typeArray = [
      {
        value: 'Student',
        placeholder: 'A Student'
      },
      {
        value: 'Teacher',
        placeholder: 'A Teacher'
      }
    ];

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['Male', Validators.required],
      role: ['Student', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
  }

  public signUp() {
    this.dialogRef.close(this.signupForm.value);
  }

}
