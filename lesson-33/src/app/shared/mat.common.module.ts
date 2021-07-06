import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
	imports: [
		LayoutModule,
		// FlexLayoutModule,

		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatTooltipModule,
		MatTabsModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatDialogModule,
		MatInputModule,
		MatDatepickerModule,
		MatRadioModule,
		MatSlideToggleModule,
		MatNativeDateModule,
		MatExpansionModule,
		MatButtonToggleModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatSnackBarModule,
		MatSliderModule,
	],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {},
		},
	],
	exports: [
		LayoutModule,
		// FlexLayoutModule,

		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatTooltipModule,
		MatTabsModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatDialogModule,
		MatInputModule,
		MatDatepickerModule,
		MatRadioModule,
		MatSlideToggleModule,
		MatNativeDateModule,
		MatExpansionModule,
		MatButtonToggleModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatSnackBarModule,
		MatSliderModule,
	],
})
export class MatCommonModule {}
