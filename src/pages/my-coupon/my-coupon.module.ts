import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCouponPage } from './my-coupon';

@NgModule({
  declarations: [
    MyCouponPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCouponPage),
  ],
  exports: [
    MyCouponPage
  ]
})
export class MyCouponPageModule {}