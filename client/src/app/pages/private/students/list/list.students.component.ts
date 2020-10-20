import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../../../store/index';
import { Store } from '@ngrx/store';
import { StudentDto } from 'src/app/shared/models/student.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-students-component',
  templateUrl: './list.students.component.html',
  styleUrls: ['./list.students.component.scss']
})
export class ListStudentsComponent implements OnInit {

  public students$: Observable<StudentDto[]>;

  constructor(
    private readonly store: Store<fromApp.AppState>,
  ) {

    this.students$ = this.store.select(fromApp.getStudents);

  }

  ngOnInit() {
  }

}
