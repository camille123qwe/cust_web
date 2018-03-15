import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderOfGoodsPage } from './order-of-goods';

@NgModule({
  declarations: [
    OrderOfGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderOfGoodsPage),
  ],
  exports: [
    OrderOfGoodsPage
  ]
})
export class OrderOfGoodsPageModule {}
