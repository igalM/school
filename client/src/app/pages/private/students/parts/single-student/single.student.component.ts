import { Component, OnInit, Input } from '@angular/core';
import { StudentDto } from 'src/app/shared/models/student.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'single-student-component',
  templateUrl: './single.student.component.html',
  styleUrls: ['./single.student.component.scss']
})
export class SingleStudentComponent implements OnInit {

  @Input() student: StudentDto = null;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public navigateToProfile() {
    this.router.navigate(['/student-profile', this.student._id]);
  }

}
