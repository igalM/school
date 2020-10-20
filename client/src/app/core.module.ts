import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { NguCarouselModule } from '@stockopedia/carousel';
import { pipes } from './shared/pipes/pipes';
import { services } from './shared/services/services';
import { controls } from './shared/controls/controls';
import { customs } from './shared/custom/custom';
import { guards } from './shared/guards/guards';


const materialDesignModules = [
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule
];

const angularLibraries = [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
]

const externalLibraries = [
    NguCarouselModule
]


@NgModule({
    declarations: [
        pipes,
        customs,
        controls
    ],
    imports: [
        CommonModule,
        angularLibraries,
        externalLibraries,
        materialDesignModules
    ],
    providers: [
        services,
        guards
    ],
    exports: [
        CommonModule,
        angularLibraries,
        externalLibraries,
        materialDesignModules,
        pipes,
        customs,
        controls
    ],
    entryComponents: [

    ]
})
export class CoreModule { }
