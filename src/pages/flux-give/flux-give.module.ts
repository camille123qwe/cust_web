import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FluxGivePage } from './flux-give';

@NgModule({
  declarations: [
    FluxGivePage,
  ],
  imports: [
    IonicPageModule.forChild(FluxGivePage),
  ],
  exports: [
    FluxGivePage
  ]
})
export class FluxGivePageModule {}
