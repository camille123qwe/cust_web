import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAddressPage } from './my-address';

@NgModule({
  declarations: [
    MyAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAddressPage),
  ],
  exports: [
    MyAddressPage
  ]
})
export class MyAddressPageModule {}
