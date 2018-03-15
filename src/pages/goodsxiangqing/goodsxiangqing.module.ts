import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsxiangqingPage } from './goodsxiangqing';

@NgModule({
  declarations: [
    GoodsxiangqingPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsxiangqingPage),
  ],
  exports: [
    GoodsxiangqingPage
  ]
})
export class GoodsxiangqingPageModule {}
