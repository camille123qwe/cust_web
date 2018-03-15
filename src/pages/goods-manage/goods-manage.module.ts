import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsManagePage } from './goods-manage';

@NgModule({
  declarations: [
    GoodsManagePage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsManagePage),
  ],
  exports: [
    GoodsManagePage
  ]
})
export class GoodsManagePageModule {}