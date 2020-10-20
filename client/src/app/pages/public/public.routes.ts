import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { IndexComponent } from './index/index.component';

export const publicRoutes: Routes = [
    {
        path: '', component: PublicComponent, children: [
            { path: 'index', component: IndexComponent }
        ]
    }
];