import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetPage } from './set';

@NgModule({
  declarations: [
    SetPage,
  ],
  imports: [
    IonicPageModule.forChild(SetPage),
  ],
  exports: [
    SetPage
  ]
})
export class SetPageModule {}
