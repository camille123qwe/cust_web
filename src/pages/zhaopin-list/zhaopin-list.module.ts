import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZhaopinListPage } from './zhaopin-list';

@NgModule({
  declarations: [
    ZhaopinListPage,
  ],
  imports: [
    IonicPageModule.forChild(ZhaopinListPage),
  ],
  exports: [
    ZhaopinListPage
  ]
})
export class ZhaopinListPageModule {}