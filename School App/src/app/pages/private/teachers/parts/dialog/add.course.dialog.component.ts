import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-course-dialog-component',
  templateUrl: './add.course.dialog.component.html',
  styleUrls: ['./add.course.dialog.component.scss']
})
export class AddCourseDialogComponent implements OnInit {

  public courseForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private readonly fb: FormBuilder
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      howManyStudents: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
  }

  addCourse() {
    this.dialogRef.close(this.courseForm.value);
  }

}
