import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { provisionAlertPage } from './provision-alert';

@NgModule({
  declarations: [
    provisionAlertPage,
  ],
  imports: [
    IonicPageModule.forChild(provisionAlertPage),
  ],
  exports: [
    provisionAlertPage
  ]
})
export class provisionAlertPageModule {}