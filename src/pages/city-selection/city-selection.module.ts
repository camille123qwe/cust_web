import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitySelectionPage } from './city-selection';

@NgModule({
  declarations: [
    CitySelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CitySelectionPage),
  ],
})
export class CitySelectionPageModule {}
