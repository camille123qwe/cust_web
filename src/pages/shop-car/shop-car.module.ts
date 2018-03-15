import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopCarPage } from './shop-car';

@NgModule({
  declarations: [
    ShopCarPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopCarPage),
  ],
  exports: [
    ShopCarPage
  ]
})
export class ShopCarPageModule {}
