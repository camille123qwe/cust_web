import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { xianShiYouHuiPage } from './xianshiyouhui';

@NgModule({
  declarations: [
    xianShiYouHuiPage,
  ],
  imports: [
    IonicPageModule.forChild(xianShiYouHuiPage),
  ],
  exports: [
    xianShiYouHuiPage
  ]
})
export class xianShiYouHuiPageModule {}