import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../../../store/index';
import { Store } from '@ngrx/store';
import { TeacherDto } from 'src/app/shared/models/teacher.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-teachers-component',
  templateUrl: './list.teachers.component.html',
  styleUrls: ['./list.teachers.component.scss']
})
export class ListTeachersComponent implements OnInit {

  public teachers$: Observable<TeacherDto[]>;

  constructor(
    private readonly store: Store<fromApp.AppState>,
  ) {
    this.teachers$ = this.store.select(fromApp.getTeachers);

  }

  ngOnInit(): void {
  }

}
