import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenStorePage } from './open-store';

@NgModule({
  declarations: [
    OpenStorePage,
  ],
  imports: [
    IonicPageModule.forChild(OpenStorePage),
  ],
  exports: [
    OpenStorePage
  ],

})
export class OpenStorePageModule {}
