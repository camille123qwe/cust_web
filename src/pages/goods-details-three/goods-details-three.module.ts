import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsDetailsThreePage } from './goods-details-three';

@NgModule({
  declarations: [
    GoodsDetailsThreePage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsDetailsThreePage),
  ],
  exports: [
    GoodsDetailsThreePage
  ]
})
export class GoodsDetailsThreePageModule {}
