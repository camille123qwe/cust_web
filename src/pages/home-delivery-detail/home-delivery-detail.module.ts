import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDeliveryDetailPage } from './home-delivery-detail';

@NgModule({
  declarations: [
    HomeDeliveryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDeliveryDetailPage),
  ],
  exports: [
    HomeDeliveryDetailPage
  ]
})
export class HomeDeliveryDetailPageModule {}
