import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FluxGiveSuccessPage } from './flux-give-success';

@NgModule({
  declarations: [
    FluxGiveSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(FluxGiveSuccessPage),
  ],
  exports: [
    FluxGiveSuccessPage
  ]
})
export class FluxGiveSuccessPageModule {}
