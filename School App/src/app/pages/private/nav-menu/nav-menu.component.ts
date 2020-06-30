import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';
import { UserDto } from 'src/app/shared/models/user.dto';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/index';
import { UserRole } from 'src/app/shared/enums/user/user.role';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  public sidenavIndex: number = 1;
  public pointerEvents: string = 'none';
  private unsubscribe$ = new Subject()

  public user: UserDto = null;
  public UserRole = UserRole;

  constructor(
    private overlay: OverlayContainer,
    private readonly store: Store<fromApp.AppState>,
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {

    this.store.select(fromApp.getUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        if (res) {
          this.user = res;
        }
      });
  }

  ngOnInit(): void {
    document.body.classList.add("light-custom-theme", "mat-app-background");
    this.overlay.getContainerElement().classList.add("light-custom-theme");
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public navigateToProfile() {
    if (this.user.role === UserRole.Student) {
      this.router.navigate(['/student-profile', this.user.student._id]);
    }
    if (this.user.role === UserRole.Teacher) {
      this.router.navigate(['/teacher-profile', this.user.teacher._id]);
    }
  }

  public toggleSidenav() {
    this.sidenav.toggle();
    if (document.body.classList.contains('fixed-body')) {
      document.body.classList.remove('fixed-body');
    } else {
      document.body.classList.add('fixed-body');
    }
  }

  public toggleTheme(): void {
    if (this.overlay.getContainerElement().classList.contains("custom-theme")) {
      this.overlay.getContainerElement().classList.remove("custom-theme");
      this.overlay.getContainerElement().classList.add("light-custom-theme");
    } else if (this.overlay.getContainerElement().classList.contains("light-custom-theme")) {
      this.overlay.getContainerElement().classList.remove("light-custom-theme");
      this.overlay.getContainerElement().classList.add("custom-theme");
    } else {
      this.overlay.getContainerElement().classList.add("light-custom-theme");
    }
    if (document.body.classList.contains("custom-theme")) {
      document.body.classList.remove("custom-theme");
      document.body.classList.add("light-custom-theme");
    } else if (document.body.classList.contains("light-custom-theme")) {
      document.body.classList.remove("light-custom-theme");
      document.body.classList.add("custom-theme");
    } else {
      document.body.classList.add("light-custom-theme");
    }
  }

  public sidenavOpened() {
    this.sidenavIndex = 9999;
    this.pointerEvents = 'auto';
  }

  public sidenavClosed() {
    this.sidenavIndex = 1;
    this.pointerEvents = 'none';
    if (document.body.classList.contains('fixed-body')) {
      document.body.classList.remove('fixed-body');
    }
  }

  public logout() {
    this.storageService.delete()
  }

}
