import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'course-actions-dialog-component',
  templateUrl: './course.actions.dialog.component.html',
  styleUrls: ['./course.actions.dialog.component.scss']
})
export class CourseActionsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CourseActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
