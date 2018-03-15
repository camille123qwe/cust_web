import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FluxChargePage } from './flux-charge';

@NgModule({
  declarations: [
    FluxChargePage,
  ],
  imports: [
    IonicPageModule.forChild(FluxChargePage),
  ],
  exports: [
    FluxChargePage
  ]
})
export class FluxChargePageModule {}
