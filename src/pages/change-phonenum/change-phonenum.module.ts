import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePhonenumPage } from './change-phonenum';

@NgModule({
  declarations: [
    ChangePhonenumPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePhonenumPage),
  ],
  exports: [
    ChangePhonenumPage
  ]
})
export class ChangePhonenumPageModule {}
