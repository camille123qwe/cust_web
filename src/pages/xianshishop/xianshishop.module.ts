import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { xianShiShopPage } from './xianshishop';

@NgModule({
  declarations: [
    xianShiShopPage,
  ],
  imports: [
    IonicPageModule.forChild(xianShiShopPage),
  ],
  exports: [
    xianShiShopPage
  ]
})
export class xianShiShopPageModule {}