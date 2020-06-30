import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import * as fromApp from '../store/index';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/interceptor/http.error.interceptor';
import { StudentEffects } from 'src/store/effects/students.effects';
import { UserEffects } from 'src/store/effects/user.effects';
import { TeacherEffects } from 'src/store/effects/teacher.effects';
import { CourseEffects } from 'src/store/effects/course.effects';
import { AuthInterceptor } from './shared/interceptor/auto.interceptor';

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]

const components = [
  AppComponent
]

const effects = [
  StudentEffects,
  UserEffects,
  TeacherEffects,
  CourseEffects
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
