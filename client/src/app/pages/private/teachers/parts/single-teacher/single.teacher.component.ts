import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherDto } from 'src/app/shared/models/teacher.dto';

@Component({
  selector: 'single-teacher-component',
  templateUrl: './single.teacher.component.html',
  styleUrls: ['./single.teacher.component.scss']
})
export class SingleTeacherComponent implements OnInit {

  @Input() teacher: TeacherDto = null;

  constructor(
    private readonly router: Router

  ) { }

  ngOnInit(): void {
  }

  public navigateToProfile() {
    this.router.navigate(['/teacher-profile', this.teacher._id]);
  }

}
