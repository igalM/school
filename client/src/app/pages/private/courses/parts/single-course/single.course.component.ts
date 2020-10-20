import { Component, OnInit, Input } from '@angular/core';
import { CourseDto } from 'src/app/shared/models/course.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'single-course-component',
  templateUrl: './single.course.component.html',
  styleUrls: ['./single.course.component.scss']
})
export class SingleCourseComponent implements OnInit {
  @Input() course: CourseDto = null;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public navigateToCourse() {
    this.router.navigate(['/view-course', this.course._id]);
  }

}
