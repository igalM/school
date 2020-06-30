import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import * as fromApp from '../../../store/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'public-component',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  public loading$: Observable<boolean>;

  constructor(
    private overlay: OverlayContainer,
    private readonly store: Store<fromApp.AppState>
  ) {
    this.loading$ = this.store.select(fromApp.getUserLoading);

  }

  ngOnInit(): void {
    document.body.classList.add("light-custom-theme", "mat-app-background");
    this.overlay.getContainerElement().classList.add("light-custom-theme");
  }

}
