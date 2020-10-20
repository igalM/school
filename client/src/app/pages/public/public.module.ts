import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core.module';
import { RouterModule } from '@angular/router';
import { publicRoutes } from './public.routes';
import { PublicComponent } from './public.component';
import { IndexComponent } from './index/index.component';
import { SignupDialogComponent } from './index/parts/dialog/signup.dialog.component';
import { LoaderComponent } from './loader-component/loader.component';

const components = [
  PublicComponent,
  IndexComponent,
  LoaderComponent
]

const dialogs = [
  SignupDialogComponent
]

@NgModule({
  declarations: [
    components,
    dialogs
  ],
  entryComponents: [dialogs],
  imports: [
    CoreModule,
    RouterModule.forChild(publicRoutes)
  ],
  exports: [RouterModule]
})
export class PublicModule { }
