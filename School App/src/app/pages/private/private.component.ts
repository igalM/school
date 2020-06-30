import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/index';
import { Store } from '@ngrx/store';
import { fetchStudents } from 'src/store/actions/student.actions';
import { fetchTeachers } from 'src/store/actions/teacher.actions';
import { fetchCourses } from 'src/store/actions/course.actions';

@Component({
  selector: 'private-component',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(
    private readonly store: Store<fromApp.AppState>
  ) {
    this.store.dispatch(fetchStudents());
    this.store.dispatch(fetchTeachers());
    this.store.dispatch(fetchCourses());
  }

  ngOnInit(): void {



  }

}
