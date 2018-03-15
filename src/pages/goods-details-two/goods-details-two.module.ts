import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsDetailsTwoPage } from './goods-details-two';

@NgModule({
  declarations: [
    GoodsDetailsTwoPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsDetailsTwoPage),
  ],
  exports: [
    GoodsDetailsTwoPage
  ]
})
export class GoodsDetailsTwoPageModule {}
