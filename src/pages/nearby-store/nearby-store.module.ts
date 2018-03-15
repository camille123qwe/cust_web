import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyStorePage } from './nearby-store';

@NgModule({
  declarations: [
    NearbyStorePage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyStorePage),
  ],
  exports: [
    NearbyStorePage
  ]
})
export class NearbyStorePageModule {}
