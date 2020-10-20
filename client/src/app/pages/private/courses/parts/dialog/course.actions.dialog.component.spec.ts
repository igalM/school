import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseActionsDialogComponent } from './course.actions.dialog.component';

describe('CourseActionsDialogComponent', () => {
  let component: CourseActionsDialogComponent;
  let fixture: ComponentFixture<CourseActionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
