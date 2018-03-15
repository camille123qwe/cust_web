import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopParticularsPage } from './shop-particulars';

@NgModule({
  declarations: [
    ShopParticularsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopParticularsPage),
  ],
  exports: [
    ShopParticularsPage
  ]
})
export class ShopParticularsPageModule {}
