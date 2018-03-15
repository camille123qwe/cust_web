import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryPopupPage } from './delivery-popup';

@NgModule({
  declarations: [
    DeliveryPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryPopupPage),
  ],
  exports: [
    DeliveryPopupPage
  ]
})
export class DeliveryPopupPageModule {}
