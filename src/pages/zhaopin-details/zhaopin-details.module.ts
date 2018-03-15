import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZhaopinDetailsPage } from './zhaopin-details';

@NgModule({
  declarations: [
    ZhaopinDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ZhaopinDetailsPage),
  ],
  exports: [
    ZhaopinDetailsPage
  ]
})
export class ZhaopinDetailsPageModule {}