import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderInformationPage } from './order-information';

@NgModule({
  declarations: [
    OrderInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderInformationPage),
  ],
  exports: [
    OrderInformationPage
  ]
})
export class OrderInformationPageModule {}
