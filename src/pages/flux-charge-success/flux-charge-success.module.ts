import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FluxChargeSuccessPage } from './flux-charge-success';

@NgModule({
  declarations: [
    FluxChargeSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(FluxChargeSuccessPage),
  ],
  exports: [
    FluxChargeSuccessPage
  ]
})
export class FluxChargeSuccessPageModule {}
