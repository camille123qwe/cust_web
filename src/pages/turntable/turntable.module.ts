import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TurntablePage } from './turntable';

@NgModule({
  declarations: [
    TurntablePage,
  ],
  imports: [
    IonicPageModule.forChild(TurntablePage),
  ],
  exports: [
    TurntablePage
  ]
})
export class TurntablePageModule {}
