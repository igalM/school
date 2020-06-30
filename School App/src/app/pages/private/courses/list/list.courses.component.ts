import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDto } from 'src/app/shared/models/course.dto';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store/index';

@Component({
  selector: 'list-courses-component',
  templateUrl: './list.courses.component.html',
  styleUrls: ['./list.courses.component.scss']
})
export class ListCoursesComponent implements OnInit {

  public courses$: Observable<CourseDto[]>;

  constructor(
    private readonly store: Store<fromApp.AppState>
  ) {
    this.courses$ = this.store.select(fromApp.getCourses);
  }

  ngOnInit(): void {
  }

}
